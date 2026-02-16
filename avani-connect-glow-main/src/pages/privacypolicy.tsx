import React from "react";

function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", width: "100%", color: "black" }}>
      <div
        style={{
          padding: "40px 20px",
          maxWidth: "900px",
          margin: "0 auto",
          paddingTop: "120px", // added extra top padding to account for navbar overlap or spacing
          fontSize: "18px",
          lineHeight: "1.7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            fontWeight: 700,
            fontSize: "32px",
          }}
        >
          Privacy Policy
        </h1>

        <p>
          At <strong>Avani Enterprises</strong>, we value your privacy and are
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and safeguard your data when you use our
          website and services.
        </p>

        {/* Section 1 */}
        <h2 style={{ marginTop: "30px", fontSize: "24px", fontWeight: "700" }}>
          1. Information We Collect
        </h2>
        <ul style={{ fontSize: "18px", fontWeight: "600" }}>
          <li>Name, phone number, and email address</li>
          <li>Business details and project requirements</li>
          <li>Billing and communication details</li>
          <li>Login information (if applicable)</li>
          <li>Website usage data and analytics</li>
        </ul>

        {/* Section 2 */}
        <h2 style={{ marginTop: "30px", fontSize: "24px", fontWeight: "700" }}>
          2. How We Use Your Information
        </h2>
        <ul style={{ fontSize: "18px", fontWeight: "600" }}>
          <li>To provide services like website dev, app dev, SEO, digital marketing</li>
          <li>To communicate regarding projects and support</li>
          <li>To improve our services and user experience</li>
          <li>To maintain internal business records</li>
        </ul>

        {/* Section 3 */}
        <h2 style={{ marginTop: "30px", fontSize: "24px", fontWeight: "700" }}>
          3. Data Protection
        </h2>
        <p style={{ fontSize: "18px" }}>
          We use appropriate security measures to protect your personal information
          from unauthorized access, misuse, or disclosure.
        </p>

        {/* Section 4 */}
        <h2 style={{ marginTop: "30px", fontSize: "24px", fontWeight: "700" }}>
          4. Payment Security
        </h2>
        <p style={{ fontSize: "18px" }}>
          Payments are processed using secure third-party gateways. We do not store
          card or banking details.
        </p>

        {/* Section 5 */}
        <h2 style={{ marginTop: "30px", fontSize: "24px", fontWeight: "700" }}>
          5. Third-Party Services
        </h2>
        <p style={{ fontSize: "18px" }}>
          We may use services like analytics, hosting, marketing tools, and payment
          processors for smooth operations.
        </p>

        {/* Section 6 */}
        <h2 style={{ marginTop: "30px", fontSize: "24px", fontWeight: "700" }}>
          6. Policy Updates
        </h2>
        <p style={{ fontSize: "18px" }}>
          Avani Enterprises may update this Privacy Policy at any time. Updates will
          be effective immediately on our website.
        </p>

        {/* Section 7 */}
        <h2 style={{ marginTop: "30px", fontSize: "24px", fontWeight: "700" }}>
          7. Contact Information
        </h2>
        <p style={{ fontSize: "18px" }}>
          <strong>Email:</strong> kp@avanienterprises.in <br />
          <strong>Phone:</strong> +91 9253625099
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
export { PrivacyPolicy };
