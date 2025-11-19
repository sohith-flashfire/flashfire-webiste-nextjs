import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANADA_CODE = 'CA';
const STORAGE_KEY = 'ff_country_code_v1';

// Cache for country codes (in-memory for server-side)
const countryCache = new Map<string, { code: string; expiresAt: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

async function fetchCountryFromBackend(ip: string): Promise<string | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (!baseUrl) {
    console.warn('[Middleware] NEXT_PUBLIC_API_BASE_URL not set');
    return null;
  }
  
  try {
    const response = await fetch(`${baseUrl}/api/geo`, {
      headers: {
        'x-forwarded-for': ip,
        'x-real-ip': ip,
        'ngrok-skip-browser-warning': 'true'
      },
      cache: 'no-store' // Don't cache in middleware
    });

    if (!response.ok) {
      console.warn('[Middleware] Backend geo API not ok:', response.status);
      return null;
    }

    const data = await response.json();
    return data?.countryCode || null;
  } catch (error) {
    console.error('[Middleware] Failed to fetch country from backend:', error);
    return null;
  }
}

function getClientIp(request: NextRequest): string | null {
  // Check various headers for IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  if (cfIp) {
    return cfIp;
  }
  
  // Fallback - return null if no IP found
  return null;
}

function detectCountryFallback(request: NextRequest): string {
  // Try to detect from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Check for French Canadian
  if (acceptLanguage.includes('fr-CA')) {
    return 'CA';
  }
  
  // Default to US
  return 'US';
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for API routes, static files, and _next
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // If already on /en-ca path, allow it
  if (pathname.startsWith('/en-ca')) {
    return NextResponse.next();
  }

  // Only check for redirect on root path
  if (pathname === '/') {
    const ip = getClientIp(request);
    
    let countryCode: string | null = null;
    const now = Date.now();
    
    // Only check cache if we have an IP
    if (ip) {
      const cached = countryCache.get(ip);
      
      if (cached && cached.expiresAt > now) {
        countryCode = cached.code;
      } else {
        // Try to fetch from backend
        countryCode = await fetchCountryFromBackend(ip);
        
        // Cache the result if we got one
        if (countryCode) {
          countryCache.set(ip, {
            code: countryCode,
            expiresAt: now + CACHE_TTL_MS
          });
        }
      }
    }
    
    // Fallback to browser detection if no IP or backend failed
    if (!countryCode) {
      countryCode = detectCountryFallback(request);
    }

    // Redirect to /en-ca if Canada detected
    if (countryCode === CANADA_CODE) {
      const url = request.nextUrl.clone();
      url.pathname = '/en-ca';
      console.log('[Middleware] Redirecting to /en-ca for Canada user');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

