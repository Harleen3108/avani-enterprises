import React from 'react';
import DH2ProjectTemplate from '../../components/dummyhome2/DH2ProjectTemplate';

const DH2LeadManagementProject = () => {
  return (
    <DH2ProjectTemplate
      title="Lead Management Automation"
      logo="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
      videoSrc="" // The original used an image with stats overlay, but DH2Template expects a video. We'll pass empty string or just the image. The DH2 template uses videoSrc for the media. I'll pass a dummy or keep it empty, but let's see if we can just pass an image as poster.
      posterSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
      subtitle="Intelligent AI-powered system that automates lead capture, scoring, nurturing, and distribution to maximize conversion rates"
      overviewText={[
        "Our Lead Management Automation system is an intelligent AI-powered solution designed to revolutionize how businesses handle their sales pipeline. The system automatically captures leads from multiple sources including websites, social media, email campaigns, and landing pages.",
        "Using advanced machine learning algorithms, the platform scores each lead based on engagement behavior, demographic data, and interaction patterns. This ensures your sales team focuses on the most promising opportunities first, dramatically improving conversion rates.",
        "The system features intelligent lead distribution, automated follow-up sequences, real-time notifications, and comprehensive analytics dashboards. It integrates seamlessly with popular CRM systems and provides actionable insights to optimize your sales process continuously."
      ]}
      overviewImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
      features={[
        "<strong>Multi-Channel Lead Capture:</strong> Automatically collect leads from websites, landing pages, social media, email campaigns, and third-party platforms",
        "<strong>AI Lead Scoring:</strong> Machine learning algorithms analyze behavior, demographics, and engagement to prioritize high-value leads",
        "<strong>Intelligent Distribution:</strong> Automatically assign leads to the right sales rep based on territory, expertise, and workload",
        "<strong>Automated Nurturing:</strong> Personalized email and SMS sequences triggered by lead behavior and engagement",
        "<strong>Real-Time Notifications:</strong> Instant alerts to sales team when high-priority leads take action",
        "<strong>CRM Integration:</strong> Seamless sync with Salesforce, HubSpot, Zoho, and other popular CRM platforms",
        "<strong>Analytics Dashboard:</strong> Comprehensive reporting on lead sources, conversion rates, and sales team performance",
        "<strong>Lead Deduplication:</strong> Automatically identify and merge duplicate leads to maintain clean data"
      ]}
    />
  );
};

export default DH2LeadManagementProject;
