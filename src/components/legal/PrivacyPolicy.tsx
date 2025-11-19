"use client";

import { FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Link
            href="/"
            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-4 transition-colors duration-200"
          >
            <span>← Back to Home</span>
          </Link>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaShieldAlt className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-gray-600">Last updated: July 2025</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              At Flashfire, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, store, and protect your data
              when you use our AI-powered job application automation platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Personal Information
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Educational background and work experience</li>
              <li>Resume content and job preferences</li>
              <li>LinkedIn profile information (when provided)</li>
              <li>Work authorization status</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Usage Data
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Job applications submitted through our platform</li>
              <li>Website interactions and navigation patterns</li>
              <li>Device information and IP addresses</li>
              <li>Browser type and operating system</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>To provide personalized job recommendations and matching</li>
              <li>
                To optimize and tailor your resume for specific job applications
              </li>
              <li>To submit job applications on your behalf</li>
              <li>
                To communicate with you about interview opportunities and
                updates
              </li>
              <li>To improve our platform performance and user experience</li>
              <li>To provide customer support and technical assistance</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We implement industry-standard security measures to protect your
              personal information, including encryption, secure servers, and
              access controls. Your data is stored securely and is only
              accessible to authorized personnel who need it to provide our
              services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>
                With potential employers when submitting job applications (as
                part of our service)
              </li>
              <li>
                With service providers who assist us in operating our platform
              </li>
              <li>When required by law or to protect our legal rights</li>
              <li>With your explicit consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-gray-700 mb-6">
              Our website uses cookies and similar technologies to enhance your
              browsing experience, analyze website traffic, and personalize
              content. You can control cookie settings through your browser
              preferences, though some features may not function properly if
              cookies are disabled.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Retention
            </h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information for as long as your account is
              active or as needed to provide our services. We may also retain
              certain information as required by law or for legitimate business
              purposes, such as fraud prevention and safety.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Children&rsquo;s Privacy
            </h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children
              under 18. If we become aware that we have collected such
              information, we will take steps to delete it promptly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              International Data Transfers
            </h2>
            <p className="text-gray-700 mb-6">
              Your information may be transferred to and processed in countries
              other than your own. We ensure that such transfers comply with
              applicable data protection laws and that appropriate safeguards
              are in place.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the updated policy
              on our website and updating the &quot;Last updated&quot; date.
              Your continued use of our services after such changes constitutes
              acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> support@Flashfirejobs.com
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong> www.Flashfirejobs.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
