"use client";

import { useState, useEffect, useRef } from "react";
import { X, User, Phone, Mail } from "lucide-react";
import {
  loadFormData,
  saveFormData,
  clearFormData,
  FormData,
} from "@/src/utils/LocalStorageUtils";
import CalendlyModal from "@/src/components/calendlyModal/CalendlyModal";
import { trackFormStart, trackFormSubmit, trackModalOpen, trackModalClose } from "@/src/utils/PostHogTracking";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState<FormData>(() => loadFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const prevIsOpenRef = useRef(isOpen);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Load form data from localStorage when modal opens and track events
  useEffect(() => {
    const wasOpen = prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (isOpen && !wasOpen) {
      // Modal just opened - reload form data and track events
      const savedData = loadFormData();
      // Use requestAnimationFrame to defer state update and avoid synchronous setState warning
      requestAnimationFrame(() => {
        setFormData(savedData);
      });
      
      // Track modal open
      trackModalOpen("signup_modal", "hero_cta", {
        trigger_source: "hero_button"
      });
      // Track form start
      trackFormStart("signup_form", "initial");
    }
  }, [isOpen]);

  const countryCodes = [
    { code: "+1", country: "USA", pattern: /^1/ },
    { code: "+91", country: "India", pattern: /^91/ },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newFormData: FormData;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        newFormData = {
          ...formData,
          [name]: numericValue,
        };
      } else {
        return;
      }
    } else {
      newFormData = { ...formData, [name]: value };
    }

    setFormData(newFormData);
    saveFormData(newFormData);
    setError("");
  };

  async function SaveDetailsToDB() {
    if (!API_BASE_URL) {
      console.error("API_BASE_URL is not configured - proceeding to Calendly anyway");
      // Return true to allow Calendly to open even if API is not configured
      return true;
    }
    
    try {
      // Combine country code and phone number (remove any spaces or dashes)
      const fullPhoneNumber = `${formData.countryCode}${formData.phone.replace(/\D/g, "")}`;
      
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          mobile: fullPhoneNumber,
          workAuthorization: formData.workAuthorization,
        }),
      });

      // Get response text first (can only be called once)
      const responseText = await response.text();
      let result: { message?: string } = {};
      
      // Try to parse as JSON
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          // If not JSON, that's okay - we'll use status code
          console.log("Response is not JSON, using status code");
        }
      }
      
      console.log("Response from server:", result);
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);

      // Always proceed to Calendly, regardless of response
      // Backend will handle Discord notifications for both success and duplicate cases
      if (response.ok && (response.status === 200 || response.status === 201)) {
        console.log("✅ Form submitted successfully");
      } else {
        // Log error but don't show in UI - Discord notification is sufficient
        const errorMessage = result?.message || "Unknown error";
        console.log("ℹ️ Backend response:", errorMessage, "(Discord notification sent)");
      }
      
      // Always return true to proceed to Calendly
      return true;
    } catch (error) {
      // Log error but don't show in UI - still proceed to Calendly
      console.error("Error saving to DB:", error);
      console.log("ℹ️ Proceeding to Calendly anyway");
      // Still return true to open Calendly
      return true;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.workAuthorization ||
      formData.phone.length !== 10
    ) {
      setError("Please fill in all fields correctly");
      return;
    }

    setIsSubmitting(true);
    setError(""); // Clear any previous errors

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("submitted", "true");
      }

      // PostHog tracking - form submit
      trackFormSubmit("signup_form", {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        work_authorization: formData.workAuthorization,
        country_code: formData.countryCode
      });

      // Always proceed to Calendly after form submission
      // Backend handles Discord notifications regardless of success/duplicate
      await SaveDetailsToDB();
      
      // Open Calendly modal (always, regardless of backend response)
      setIsSubmitting(false);
      setIsCalendlyOpen(true);
    } catch (error) {
      console.error("Error during form submission:", error);
      // Still proceed to Calendly even on error
      setIsSubmitting(false);
      setIsCalendlyOpen(true);
    }
  };

  const handleCalendlyClose = () => {
    setIsCalendlyOpen(false);
    clearFormData(); // Clear form data after Calendly is closed
    trackModalClose("signup_modal", "programmatic");
    onClose(); // Close the signup modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center w-full">
      <div className="bg-white w-fit mx-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
        <div className="p-6 w-full">
          <div className="flex justify-between items-start mb-6 w-full">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Started for Free
              </h2>
              <p className="text-gray-600 text-sm">
                Tell us about yourself to schedule your consultation
              </p>
            </div>
            <button
              onClick={() => {
                trackModalClose("signup_modal", "button");
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} name="signupform" className="space-y-4">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" /> Phone Number (10
                digits only)
              </label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="w-full sm:w-auto px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter 10-digit phone number"
                  pattern="[0-9]{10}"
                  inputMode="numeric"
                  maxLength={10}
                  required
                />
              </div>
              {formData.phone && formData.phone.length !== 10 && (
                <p className="text-red-500 text-sm mt-1">
                  Phone number must be exactly 10 digits
                </p>
              )}
            </div>

            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                Are you authorized to work in USA?
              </label>
              <select
                name="workAuthorization"
                value={formData.workAuthorization}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || formData.phone.length !== 10}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            No spam, ever. We respect your privacy.
          </p>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal
        isVisible={isCalendlyOpen}
        onClose={handleCalendlyClose}
        user={{
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          countryCode: formData.countryCode,
        }}
      />
    </div>
  );
}

