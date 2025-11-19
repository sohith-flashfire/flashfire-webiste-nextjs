"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { captureUTMParams } from "@/src/utils/UTMUtils";
import GeoBlockModal from "@/src/components/modals/GeoBlockModal";
import SignupModal from "@/src/components/signupModal/SignupModal";

function ClientLogicWrapperContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showGeoBlockModal, setShowGeoBlockModal] = useState(false);
    const [isFromIndia, setIsFromIndia] = useState(false);
    const [geoLoading, setGeoLoading] = useState(true);

    const [showSignupModal, setShowSignupModal] = useState(false);
    
    // Track button clicks to force show modal
    const [forceShowModal, setForceShowModal] = useState(false);
    
    // Track which route visit we're on and if modals have been dismissed
    const lastRouteWithModalRef = useRef<string | null>(null);
    const modalDismissedForRouteRef = useRef<string | null>(null);

    // Capture UTM params on mount and when searchParams change
    useEffect(() => {
        captureUTMParams();
    }, [searchParams]);

    // Listen for button click events from anywhere in the app
    useEffect(() => {
        const handleButtonClick = () => {
            console.log("🔘 Button click detected, forcing modal to show");
            setForceShowModal(true);
            // Reset dismissed state so modal can show
            modalDismissedForRouteRef.current = null;
        };

        // Listen for custom event
        window.addEventListener('showGetMeInterviewModal', handleButtonClick);
        
        return () => {
            window.removeEventListener('showGetMeInterviewModal', handleButtonClick);
        };
    }, []);

    // Detect User Country (Client-side fallback logic)
    useEffect(() => {
        const detectCountry = () => {
            try {
                setGeoLoading(true);
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const language = navigator.language || navigator.languages?.[0];

                let isIndiaDetected = false;

                // Check timezone
                if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
                    isIndiaDetected = true;
                }

                // Check language
                if (language.startsWith('hi') || language.startsWith('bn') || language.startsWith('te') ||
                    language.startsWith('ta') || language.startsWith('gu') || language.startsWith('kn') ||
                    language.startsWith('ml') || language.startsWith('pa') || language.startsWith('or')) {
                    isIndiaDetected = true;
                }

                // Check for test param
                const params = new URLSearchParams(window.location.search);
                if (params.get('test_india') === 'true') {
                    isIndiaDetected = true;
                    console.log("🧪 Testing: Simulating India location");
                }

                setIsFromIndia(isIndiaDetected);
                if (isIndiaDetected) {
                    console.log("🇮🇳 User detected from India");
                }
            } catch (error) {
                console.error("Geo detection failed:", error);
            } finally {
                setGeoLoading(false);
            }
        };

        detectCountry();
    }, []);

    // Handle Route-based Modals & Geo-Blocking
    useEffect(() => {
        console.log("🔍 ClientLogicWrapper Effect Triggered", { pathname, geoLoading, isFromIndia, forceShowModal });

        // Don't do anything while loading geo info
        if (geoLoading) {
            console.log("⏳ Geo loading...");
            return;
        }

        const isGetMeInterview = pathname === '/get-me-interview';
        const isScheduleCareerCall = pathname === '/schedule-a-free-career-call';
        const isBookMyDemoCall = pathname === '/book-my-demo-call';
        const isSignup = pathname === '/signup' || pathname.includes('/signup');
        const isBookDemo = pathname === '/book-free-demo' || pathname.includes('/book-free-demo');

        console.log("📍 Route Check:", { isGetMeInterview, isScheduleCareerCall, isBookMyDemoCall, isSignup, isBookDemo });

        // Create a unique identifier for this route visit (includes query params)
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

        // Logic for restricted actions (Signup / Booking)
        if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup || isBookDemo) {
            // If forceShowModal is true (button was clicked), always show modal
            if (forceShowModal) {
                console.log("🔘 Force showing modal due to button click");
                setForceShowModal(false); // Reset the flag
                modalDismissedForRouteRef.current = null; // Reset dismissed state
                
                if (isFromIndia) {
                    console.log("🚫 Geo-blocking Indian user");
                    setShowGeoBlockModal(true);
                    setShowSignupModal(false);
                } else {
                    if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup) {
                        console.log("✅ Opening Signup Modal");
                        setShowSignupModal(true);
                    }
                }
                return;
            }
            
            // For /get-me-interview, /schedule-a-free-career-call, and /book-my-demo-call routes: only show modal automatically if URL has query params
            // This prevents modal from showing on refresh when URL is clean (no query params)
            if ((isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall) && !searchParams.toString()) {
                console.log("🚫 No query params on route, not showing modal automatically");
                return;
            }
            
            // If navigating to a new route visit (different from last), reset dismissed state
            // This handles the case where user clicks button again after navigating away
            if (lastRouteWithModalRef.current !== currentRouteKey) {
                console.log("🔄 New route visit detected, resetting dismissed state");
                modalDismissedForRouteRef.current = null;
                lastRouteWithModalRef.current = currentRouteKey;
            }

            // Check if modal was already dismissed for this route visit
            const wasDismissed = modalDismissedForRouteRef.current === currentRouteKey;

            // Only show modal if it hasn't been dismissed for this route visit
            if (!wasDismissed) {
                if (isFromIndia) {
                    console.log("🚫 Geo-blocking Indian user");
                    setShowGeoBlockModal(true);
                    setShowSignupModal(false);
                } else {
                    // If not from India, show the appropriate modal for the route
                    if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup) {
                        console.log("✅ Opening Signup Modal");
                        setShowSignupModal(true);
                    }
                    // Note: Booking modal logic could be added here if needed
                }
            } else {
                console.log("🚫 Modal already dismissed for this route visit");
            }
        } else {
            // Close modals if navigating away and reset dismissed state
            // This ensures that when user navigates back, it's treated as a new visit
            setShowSignupModal(false);
            setShowGeoBlockModal(false);
            modalDismissedForRouteRef.current = null;
            lastRouteWithModalRef.current = null;
            setForceShowModal(false); // Reset force flag when navigating away
        }
    }, [pathname, searchParams, isFromIndia, geoLoading, forceShowModal]);

    // Handle modal close - mark as dismissed for current route and clean URL
    const handleGeoBlockModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowGeoBlockModal(false);
        
        // Clean URL by removing query params when on /get-me-interview, /schedule-a-free-career-call, or /book-my-demo-call
        if ((pathname === '/get-me-interview' || pathname === '/schedule-a-free-career-call' || pathname === '/book-my-demo-call') && searchParams.toString()) {
            router.replace(pathname);
        }
    };

    const handleSignupModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowSignupModal(false);
        
        // Clean URL by removing query params when on /get-me-interview, /schedule-a-free-career-call, or /book-my-demo-call
        if ((pathname === '/get-me-interview' || pathname === '/schedule-a-free-career-call' || pathname === '/book-my-demo-call') && searchParams.toString()) {
            router.replace(pathname);
        }
    };

    return (
        <>
            {children}
            <GeoBlockModal
                isVisible={showGeoBlockModal}
                onClose={handleGeoBlockModalClose}
                onProvideAnyway={handleGeoBlockModalClose}
            />
            <SignupModal
                isOpen={showSignupModal}
                onClose={handleSignupModalClose}
            />
        </>
    );
}

export default function ClientLogicWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<>{children}</>}>
            <ClientLogicWrapperContent>{children}</ClientLogicWrapperContent>
        </Suspense>
    );
}
