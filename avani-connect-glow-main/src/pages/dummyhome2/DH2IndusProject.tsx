import React from 'react';
import DH2ProjectTemplate from '../../components/dummyhome2/DH2ProjectTemplate';

const DH2IndusProject = () => {
  return (
    <DH2ProjectTemplate
      title="Indus group of Institution"
      logo="/indus.jpeg"
      videoSrc="/indus.mp4"
      posterSrc="/indus.jpeg"
      subtitle="A comprehensive educational management system designed to modernize institutional operations and enhance learning experiences"
      overviewText={[
        "Indus group of Institution is a comprehensive School Management (ERP) system designed to modernize educational operations. The platform automates core tasks including digital attendance tracking, seamless timetable generation, and secure online fee management.",
        "The system features dedicated, role-based access for Admin, Teacher, and Parent users, ensuring secure and organized access to relevant information. This setup allows for real-time data analytics to significantly boost institutional efficiency and stakeholder communication.",
        "Built with modern web technologies, the platform offers a seamless user experience that streamlines administrative tasks and enhances communication between all stakeholders in the educational ecosystem."
      ]}
      overviewImage="/indus1.png"
      features={[
        "<strong>Digital attendance tracking</strong> for accurate and efficient student monitoring",
        "<strong>Seamless timetable generation</strong> and management for optimal scheduling",
        "<strong>Secure online fee management</strong> with integrated payment processing",
        "<strong>Role-based access</strong> for Admin, Teacher, and Parent users",
        "<strong>Real-time data analytics</strong> to boost institutional efficiency"
      ]}
    />
  );
};

export default DH2IndusProject;
