import React from 'react';
import DH2ProjectTemplate from '../../components/dummyhome2/DH2ProjectTemplate';

const DH2HiTechHomesProject = () => {
  return (
    <DH2ProjectTemplate
      title="Hi-tech Homes"
      logo="/hitech.jpeg"
      videoSrc="/hitech.mp4"
      posterSrc="/hitech.jpeg"
      subtitle="A professional property management portal designed to centralize real estate operations and showcase properties"
      overviewText={[
        "Hi-tech Property is a professional, full-service property management portal designed to centralize real estate operations. The platform features an extensive listing module for showcasing available properties with high-quality media, making it easy for potential buyers and renters to explore options.",
        "The system includes robust lead capture tools to streamline client inquiries and follow-ups effectively. Dedicated admin tools are provided to ensure efficient management of all listings, client data, and operational workflows.",
        "Built with modern web technologies, the platform offers an optimized layout for branding and business presentation, creating a professional and trustworthy digital presence in the real estate industry."
      ]}
      overviewImage="/hitech1.png"
      features={[
        "<strong>Extensive property listings</strong> with high-quality media and detailed descriptions",
        "<strong>Robust lead capture tools</strong> to streamline client inquiries and follow-ups",
        "<strong>Dedicated admin tools</strong> for efficient management of listings and client data",
        "<strong>Easy navigation</strong> for users to explore properties and services",
        "<strong>Contact and inquiry sections</strong> for lead generation and customer engagement"
      ]}
    />
  );
};

export default DH2HiTechHomesProject;
