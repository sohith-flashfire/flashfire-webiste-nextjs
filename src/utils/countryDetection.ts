const STORAGE_KEY = 'ff_country_code_v1';
const CANADA_CODE = 'CA';

export function getCachedCountryCode(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v;
  } catch {
    return null;
  }
}

export function cacheCountryCode(code: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore storage errors
  }
}

export async function fetchCountryCode(): Promise<string | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (!baseUrl) {
    console.warn('[CountryDetection] NEXT_PUBLIC_API_BASE_URL not set');
    return null;
  }
  try {
    const res = await fetch(`${baseUrl}/api/geo`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    if (!res.ok) {
      console.warn('[CountryDetection] Backend response not ok:', res.status);
      return null;
    }
    const data = await res.json();
    return (data?.countryCode as string) || null;
  } catch (e) {
    console.error('[CountryDetection] Fetch failed:', e);
    return null;
  }
}

export function detectCountryFallback(): string {
  if (typeof window === 'undefined') return 'US';
  
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language || navigator.languages?.[0] || '';
    
    // Check timezone for Canada
    const canadaTimezones = [
      'America/Toronto', 'America/Vancouver', 'America/Montreal',
      'America/Edmonton', 'America/Winnipeg', 'America/Halifax',
      'America/St_Johns', 'America/Regina', 'America/Yellowknife',
      'America/Goose_Bay', 'America/Glace_Bay', 'America/Moncton',
      'America/Nipigon', 'America/Thunder_Bay', 'America/Atikokan',
      'America/Rainy_River', 'America/Cambridge_Bay', 'America/Creston',
      'America/Dawson', 'America/Dawson_Creek', 'America/Fort_Nelson',
      'America/Inuvik', 'America/Whitehorse'
    ];
    
    if (canadaTimezones.some(tz => timezone.includes(tz))) {
      return 'CA';
    }
    
    // Check language for Canada (French Canadian)
    if (language.startsWith('fr-CA')) {
      return 'CA';
    }
    
    return 'US';
  } catch {
    return 'US';
  }
}

export function shouldRedirectToCanada(pathname: string, countryCode: string | null): boolean {
  if (countryCode === CANADA_CODE && pathname === '/') {
    return true;
  }
  return false;
}

