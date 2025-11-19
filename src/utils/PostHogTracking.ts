/* eslint-disable @typescript-eslint/no-explicit-any */
import posthog from "posthog-js";

// Event naming convention: [action]_[object]_[context]
// Examples: button_click_hero_cta, form_submit_signup, page_view_home

export interface PostHogEventProperties {
  // User context
  user_id?: string;
  email?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;

  // Page context
  page_url?: string;
  page_title?: string;
  section?: string;
  component?: string;

  // Button context
  button_text?: string;
  button_location?: string;
  button_type?: string;

  // Form context
  form_name?: string;
  form_step?: string;
  field_name?: string;

  // Navigation context
  from_page?: string;
  to_page?: string;
  navigation_type?: string;

  // Device context
  device_type?: string;
  screen_size?: string;
  browser?: string;

  // Geo context (for country-wise stats)
  country_code?: string;
  country_name?: string;
  is_canada?: boolean;
  locale?: string;

  // Business context
  lead_source?: string;
  conversion_value?: number;
  funnel_stage?: string;

  // Custom properties
  [key: string]: any;
}

// Safe PostHog capture with error handling
const safeCapture = (
  eventName: string,
  properties?: PostHogEventProperties,
) => {
  try {
    if (typeof posthog !== "undefined" && posthog.capture) {
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        ...properties,
      });
      console.log(`PostHog tracked: ${eventName}`, properties);
    } else {
      console.warn("PostHog not initialized");
    }
  } catch (error) {
    console.error("PostHog tracking error:", error);
  }
};

// Get current page context
const getPageContext = (): Partial<PostHogEventProperties> => {
  // Check if we're in browser environment (Next.js SSR)
  if (typeof window === "undefined") {
    return {};
  }

  return {
    page_url: window.location.href,
    page_title: document.title,
    device_type:
      window.innerWidth < 768
        ? "mobile"
        : window.innerWidth < 1024
          ? "tablet"
          : "desktop",
    screen_size: `${window.innerWidth}x${window.innerHeight}`,
    browser: navigator.userAgent.split(" ").pop() || "unknown",
  };
};

// Get country code from localStorage or detect from URL
const getCountryContext = (): Partial<PostHogEventProperties> => {
  // Check if we're in browser environment (Next.js SSR)
  if (typeof window === "undefined") {
    return {};
  }

  // Check if user is on Canada page
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const countryCode = localStorage.getItem("ff_country_code_v1") || (isCanada ? "CA" : "US");
  
  // Map country codes to names
  const countryNames: Record<string, string> = {
    CA: "Canada",
    US: "United States",
    IN: "India",
    GB: "United Kingdom",
  };

  return {
    country_code: countryCode,
    country_name: countryNames[countryCode] || countryCode,
    is_canada: isCanada,
    locale: isCanada ? "en-ca" : "en-us",
  };
};

// Get UTM parameters from localStorage or URL
const getUTMContext = (): Partial<PostHogEventProperties> => {
  // Check if we're in browser environment (Next.js SSR)
  if (typeof window === "undefined") {
    return {};
  }


  const utmSource =
    localStorage.getItem("utm_source") ||
    new URLSearchParams(window.location.search).get("utm_source");
  const utmMedium =
    localStorage.getItem("utm_medium") ||
    new URLSearchParams(window.location.search).get("utm_medium");
  const utmCampaign =
    localStorage.getItem("utm_campaign") ||
    new URLSearchParams(window.location.search).get("utm_campaign");
  const utmContent =
    localStorage.getItem("utm_content") ||
    new URLSearchParams(window.location.search).get("utm_content");
  const utmTerm =
    localStorage.getItem("utm_term") ||
    new URLSearchParams(window.location.search).get("utm_term");
  const refCode = localStorage.getItem("ref-code");

  return {
    utm_source: utmSource || "direct",
    utm_medium: utmMedium || "website",
    utm_campaign: utmCampaign || "organic",
    utm_content: utmContent || "none",
    utm_term: utmTerm || "none",
    lead_source: refCode || utmSource || "direct",
  };
};

export const trackButtonClick = (
  buttonText: string,
  location: string,
  buttonType: "cta" | "secondary" | "link" | "icon" = "cta",
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("button_click", {
    ...getPageContext(),
    ...getUTMContext(),
    ...getCountryContext(),
    button_text: buttonText,
    button_location: location,
    button_type: buttonType,
    component: "button",
    ...additionalProperties,
  });
};

export const trackFormStart = (
  formName: string,
  formStep: string = "initial",
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("form_start", {
    ...getPageContext(),
    ...getUTMContext(),
    ...getCountryContext(),
    form_name: formName,
    form_step: formStep,
    component: "form",
    ...additionalProperties,
  });
};

export const trackFormFieldFocus = (
  formName: string,
  fieldName: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("form_field_focus", {
    ...getPageContext(),
    ...getUTMContext(),
    form_name: formName,
    field_name: fieldName,
    component: "form_field",
    ...additionalProperties,
  });
};

export const trackFormSubmit = (
  formName: string,
  formData?: any,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("form_submit", {
    ...getPageContext(),
    ...getUTMContext(),
    ...getCountryContext(),
    form_name: formName,
    form_data: formData,
    component: "form",
    funnel_stage: "form_submission",
    ...additionalProperties,
  });
};

export const trackFormError = (
  formName: string,
  errorMessage: string,
  fieldName?: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("form_error", {
    ...getPageContext(),
    ...getUTMContext(),
    form_name: formName,
    field_name: fieldName,
    error_message: errorMessage,
    component: "form",
    ...additionalProperties,
  });
};

