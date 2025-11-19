"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Loader,
} from "lucide-react";

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const urgencyOptions = [
  "Immediate (within 1 week)",
  "Soon (within 1 month)",
  "Flexible (within 3 months)",
  "Planning ahead (3+ months)",
];

const INITIAL_FORM_DATA = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  companySize: "",
  industry: "",
  location: "",
  jobTitle: "",
  jobDescription: "",
  salaryRange: "",
  urgency: "",
  hiringNeeds: "",
};

type FormData = typeof INITIAL_FORM_DATA;

export default function EmployerForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields: Array<keyof FormData> = [
      "companyName",
      "contactName",
      "email",
      "phone",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length) {
      setError(
        `Please fill in all required fields: ${emptyFields
          .map((field) => field.replace(/([A-Z])/g, " $1").toLowerCase())
          .join(", ")}`,
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        
        if (!baseUrl) {
          console.error("NEXT_PUBLIC_API_BASE_URL is not set");
          setError("Configuration error. Please contact support.");
          setLoading(false);
          return;
        }
    
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/employerform`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let result: { message?: string; success?: boolean } = {};
      
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.log("Response is not JSON, using status code");
        }
      }

      console.log("Response from server:", result);
      console.log("Response status:", response.status);

      // Always show success to user, even for duplicates (handled in backend/Discord)
      if (response.ok && (response.status === 200 || response.status === 201)) {
        console.log("✅ Form submitted successfully");
        setSuccess(true);
        setFormData(INITIAL_FORM_DATA);
        setTimeout(() => router.push("/"), 2000);
      } else {
        // Log error but don't show to user (Discord notification sent)
        const errorMessage = result?.message || "Unknown error";
        console.log("ℹ️ Backend response:", errorMessage, "(Discord notification sent)");
        // Still show success to user
        setSuccess(true);
        setFormData(INITIAL_FORM_DATA);
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (err) {
      console.error("Error submitting employer form:", err);
      // Show generic error only for network issues
      setError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Partner with Flashfire
          </h2>
          <p className="mt-2 text-xl text-gray-600">
            Find top talent faster with our AI-powered recruitment platform
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="px-6 py-8 sm:px-8">
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-600">
                  Thank you for your submission! We&apos;ll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <section>
                <div className="mb-4 flex items-center">
                  <Building className="mr-2 h-5 w-5 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Company Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="industry"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Industry
                    </label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Technology, Finance, Healthcare"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="companySize"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Company Size
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select company size</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="mb-2 flex items-center text-sm font-medium text-gray-700"
                    >
                      <MapPin className="mr-1 h-4 w-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="City, State/Country"
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Contact Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contactName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="your@company.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="phone"
                      className="mb-2 flex items-center text-sm font-medium text-gray-700"
                    >
                      <Phone className="mr-1 h-4 w-4" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Hiring Needs
                  </h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="jobTitle"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Job Title/Position
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Software Engineer, Data Analyst"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="salaryRange"
                        className="mb-2 flex items-center text-sm font-medium text-gray-700"
                      >
                        <DollarSign className="mr-1 h-4 w-4" />
                        Salary Range
                      </label>
                      <input
                        type="text"
                        id="salaryRange"
                        name="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., $80,000 - $120,000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="urgency"
                        className="mb-2 flex items-center text-sm font-medium text-gray-700"
                      >
                        <Calendar className="mr-1 h-4 w-4" />
                        Urgency
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select urgency</option>
                        {urgencyOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="jobDescription"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Job Description
                    </label>
                    <textarea
                      id="jobDescription"
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="Brief description of the role and requirements"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hiringNeeds"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Additional Hiring Needs
                    </label>
                    <textarea
                      id="hiringNeeds"
                      name="hiringNeeds"
                      value={formData.hiringNeeds}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                      placeholder="Any specific requirements or additional information"
                    />
                  </div>
                </div>
              </section>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-lg bg-orange-600 px-6 py-4 font-semibold text-white transition-colors duration-200 hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Hiring Request"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

