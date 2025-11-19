"use client";

import { FaSyncAlt } from "react-icons/fa";
import Link from "next/link";

export default function RefundPolicy() {
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
            <div className="p-2 bg-green-100 rounded-lg">
              <FaSyncAlt className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Refund Policy
              </h1>
              <p className="text-gray-600">Last updated: July 2025</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              At Flashfire, we are committed to your satisfaction and success in
              finding your dream job. This policy outlines our approach to
              ensuring you receive maximum value from our AI-powered job
              application automation services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Refund Policy
            </h2>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <p className="text-gray-700">
                <strong>Important:</strong> We do not offer refunds for our
                services. However, we ensure you receive exceptional value by
                providing 150-200+ job applications as part of our commitment to
                your success.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Premium Plan Guarantee
            </h3>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <p className="text-gray-700">
                <strong>Exclusive to Premium Plan users:</strong> If you
                don&rsquo;t receive any interview calls by the end of your plan
                period, we will send 100+ additional applications and provide a
                free resume update at no extra cost.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Value Guarantee
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              150-200+ Job Applications
            </h3>
            <p className="text-gray-700 mb-4">
              Instead of refunds, we guarantee that you will receive exceptional
              value through our comprehensive job application service:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>
                150-200+ targeted job applications tailored to your profile
              </li>
              <li>
                Resume optimization and customization for each application
              </li>
              <li>LinkedIn profile enhancement and optimization</li>
              <li>Application tracking and progress monitoring</li>
              <li>Ongoing support throughout your job search journey</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Service Commitment
            </h3>
            <p className="text-gray-700 mb-6">
              We are committed to delivering maximum value for your investment.
              Our team works diligently to ensure you receive high-quality,
              targeted job applications that match your skills, experience, and
              career goals. Every application is carefully crafted and submitted
              to maximize your chances of landing interviews.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Modifications to This Policy
            </h2>
            <p className="text-gray-700 mb-6">
              Flashfire reserves the right to modify this Refund Policy at any
              time. Changes will be posted on our website and will apply to
              future transactions. Existing customers will be notified of
              significant changes via email.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              For questions about our services or this policy, please contact
              us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> support@Flashfirejobs.com
              </p>
              <p className="text-gray-700">
                <strong>Response Time:</strong> Within 24 hours during business
                days
              </p>
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">
                We value your trust in Flashfire and are committed to ensuring
                your success in finding your dream job. Our focus is on
                delivering exceptional value through our comprehensive job
                application service, ensuring you receive 150-200+ high-quality
                applications tailored to your career goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
