import React from 'react';
import DH2ProjectTemplate from '../../components/dummyhome2/DH2ProjectTemplate';

const DH2PolicicueProject = () => {
  return (
    <DH2ProjectTemplate
      title="Policicue Project"
      logo="/policucue.jpeg"
      videoSrc="/policicue.mp4"
      posterSrc="/policucue.jpeg"
      subtitle="A corporate policy and service showcasing website for insurance services, designed to present company offerings and policies professionally"
      overviewText={[
        "Policicue is a corporate policy and service showcasing website designed specifically for insurance services. The platform serves as a comprehensive digital presence that effectively presents company offerings, policies, and services to potential clients and stakeholders.",
        "As an insurance website, Policicue features professional service listings with detailed descriptions, making it easy for users to understand the various insurance products and policies available. The website includes dedicated sections to display company offerings and policies, ensuring clear communication of services and terms.",
        "The website also features an \"About Us\" section that provides visitors with comprehensive information about the company, its mission, values, and expertise in the insurance industry. Built with modern web technologies, the platform offers optimized layout for branding and business presentation, creating a professional and trustworthy digital presence."
      ]}
      overviewImage="/policy1.png"
      features={[
        "<strong>Professional service listing</strong> with detailed descriptions of insurance products and services",
        "<strong>Dedicated sections</strong> to display company offerings and policies clearly and comprehensively",
        "<strong>Easy navigation</strong> for users to explore services and find relevant information quickly",
        "<strong>Contact and inquiry sections</strong> for lead generation and customer engagement",
        "<strong>Optimized layout</strong> for branding and business presentation, creating a professional digital presence"
      ]}
    />
  );
};

export default DH2PolicicueProject;
