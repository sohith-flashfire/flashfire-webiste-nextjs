// =====================================================
// UTM PARAMETER PRESERVATION UTILITIES
// =====================================================

// Get current UTM parameters from localStorage
export const getCurrentUTMParams = (): string => {
  if (typeof window === 'undefined') return '';

  const utmSource = localStorage.getItem('utm_source');
  const utmMedium = localStorage.getItem('utm_medium');
  const utmCampaign = localStorage.getItem('utm_campaign');
  const utmContent = localStorage.getItem('utm_content');
  const utmTerm = localStorage.getItem('utm_term');

  const params = new URLSearchParams();

  if (utmSource) params.set('utm_source', utmSource);
  if (utmMedium) params.set('utm_medium', utmMedium);
  if (utmCampaign) params.set('utm_campaign', utmCampaign);
  if (utmContent) params.set('utm_content', utmContent);
  if (utmTerm) params.set('utm_term', utmTerm);

  return params.toString();
};

// Check if UTM parameters exist in localStorage
export const hasUTMParams = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(localStorage.getItem('utm_source') || localStorage.getItem('utm_medium'));
};

// Get UTM source for display/logging
export const getUTMSource = (): string => {
  if (typeof window === 'undefined') return 'direct';
  return localStorage.getItem('utm_source') || 'direct';
};

// Get UTM medium for display/logging  
export const getUTMMedium = (): string => {
  if (typeof window === 'undefined') return 'website';
  return localStorage.getItem('utm_medium') || 'website';
};

// Capture UTM parameters from URL and store in localStorage
export const captureUTMParams = (): void => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);

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
};
