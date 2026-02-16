// src/components/PolicyPage.jsx

import React from 'react';

const PolicyPage = () => {
  // --- Configuration Variables (REPLACE THESE BOLD VALUES) ---
  const EFFECTIVE_DATE = "December 2, 2025";
  const COMPANY_NAME = "Avani Enterprises"; 
  const CONTACT_EMAIL = "kp@avanienterprises.in"; // REPLACE THIS
  const WEBSITE_URL = "https://avani-enterprises.vercel.app/"; 
  const JURISDICTION = "Gurgaon, India"; // REPLACE THIS (Your State/Country)

  // --- Helper Component for Sections ---
  const PolicySection = ({ title, children, id }) => (
    <section id={id} className="mb-12 py-8 border-b border-gray-200 last:border-b-0">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-4">
        {title}
      </h2>
      <div className="prose prose-indigo max-w-none text-gray-700">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header with Image Background */}
      <header className="relative py-20 bg-gradient-to-r from-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Actual Image Background */}
        <img 
            src="https://images.unsplash.com/photo-1547658718-1c4c1a5332f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Abstract data security background" 
            className="absolute inset-0 w-full h-full object-cover opacity-20" 
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Our Policies
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Privacy & Terms for {COMPANY_NAME}
          </p>
          <p className="text-sm mt-4 opacity-70">
            Last Updated: {EFFECTIVE_DATE}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-12">
        {/* Legal Disclaimer / Important Notice */}
        

        {/* =======================================
           I. PRIVACY POLICY
        ======================================== */}
        <PolicySection title="I. Privacy Policy" id="privacy-policy">
          <p className="text-lg mb-4">
            Welcome to {COMPANY_NAME}. We respect your privacy and are committed to protecting your personal data. This Privacy Policy informs you how we look after your personal data when you visit our website and tells you about your privacy rights.
          </p>

          <h3 className="text-2xl font-semibold text-indigo-700 mt-8 mb-3">Data We Collect</h3>
          {/* Image related to data collection/privacy */}
          <div className="flex justify-center">
            <img 
                src="./cs.webp"
                alt="Secure data lock conceptual image" 
                className="my-6 rounded-lg shadow-md w-full max-w-md h-40 object-cover" 
            />
          </div>
          <p className="mb-4">
            We collect data primarily through contact forms and website analytics (like Google Analytics):
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <span className="font-medium text-gray-800">Identity & Contact Data:</span> Name, email address, and phone numbers (collected via contact forms).
            </li>
            <li>
              <span className="font-medium text-gray-800">Technical & Usage Data:</span> IP address, browser type, and usage patterns (collected via website analytics).
            </li>
            
          </ul>

          <h3 className="text-2xl font-semibold text-indigo-700 mt-8 mb-3">Sharing Your Personal Data (Third Parties)</h3>
          {/* Image related to data sharing/partnerships */}
          <div className="flex justify-center">
            <img 
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Technical collaboration and network" 
                className="my-6 rounded-lg shadow-md w-full max-w-md h-40 object-cover" 
            />
          </div>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><b>Service Providers:</b> Hosting, IT, and maintenance services.</li>
            <li><b>Analytics Providers:</b> Google Analytics.</li>
          </ul>
        </PolicySection>

        {/* =======================================
           II. TERMS AND CONDITIONS OF USE
        ======================================== */}
        <PolicySection title="II. Terms and Conditions of Use" id="terms-of-use">
          <p className="text-lg mb-4">
            These Terms and Conditions of Use ("Terms") constitute a legally binding agreement between you and {COMPANY_NAME} concerning your access to and use of the {WEBSITE_URL} website (the "Site"). By accessing the Site, you agree to be bound by these Terms.
          </p>

          <h3 className="text-2xl font-semibold text-indigo-700 mt-8 mb-3">Intellectual Property Rights</h3>
          {/* Image related to intellectual property/copyright */}
          <div className="flex justify-center">
            <img 
            src="./cp.jpeg"
                alt="Copyright and documentation" 
                className="my-6 rounded-lg shadow-md w-full max-w-md h-40 object-cover" 
            />
          </div>
          <p className="mb-4">
            All content, including designs, text, and code, is owned or controlled by us and protected by copyright and trademark laws.
          </p>

          <h3 className="2xl font-semibold text-indigo-700 mt-8 mb-3">Governing Law</h3>
          <p className="mb-4">
            These Terms shall be governed by and defined by the laws of <strong className="font-semibold text-red-600">{JURISDICTION}</strong>.
          </p>
        </PolicySection>

        {/* =======================================
           III. CONTACT INFORMATION
        ======================================== */}
        <PolicySection title="III. Contact Us" id="contact-info">
          <p className="mb-4">
            For any questions regarding these policies, please contact us at:
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">{CONTACT_EMAIL}</a>
          </p>
        </PolicySection>
      </main>

      {/* Footer (Optional, but good for consistency) */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PolicyPage;