export const trackPageView = (
  pageName: string,
  section?: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("page_view", {
    ...getPageContext(),
    ...getUTMContext(),
    ...getCountryContext(),
    page_name: pageName,
    section: section,
    component: "page",
    ...additionalProperties,
  });
};

export const trackSectionView = (
  sectionName: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("section_view", {
    ...getPageContext(),
    ...getUTMContext(),
    section: sectionName,
    component: "section",
    ...additionalProperties,
  });
};

export const trackNavigation = (
  fromPage: string,
  toPage: string,
  navigationType: "click" | "scroll" | "programmatic" = "click",
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("navigation", {
    ...getPageContext(),
    ...getUTMContext(),
    from_page: fromPage,
    to_page: toPage,
    navigation_type: navigationType,
    component: "navigation",
    ...additionalProperties,
  });
};

export const trackUserJourney = (
  stage: string,
  action: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("user_journey", {
    ...getPageContext(),
    ...getUTMContext(),
    funnel_stage: stage,
    action: action,
    component: "user_journey",
    ...additionalProperties,
  });
};

export const trackConversion = (
  conversionType: string,
  value?: number,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("conversion", {
    ...getPageContext(),
    ...getUTMContext(),
    conversion_type: conversionType,
    conversion_value: value,
    funnel_stage: "conversion",
    component: "conversion",
    ...additionalProperties,
  });
};

export const trackModalOpen = (
  modalName: string,
  triggerSource: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("modal_open", {
    ...getPageContext(),
    ...getUTMContext(),
    modal_name: modalName,
    trigger_source: triggerSource,
    component: "modal",
    ...additionalProperties,
  });
};

export const trackModalClose = (
  modalName: string,
  closeMethod: "button" | "overlay" | "escape" | "programmatic",
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("modal_close", {
    ...getPageContext(),
    ...getUTMContext(),
    modal_name: modalName,
    close_method: closeMethod,
    component: "modal",
    ...additionalProperties,
  });
};

export const trackExternalLink = (
  linkUrl: string,
  linkText: string,
  linkLocation: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("external_link_click", {
    ...getPageContext(),
    ...getUTMContext(),
    link_url: linkUrl,
    link_text: linkText,
    link_location: linkLocation,
    component: "external_link",
    ...additionalProperties,
  });
};

export const trackScrollDepth = (
  depth: number,
  section?: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("scroll_depth", {
    ...getPageContext(),
    ...getUTMContext(),
    scroll_depth: depth,
    section: section,
    component: "scroll",
    ...additionalProperties,
  });
};

export const trackElementInteraction = (
  elementType: string,
  elementText: string,
  elementPosition: { x: number; y: number },
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("element_interaction", {
    ...getPageContext(),
    ...getUTMContext(),
    element_type: elementType,
    element_text: elementText,
    element_position_x: elementPosition.x,
    element_position_y: elementPosition.y,
    component: "heatmap",
    ...additionalProperties,
  });
};

export const trackHeatmapView = (
  pageName: string,
  viewportSize: { width: number; height: number },
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("heatmap_view", {
    ...getPageContext(),
    ...getUTMContext(),
    page_name: pageName,
    viewport_width: viewportSize.width,
    viewport_height: viewportSize.height,
    component: "heatmap",
    ...additionalProperties,
  });
};

export const trackSignupIntent = (
  source: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("signup_intent", {
    ...getPageContext(),
    ...getUTMContext(),
    signup_source: source,
    funnel_stage: "signup_intent",
    component: "signup",
    ...additionalProperties,
  });
};

export const trackDemoRequest = (
  source: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("demo_request", {
    ...getPageContext(),
    ...getUTMContext(),
    demo_source: source,
    funnel_stage: "demo_request",
    component: "demo",
    ...additionalProperties,
  });
};

export const trackEmployerInterest = (
  source: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("employer_interest", {
    ...getPageContext(),
    ...getUTMContext(),
    employer_source: source,
    funnel_stage: "employer_interest",
    component: "employer",
    ...additionalProperties,
  });
};
export const trackError = (
  errorType: string,
  errorMessage: string,
  component: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("error_occurred", {
    ...getPageContext(),
    ...getUTMContext(),
    error_type: errorType,
    error_message: errorMessage,
    component: component,
    ...additionalProperties,
  });
};

// Track time spent on page
export const trackTimeOnPage = (
  timeSpent: number,
  pageName: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("time_on_page", {
    ...getPageContext(),
    ...getUTMContext(),
    time_spent: timeSpent,
    page_name: pageName,
    component: "time_tracking",
    ...additionalProperties,
  });
};

// Track feature usage
export const trackFeatureUsage = (
  featureName: string,
  action: string,
  additionalProperties?: Partial<PostHogEventProperties>,
) => {
  safeCapture("feature_usage", {
    ...getPageContext(),
    ...getUTMContext(),
    feature_name: featureName,
    feature_action: action,
    component: "feature",
    ...additionalProperties,
  });
};

const PostHogTracking = {
  trackButtonClick,
  trackFormStart,
  trackFormFieldFocus,
  trackFormSubmit,
  trackFormError,
  trackPageView,
  trackSectionView,
  trackNavigation,
  trackUserJourney,
  trackConversion,
  trackModalOpen,
  trackModalClose,
  trackExternalLink,
  trackScrollDepth,
  trackElementInteraction,
  trackHeatmapView,
  trackSignupIntent,
  trackDemoRequest,
  trackEmployerInterest,
  trackError,
  trackTimeOnPage,
  trackFeatureUsage,
};

export default PostHogTracking;
