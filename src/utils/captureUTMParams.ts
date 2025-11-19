export const captureUTMParams = () => {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const utmContent = params.get("utm_content");
  const utmTerm = params.get("utm_term");

  if (utmSource) {
    localStorage.setItem("utm_source", utmSource);
    console.log("Stored utm_source:", utmSource);
  }
  if (utmMedium) {
    localStorage.setItem("utm_medium", utmMedium);
    console.log("Stored utm_medium:", utmMedium);
  }
  if (utmCampaign) {
    localStorage.setItem("utm_campaign", utmCampaign);
    console.log("Stored utm_campaign:", utmCampaign);
  }
  if (utmContent) {
    localStorage.setItem("utm_content", utmContent);
    console.log("Stored utm_content:", utmContent);
  }
  if (utmTerm) {
    localStorage.setItem("utm_term", utmTerm);
    console.log("Stored utm_term:", utmTerm);
  }

  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("visitor_id", visitorId);
  }

  if (utmSource) {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.flashfirejobs.com";
    fetch(`${API_BASE_URL}/api/campaigns/track/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        utmSource,
        visitorId,
        userAgent: navigator.userAgent,
        ipAddress: null,
        referrer: document.referrer,
        pageUrl: window.location.href,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("✅ Campaign page visit tracked:", data.data);
        }
      })
      .catch((err) => console.error("Campaign tracking failed:", err));
  }

  if (ref) {
    const payload = {
      ref,
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    fetch("https://clients-tracking-backend.onrender.com/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log("UTM Source from ref:", data.utm_source);
          if (!localStorage.getItem("utm_source")) {
            localStorage.setItem("utm_source", data.utm_source);
          }
          localStorage.setItem("ref-code", ref);
        } else {
          console.warn("Tracking error:", data.message || data.error);
        }
      })
      .catch((err) => console.error("Tracking failed:", err));
  }
};

