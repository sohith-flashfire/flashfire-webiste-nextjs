export const GTagUTM = ({
  eventName = "click",
  label,
  utmParams,
}: {
  eventName?: string;
  label?: string;
  utmParams?: { [key: string]: string };
}) => {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      event_category: "CTA",
      event_label: label || eventName,
      ...utmParams,
    });
  }
  
  if (utmParams) {
    sessionStorage.setItem("utm_data", JSON.stringify(utmParams));

    if (utmParams.utm_source) {
      localStorage.setItem("utm_source", utmParams.utm_source);
    }
    if (utmParams.utm_medium) {
      localStorage.setItem("utm_medium", utmParams.utm_medium);
    }
    if (utmParams.utm_campaign) {
      localStorage.setItem("utm_campaign", utmParams.utm_campaign);
    }
    if (utmParams.utm_content) {
      localStorage.setItem("utm_content", utmParams.utm_content);
    }
    if (utmParams.utm_term) {
      localStorage.setItem("utm_term", utmParams.utm_term);
    }
  }
};

