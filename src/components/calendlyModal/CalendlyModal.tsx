"use client";
import { useState, useEffect } from "react";
import { X, Calendar, CheckCircle } from "lucide-react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("NEXT_PUBLIC_API_BASE_URL is not set in CalendlyModal");
}

interface CalendlyModalProps {
  isVisible: boolean;
  onClose: () => void;
  user: {
    fullName?: string;
    email?: string;
    phone?: string;
    countryCode?: string;
  };
}

interface CalendlyEventPayload {
  invitee?: {
    email?: string;
    name?: string;
    uri?: string;
  };
  event?: {
    uri?: string;
    start_time?: string;
    start_time_pretty?: string;
    end_time?: string;
    location?: {
      join_url?: string;
    };
  };
  name?: string;
  email?: string;
}

interface CalendlyEvent {
  data?: {
    payload?: CalendlyEventPayload;
  };
  payload?: CalendlyEventPayload;
}

interface CalendlyEventListenerOptions {
  onProfilePageSubmitted?: (e: CalendlyEvent) => void;
  onEventScheduled?: (e: CalendlyEvent) => Promise<void> | void;
}

export default function CalendlyModal({
  isVisible,
  onClose,
  user,
}: CalendlyModalProps) {
  const [profileInvitee, setProfileInvitee] = useState<{
    email?: string;
    name?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Handle loading state when modal opens
  useEffect(() => {
    if (isVisible) {
      console.log("📅 CalendlyModal opened with user:", user);
      console.log("📅 UTM params:", {
        utm_source: typeof window !== "undefined" ? localStorage.getItem("utm_source") : null,
        utm_medium: typeof window !== "undefined" ? localStorage.getItem("utm_medium") : null,
        utm_campaign: typeof window !== "undefined" ? localStorage.getItem("utm_campaign") : null,
      });

      // Always show loader briefly to cover Calendly's own loader
      setIsLoading(true);

      // Determine loading duration based on whether it's been loaded before
      const loadingDuration = hasLoadedOnce ? 800 : 3000; // 0.8s for subsequent opens, 3s for first

      let checkCount = 0;
      const maxChecks = loadingDuration / 100; // Adjust checks based on duration

      const checkCalendlyLoaded = setInterval(() => {
        if (typeof window === "undefined") return;
        
        checkCount++;
        const calendlyIframe = document.querySelector('iframe[src*="calendly.com"]');

        // For subsequent loads, hide faster
        if (hasLoadedOnce && calendlyIframe && checkCount >= 5) {
          setIsLoading(false);
          clearInterval(checkCalendlyLoaded);
          console.log("✅ Calendly widget ready (cached)");
        }
        // For first load, wait for full load
        else if (!hasLoadedOnce && calendlyIframe) {
          try {
            const iframeLoaded = calendlyIframe.getAttribute("data-loaded");
            if (iframeLoaded || checkCount >= maxChecks) {
              setIsLoading(false);
              setHasLoadedOnce(true);
              clearInterval(checkCalendlyLoaded);
              console.log("✅ Calendly widget loaded");
            }
          } catch {
            // Cross-origin restriction, just wait for the timeout
          }
        }

        // Stop checking after max attempts
        if (checkCount >= maxChecks) {
          clearInterval(checkCalendlyLoaded);
        }
      }, 100);

      // Fallback timer based on whether loaded before
      const fallbackTimer = setTimeout(() => {
        setIsLoading(false);
        if (!hasLoadedOnce) {
          setHasLoadedOnce(true);
        }
        clearInterval(checkCalendlyLoaded);
        console.log("📅 Calendly loaded (fallback)");
      }, loadingDuration);

      return () => {
        clearInterval(checkCalendlyLoaded);
        clearTimeout(fallbackTimer);
      };
    }
  }, [isVisible, hasLoadedOnce, user]);

  // Restore invitee profile info on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const savedName = localStorage.getItem("cal_invitee_name") || undefined;
      const savedEmail = localStorage.getItem("cal_invitee_email") || undefined;
      if (savedName || savedEmail) {
        setProfileInvitee({ name: savedName, email: savedEmail });
      }
    } catch {}
  }, []);

  // Listen for Calendly scheduled events and capture to analytics/CRM
  useCalendlyEventListener({
    // Fires when the user submits their details (name/email) before picking a time
    onProfilePageSubmitted: (e: CalendlyEvent) => {
      try {
        const payload = e?.data?.payload || e?.payload || {};
        const name = payload?.name || payload?.invitee?.name || "";
        const email = payload?.email || payload?.invitee?.email || "";
        if (name || email) {
          setProfileInvitee({ name, email });
          try {
            if (typeof window !== "undefined") {
              if (name) localStorage.setItem("cal_invitee_name", name);
              if (email) localStorage.setItem("cal_invitee_email", email);
            }
          } catch {}
          console.log("📝 Calendly profile captured:", { name, email });
        }
      } catch (err) {
        console.error("❌ Failed to capture Calendly profile submission", err);
      }
    },
    onEventScheduled: async (e: CalendlyEvent) => {
      console.log("🎉 Calendly Event Triggered!", e);
      try {
        const payload = e?.data?.payload || e?.payload || {};
        const inviteeEmail =
          payload?.invitee?.email ||
          user?.email ||
          profileInvitee?.email ||
          (typeof window !== "undefined" ? localStorage.getItem("cal_invitee_email") : null) ||
          "";
        const inviteeName =
          payload?.invitee?.name ||
          user?.fullName ||
          profileInvitee?.name ||
          (typeof window !== "undefined" ? localStorage.getItem("cal_invitee_name") : null) ||
          "";
        const meetingUrl =
          payload?.event?.uri ||
          payload?.event?.location?.join_url ||
          "";
        const eventStartTime =
          payload?.event?.start_time ||
          payload?.event?.start_time_pretty ||
          "";

        const utm_source =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_source") || "direct"
            : "direct";
        const utm_medium =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_medium") || "website"
            : "website";
        const utm_campaign =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_campaign") || "organic"
            : "organic";
        const utm_content =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_content")
            : null;
        const utm_term =
          typeof window !== "undefined" ? localStorage.getItem("utm_term") : null;

        console.log("📊 Booking Event Data:", {
          email: inviteeEmail,
          inviteeName,
          meetingUrl,
          eventStartTime,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          utm_source,
          utm_medium,
          utm_campaign,
        });

        // 🆕 DIRECT BACKUP: Send booking data to your backend API
        // This is a backup to Calendly webhook - if webhook fails, we still capture the booking
        try {
          const bookingData = {
            utmSource: utm_source,
            utmMedium: utm_medium,
            utmCampaign: utm_campaign,
            utmContent: utm_content,
            utmTerm: utm_term,
            clientName: inviteeName,
            clientEmail: inviteeEmail,
            clientPhone: user?.phone
              ? `${user?.countryCode || ""}${user?.phone}`
              : null,
            calendlyEventUri: payload?.event?.uri || null,
            calendlyInviteeUri: payload?.invitee?.uri || null,
            calendlyMeetLink: meetingUrl,
            scheduledEventStartTime: eventStartTime,
            scheduledEventEndTime: payload?.event?.end_time || null,
            visitorId:
              typeof window !== "undefined"
                ? localStorage.getItem("visitor_id")
                : null,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
            source: "frontend_direct", // Mark this as coming from frontend
          };

          console.log(
            "📤 Sending booking to backend (backup to webhook)...",
            bookingData
          );

          if (!API_BASE_URL) {
            console.error("API_BASE_URL is not configured, skipping backend call");
            return;
          }

          const response = await fetch(
            `${API_BASE_URL}/api/campaign-bookings/frontend-capture`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookingData),
            }
          );

          if (response.ok) {
            const result = await response.json();
            console.log("✅ Booking saved to backend (direct):", result);
          } else {
            console.warn(
              "⚠️ Backend booking save failed, webhook will handle it:",
              await response.text()
            );
          }
        } catch (backendError) {
          console.warn(
            "⚠️ Failed to send booking to backend directly (webhook will handle it):",
            backendError
          );
        }
      } catch (err) {
        console.error("❌ Calendly scheduled event capture failed", err);
      }
    },
  } as CalendlyEventListenerOptions);

  if (!isVisible) return null;

  const calendlyUrl = `https://calendly.com/feedback-flashfire/30min?utm_source=${
    typeof window !== "undefined"
      ? localStorage.getItem("utm_source") || "webpage_visit"
      : "webpage_visit"
  }&utm_medium=${
    typeof window !== "undefined"
      ? localStorage.getItem("utm_medium") || "website"
      : "website"
  }${
    typeof window !== "undefined" && localStorage.getItem("utm_campaign")
      ? `&utm_campaign=${localStorage.getItem("utm_campaign")}`
      : ""
  }${
    typeof window !== "undefined" && localStorage.getItem("utm_content")
      ? `&utm_content=${localStorage.getItem("utm_content")}`
      : ""
  }${
    typeof window !== "undefined" && localStorage.getItem("utm_term")
      ? `&utm_term=${localStorage.getItem("utm_term")}`
      : ""
  }`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center w-full"
      style={{ display: isVisible ? "flex" : "none" }}
    >
      <div className="relative bg-white max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col lg:flex-row">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/90 rounded-full p-2 shadow-lg"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Mobile Layout */}
        <div className="block lg:hidden h-full w-full">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  Schedule Your Flashfire Consultation
                </h2>
                <p className="text-orange-100 text-sm">30 Minutes • Free</p>
              </div>
            </div>
          </div>

          {/* Calendar - Full Height */}
          <div
            className="bg-white relative"
            style={{ height: "calc(100vh - 100px)" }}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-white flex items-center justify-center z-50">
                <div className="text-center px-6">
                  <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 text-sm">Loading calendar...</p>
                </div>
              </div>
            )}
            <InlineWidget
              url={calendlyUrl}
              prefill={{
                name: user?.fullName || "",
                email: user?.email || "",
                customAnswers: {
                  a3: (user?.countryCode || "") + (user?.phone || ""), // phone is the 3rd question
                },
              }}
              styles={{
                height: "100%",
                width: "100%",
                minHeight: "400px",
              }}
              pageSettings={{
                backgroundColor: "ffffff",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "f97316",
                textColor: "374151",
              }}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full h-[90vh]">
          {/* Orange Section (Info) */}
          <div className="w-2/5 bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white overflow-y-hidden rounded-l-xl">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Schedule Your Flashfire Consultation
                  </h2>
                  <p className="text-orange-100">30 Minutes • Free</p>
                </div>
              </div>
              <p className="text-orange-100 text-lg leading-relaxed">
                Book your personalized consultation to learn how Flashfire can
                automate your job search and land interviews faster.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold mb-4">What You&apos;ll Get:</h3>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Personalized Strategy</h4>
                  <p className="text-orange-100 text-sm">
                    Custom job search plan tailored to your goals
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Resume Review</h4>
                  <p className="text-orange-100 text-sm">
                    Expert feedback on your current resume
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">AI Demo</h4>
                  <p className="text-orange-100 text-sm">
                    See our automation technology in action
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Q&A Session</h4>
                  <p className="text-orange-100 text-sm">
                    Get all your questions answered by experts
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-orange-100 text-xs">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-orange-100 text-xs">Jobs Landed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">220+</div>
                  <div className="text-orange-100 text-xs">Hours Saved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="w-3/5 bg-white overflow-hidden rounded-r-xl relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white flex items-center justify-center z-50">
                <div className="text-center px-8">
                  <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-gray-700 text-lg font-medium">
                    Finding best slots for you...
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    This will only take a moment
                  </p>
                </div>
              </div>
            )}
            <InlineWidget
              url={calendlyUrl}
              prefill={{
                name: user?.fullName || "",
                email: user?.email || "",
                customAnswers: {
                  a3: (user?.countryCode || "") + (user?.phone || ""), // phone is the 3rd question
                },
              }}
              styles={{
                height: "100%",
                width: "100%",
                minHeight: "100%",
              }}
              pageSettings={{
                backgroundColor: "ffffff",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "f97316",
                textColor: "374151",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

