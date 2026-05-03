import Link from 'next/link';

export default function UsdotPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <Link href="/" className="text-primary-600 hover:underline text-sm">← Back to Home</Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        USDOT Number Registration and Services
      </h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p>
          A <strong>USDOT number</strong> (United States Department of Transportation number) is a unique identifier assigned by the FMCSA to motor carriers operating in interstate commerce. This number is essential for legal operation and compliance with federal regulations.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Why Do You Need a USDOT Number?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Federal requirement</strong>: Required for carriers transporting goods across state lines.</li>
          <li><strong>Insurance purposes</strong>: Necessary for obtaining commercial auto insurance.</li>
          <li><strong>IRP registration</strong>: Required for International Registration Plan participation.</li>
          <li><strong>Compliance tracking</strong>: Used by FMCSA to monitor safety and compliance records.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">USDOT Registration Process</h2>
        <p>
          The registration process involves submitting detailed information about your business, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Business name and address</li>
          <li>Type of operation (common, contract, private, etc.)</li>
          <li>Number of vehicles and drivers</li>
          <li>Safety management information</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">How Consulics Can Help</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Application assistance</strong>: We guide you through the entire USDOT registration process.</li>
          <li><strong>Document preparation</strong>: Help gather and prepare all required documentation.</li>
          <li><strong>Compliance monitoring</strong>: Ensure ongoing compliance with federal requirements.</li>
          <li><strong>Updates and renewals</strong>: Assist with any changes or renewals needed.</li>
        </ul>

        <div className="mt-10 p-6 bg-primary-50 rounded-2xl">
          <p className="text-lg font-semibold text-gray-900 mb-3">Ready to get your USDOT number?</p>
          <Link href="/contact" className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}