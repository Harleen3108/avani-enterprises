import React from 'react';
import DH2ProjectTemplate from '../../components/dummyhome2/DH2ProjectTemplate';

const DH2FrdNutritionProject = () => {
  return (
    <DH2ProjectTemplate
      title="Frd Nutrition"
      logo="/frd-nutrition-new.png"
      videoSrc="/FrdNutrition.mp4"
      posterSrc="/frd-nutrition-new.png"
      subtitle="A comprehensive nutrition and wellness platform designed to promote healthy living and dietary awareness"
      overviewText={[
        "Frd Nutrition is a comprehensive digital platform dedicated to nutrition and wellness. The website provides valuable information about nutritional products, dietary plans, and health-related services to help users make informed decisions about their health and wellness journey.",
        "The platform features professional service listings with detailed descriptions of nutritional products and services. It includes dedicated sections to display company offerings, making it easy for users to explore and understand the available solutions.",
        "Built with modern web technologies, the website offers optimized layout for branding and business presentation, creating a professional and trustworthy digital presence in the health and nutrition industry."
      ]}
      overviewImage="/frd-nutrition-new.png"
      features={[
        "<strong>Professional service listing</strong> with detailed descriptions of nutritional products and services",
        "<strong>Dedicated sections</strong> to display company offerings and product information",
        "<strong>Easy navigation</strong> for users to explore services and products quickly",
        "<strong>Contact and inquiry sections</strong> for lead generation and customer engagement",
        "<strong>Optimized layout</strong> for branding and business presentation"
      ]}
    />
  );
};

export default DH2FrdNutritionProject;
