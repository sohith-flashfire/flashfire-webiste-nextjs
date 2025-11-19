"use client";

import { FaCreditCard } from "react-icons/fa";
import Link from "next/link";

export default function PaymentPolicy() {
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
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaCreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Payment Policy
              </h1>
              <p className="text-gray-600">Last updated: July 2025</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              This Payment Policy outlines the terms and conditions for all
              financial transactions related to Flashfire&rsquo;s AI-powered job
              application automation services. Please read this policy carefully
              before making any payments.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Methods
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Accepted Payment Methods
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>
                Major credit cards (Visa, MasterCard, American Express,
                Discover)
              </li>
              <li>Debit cards with Visa or MasterCard logos</li>
              <li>PayPal</li>
              <li>Bank transfers (for enterprise clients)</li>
              <li>Digital wallets (Apple Pay, Google Pay)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Currency
            </h3>
            <p className="text-gray-700 mb-6">
              All payments are processed in US Dollars (USD). International
              customers may be subject to currency conversion fees imposed by
              their financial institution.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pricing Structure
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Service Plans
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="text-gray-700 space-y-2">
                <li>
                  <strong>Ignite Plan:</strong> $249 (originally $349) - 250
                  applications
                </li>
                <li>
                  <strong>Professional Plan:</strong> $399 (originally $499) -
                  500 applications
                </li>
                <li>
                  <strong>Executive Plan:</strong> $649 (originally $749) - 1000
                  applications
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Free Trial Terms
            </h3>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <p className="text-gray-700">
                <strong>Trial Obligation:</strong> If you receive any interview
                call or recruiter response during the free trial period, you
                agree to pay a one-time service fee of $50 per interview call
                within 7 business days.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Processing
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              When Payments Are Charged
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Immediately upon plan selection and confirmation</li>
              <li>
                At the beginning of each billing cycle for recurring
                subscriptions
              </li>
              <li>
                Within 7 days of confirmed interview calls during trial period
              </li>
              <li>Upon purchase of additional services or upgrades</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Payment Confirmation
            </h3>
            <p className="text-gray-700 mb-6">
              You will receive an email confirmation for all successful
              payments, including transaction details, service description, and
              receipt information. Please retain these confirmations for your
              records.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Billing and Invoicing
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Billing Cycle
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>One-time payments for service packages</li>
              <li>Monthly billing for ongoing subscription services</li>
              <li>Annual billing options available with discounts</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Invoice Details
            </h3>
            <p className="text-gray-700 mb-6">
              All invoices include service description, billing period, amount
              due, payment due date, and applicable taxes. Invoices are sent via
              email to your registered email address.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Failed Payments
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Payment Failure Process
            </h3>
            <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
              <li>Immediate email notification of failed payment</li>
              <li>Automatic retry within 24 hours</li>
              <li>Second retry after 3 days if first retry fails</li>
              <li>Account suspension after 7 days of failed payment</li>
              <li>
                Service termination after 14 days without payment resolution
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Resolving Payment Issues
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Update payment method in your account settings</li>
              <li>Contact your bank to resolve card issues</li>
              <li>Reach out to our support team for assistance</li>
              <li>Ensure sufficient funds are available</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Taxes and Fees
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Sales Tax
            </h3>
            <p className="text-gray-700 mb-6">
              Sales tax may be applied based on your billing address and local
              tax regulations. Tax amounts will be clearly displayed before
              payment confirmation.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Processing Fees
            </h3>
            <p className="text-gray-700 mb-6">
              Flashfire absorbs standard payment processing fees. However,
              certain payment methods or international transactions may incur
              additional fees, which will be disclosed before payment.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Security and Privacy
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Payment Security
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>
                All payments are processed through secure, encrypted connections
              </li>
              <li>We use industry-standard SSL encryption</li>
              <li>
                Payment information is processed by certified payment processors
              </li>
              <li>
                We do not store complete credit card information on our servers
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              PCI Compliance
            </h3>
            <p className="text-gray-700 mb-6">
              Our payment processing partners are PCI DSS compliant, ensuring
              the highest standards of payment card data security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Disputes and Chargebacks
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Dispute Resolution
            </h3>
            <p className="text-gray-700 mb-4">
              Before initiating a chargeback with your bank, please contact our
              support team to resolve any payment disputes. We are committed to
              finding fair solutions quickly.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Chargeback Policy
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Chargebacks may result in immediate account suspension</li>
              <li>
                We will provide documentation to support legitimate charges
              </li>
              <li>
                Chargeback fees may be passed on to the customer if the dispute
                is resolved in our favor
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to Pricing
            </h2>
            <p className="text-gray-700 mb-6">
              Flashfire reserves the right to modify pricing at any time.
              Existing customers will be notified of price changes at least 30
              days in advance. Price changes will not affect current billing
              cycles but will apply to subsequent renewals.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              For payment-related questions or issues, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> support@flashfirejobs.com
              </p>
              <p className="text-gray-700">
                <strong>Subject Line:</strong> &quot;Payment Inquiry - [Your
                Name]&quot;
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> Available upon request for urgent
                payment issues
              </p>
              <p className="text-gray-700">
                <strong>Response Time:</strong> Within 24 hours during business
                days
              </p>
            </div>

            <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-purple-800 font-medium">
                We are committed to transparent and secure payment processing.
                If you have any questions about our payment policies or need
                assistance with billing, our support team is here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
