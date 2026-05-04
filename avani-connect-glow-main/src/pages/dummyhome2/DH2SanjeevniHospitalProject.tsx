import React from 'react';
import DH2ProjectTemplate from '../../components/dummyhome2/DH2ProjectTemplate';

const DH2SanjeevniHospitalProject = () => {
  return (
    <DH2ProjectTemplate
      title="Sanjeevni Hospital"
      logo="/sanjeevni.jpeg"
      videoSrc="/Sanjeevni.mp4"
      posterSrc="/sanjeevni.jpeg"
      subtitle="A comprehensive web platform for healthcare services, specializing in patient care and medical facility management"
      overviewText={[
        "Sanjeevni Hospital website is a comprehensive web platform developed for advanced healthcare services. The system integrates an AI Chatbot for instant support and efficient appointment booking for patients, making healthcare more accessible and user-friendly.",
        "Key features include secure online OPD and test booking, fully integrated with a secure payment gateway. The platform provides a robust Admin analytics dashboard and patient portals for managing orders and accessing downloadable invoices, streamlining the entire healthcare experience.",
        "Built with modern web technologies, the platform offers optimized layout for branding and business presentation, creating a professional and trustworthy digital presence in the healthcare industry."
      ]}
      overviewImage="/sanjeevni1.png"
      features={[
        "<strong>AI Chatbot integration</strong> for instant support and efficient appointment booking",
        "<strong>Secure online OPD and test booking</strong> with integrated payment gateway",
        "<strong>Admin analytics dashboard</strong> for comprehensive data insights",
        "<strong>Patient portals</strong> for managing orders and accessing invoices",
        "<strong>Easy navigation</strong> for users to explore services and book appointments"
      ]}
    />
  );
};

export default DH2SanjeevniHospitalProject;
