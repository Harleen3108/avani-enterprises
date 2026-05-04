import React from 'react';
import DH2ProjectTemplate from '../../components/dummyhome2/DH2ProjectTemplate';

const DH2RohtakShoeProject = () => {
  return (
    <DH2ProjectTemplate
      title="Rohtak Shoe co."
      logo="/shoes.jpeg"
      videoSrc="/Rohtak Shoe.mp4"
      posterSrc="/shoes.jpeg"
      subtitle="A feature-rich footwear e-commerce platform optimized for a modern shopping experience"
      overviewText={[
        "Rohtak Shoe co. is a feature-rich footwear e-commerce platform optimized for a modern shopping experience. Key functionalities include stunning 3D product previews and a smooth, secure cart-to-checkout process, making online shoe shopping intuitive and enjoyable.",
        "The system features smart inventory management and dedicated admin/delivery dashboards. It allows for advanced features like order rescheduling, refund tracking, and analytics-driven business insights, ensuring efficient operations and excellent customer service.",
        "Built with modern web technologies, the platform offers optimized layout for branding and business presentation, creating a professional and trustworthy digital presence in the e-commerce footwear industry."
      ]}
      overviewImage="/shoes1.png"
      features={[
        "<strong>3D product previews</strong> for enhanced shopping experience",
        "<strong>Smooth, secure cart-to-checkout</strong> process with payment integration",
        "<strong>Smart inventory management</strong> for efficient stock control",
        "<strong>Admin and delivery dashboards</strong> for comprehensive order management",
        "<strong>Order rescheduling and refund tracking</strong> for customer convenience"
      ]}
    />
  );
};

export default DH2RohtakShoeProject;
