"use client";

import { FaFileAlt } from "react-icons/fa";
import Link from "next/link";

export default function TermsOfService() {
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
            <div className="p-2 bg-orange-100 rounded-lg">
              <FaFileAlt className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Terms and Conditions
              </h1>
              <p className="text-gray-600">Last updated: July 2025</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Welcome to Flashfire. These Terms and Conditions
              (&quot;Terms&quot;) govern your access to and use of the Flashfire
              website, services, and technology platform (collectively, the
              &quot;Service&quot;). Please read these Terms carefully before
              using our Service.
            </p>

            <p className="text-gray-700 mb-8">
              By using Flashfire, you agree to be bound by these Terms. If you
              do not agree, you must not use the Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. About Flashfire
            </h2>
            <p className="text-gray-700 mb-6">
              Flashfire is an AI-powered job application automation platform
              built to help international students and professionals find and
              apply to jobs in the United States. Flashfire provides resume
              optimization, job targeting, LinkedIn enhancement, and mass
              application services designed to reduce the time and complexity of
              job hunting.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Eligibility
            </h2>
            <p className="text-gray-700 mb-6">
              To use Flashfire, you must be at least 18 years old or the legal
              age of majority in your jurisdiction. By registering, you confirm
              that you meet this requirement. The platform is intended only for
              job-seeking individuals and not for employer or commercial use
              unless explicitly authorized.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Account Registration
            </h2>
            <p className="text-gray-700 mb-4">
              You may be required to create an account to access some features.
              You are responsible for maintaining the confidentiality of your
              login credentials and for all activities that occur under your
              account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Provide accurate, complete, and current information</li>
              <li>Update information as needed to maintain its accuracy</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Trial Use & Payment Terms
            </h2>
            <p className="text-gray-700 mb-4">
              We currently offer a limited-time free trial to help new users
              experience Flashfire&rsquo;s capabilities.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Trial Obligation:
              </h3>
              <p className="text-gray-700">
                If you receive any interview call or recruiter response from
                applications submitted during the free trial period, you agree
                to pay Flashfire a one-time service fee of $50 per interview
                call.
              </p>
            </div>
            <p className="text-gray-700 mb-6">
              We reserve the right to verify the legitimacy of any interview
              invitation. Payment is expected within 7 business days of
              confirmation. Failure to comply may result in account suspension,
              legal action, or collection measures.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Paid Subscriptions
            </h2>
            <p className="text-gray-700 mb-4">
              Post-trial, users may subscribe to a paid plan based on their
              needs. All pricing, application quotas, and support tiers are
              outlined on our Pricing page. All payments are non-refundable
              unless otherwise stated in a written agreement. Subscription plans
              automatically renew unless canceled.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Refund Policy:
              </h3>
              <p className="text-gray-700">
                If you get a job in between the process of applying with us, we
                won&rsquo;t be able to give you the refund.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Service Limitations
            </h2>
            <p className="text-gray-700 mb-6">
              Flashfire does not guarantee job offers, interview calls, hiring
              outcomes, or employer responses. Our service is designed to
              maximize your visibility and effectiveness, but we do not control
              third-party recruiter actions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. User Responsibilities
            </h2>
            <p className="text-gray-700 mb-4">
              By using Flashfire, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>
                Provide truthful and accurate information in your profile and
                resume
              </li>
              <li>Not impersonate or misrepresent your identity</li>
              <li>
                Not misuse the platform for spam, fraudulent activity, or
                non-compliant job applications
              </li>
              <li>Comply with all applicable local, state, and federal laws</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Intellectual Property
            </h2>
            <p className="text-gray-700 mb-6">
              All Flashfire branding, content, graphics, designs, and platform
              code are the exclusive property of Flashfire. You may not
              reproduce, distribute, or modify any part of the platform without
              our written permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Termination
            </h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to suspend, restrict, or terminate your
              access at our discretion if you violate these Terms or misuse the
              platform. Upon termination, your access to services and data will
              cease immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-6">
              To the maximum extent permitted by law, Flashfire and its
              officers, employees, and partners shall not be liable for any
              indirect, incidental, special, or consequential damages, including
              but not limited to data loss, employment losses, or reputational
              damage.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Privacy Policy
            </h2>
            <p className="text-gray-700 mb-4">
              Flashfire respects your privacy. By using the Service, you agree
              to the collection and use of your information as outlined below:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Data Collected:
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Name, email address, phone number</li>
              <li>Educational and employment background</li>
              <li>Resume and job preferences</li>
              <li>Usage data (e.g., applications submitted, links clicked)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How We Use It:
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>To personalize job recommendations</li>
              <li>To optimize resumes and applications</li>
              <li>
                To contact you about updates, interview calls, or new features
              </li>
              <li>To improve platform performance and customer support</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Data Security:
            </h3>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security protocols to protect your
              data. Your personal information is not shared with third parties
              without your explicit consent, except where required by law.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Cookies:
            </h3>
            <p className="text-gray-700 mb-4">
              Our website uses cookies to enhance user experience and collect
              analytical data. You can disable cookies through your browser
              settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Data Retention:
            </h3>
            <p className="text-gray-700 mb-4">
              We retain your information for as long as your account is active
              or as needed to fulfill legal obligations.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              User Control:
            </h3>
            <p className="text-gray-700 mb-6">
              You may request access, correction, or deletion of your personal
              data by emailing support@Flashfirejobs.com.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Changes to These Terms
            </h2>
            <p className="text-gray-700 mb-6">
              We may update these Terms and our Privacy Policy periodically. All
              changes will be posted on this page. Continued use of the Service
              after updates constitutes acceptance.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. Governing Law
            </h2>
            <p className="text-gray-700 mb-6">
              These Terms are governed by and interpreted in accordance with the
              laws of the United States and the State of New York, without
              regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              14. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these Terms or our Privacy Policy,
              please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> support@flashfirejobs.com
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong> www.flashfirejobs.com
              </p>
            </div>

            <div className="mt-8 p-6 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-orange-800 font-medium">
                Thank you for using Flashfire. We&rsquo;re committed to helping
                you land your dream job, faster and smarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
