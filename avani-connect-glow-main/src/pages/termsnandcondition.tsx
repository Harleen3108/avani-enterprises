import React from "react";

function TermsAndConditions() {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", width: "100%", color: "black" }}>
      <div
        style={{
          padding: "40px 20px",
          maxWidth: "900px",
          margin: "0 auto",
          paddingTop: "120px", // added extra top padding to account for navbar overlap or spacing
          fontSize: "18px", // bigger global font
          lineHeight: "1.7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            fontWeight: 800,
            fontSize: "32px",
          }}
        >
          Terms & Conditions
        </h1>

        <p>
          By accessing or using the services provided by{" "}
          <strong>Avani Enterprises</strong>, you agree to the following terms and
          conditions. Please read them carefully before engaging with our website
          or services.
        </p>

        {/* 1. Service Information */}
        <h2
          style={{
            marginTop: "35px",
            fontWeight: 700,
            fontSize: "24px",
          }}
        >
          1. Service Information
        </h2>
        <p>
          Avani Enterprises offers services such as website development, app
          development, SEO, digital marketing, branding, and related business
          solutions. All services are provided based on the requirements shared by
          the client.
        </p>

        {/* 2. Orders & Payments */}
        <h2 style={{ marginTop: "35px", fontWeight: 700, fontSize: "24px" }}>
          2. Orders & Payments
        </h2>
        <p>
          All projects must be booked with advance payment as mutually agreed. We
          reserve the right to accept, reject, or cancel any service request at our
          discretion.
        </p>

        {/* 3. Project Timelines */}
        <h2 style={{ marginTop: "35px", fontWeight: 700, fontSize: "24px" }}>
          3. Project Timelines
        </h2>
        <p>
          All timelines provided for project completion are estimated and may vary
          depending on revisions, client response delays, technical updates, or
          external factors.
        </p>

        {/* 4. Refund & Cancellation */}
        <h2 style={{ marginTop: "35px", fontWeight: 700, fontSize: "24px" }}>
          4. Refund & Cancellation
        </h2>
        <p>
          Payments made for services are non-refundable. Cancellations are allowed
          only before the project work begins. Once work has started, no refund
          requests will be accepted.
        </p>

        {/* 5. Client Responsibility */}
        <h2 style={{ marginTop: "35px", fontWeight: 700, fontSize: "24px" }}>
          5. Client Responsibility
        </h2>
        <p>
          Clients are responsible for providing accurate project details, content,
          and brand-related information. Avani Enterprises is not liable for any
          issues arising from incorrect or incomplete information shared by the
          client.
        </p>

        {/* 6. Intellectual Property */}
        <h2 style={{ marginTop: "35px", fontWeight: 700, fontSize: "24px" }}>
          6. Intellectual Property
        </h2>
        <p>
          All website designs, graphics, code, and content created by Avani
          Enterprises belong to us unless fully paid for by the client.
          Unauthorized use, copying, or resale of our work is prohibited.
        </p>

        {/* 7. Limitation of Liability */}
        <h2 style={{ marginTop: "35px", fontWeight: 700, fontSize: "24px" }}>
          7. Limitation of Liability
        </h2>
        <p>
          Avani Enterprises shall not be held liable for any indirect, incidental,
          or consequential damages arising from the use of our services, websites,
          applications, or digital platforms.
        </p>

        {/* 8. Changes to Terms */}
        <h2 style={{ marginTop: "35px", fontWeight: 700, fontSize: "24px" }}>
          8. Changes to Terms
        </h2>
        <p>
          These terms may be updated at any time without prior notice. Continued use
          of our website or services indicates acceptance of the updated terms.
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
export { TermsAndConditions };
