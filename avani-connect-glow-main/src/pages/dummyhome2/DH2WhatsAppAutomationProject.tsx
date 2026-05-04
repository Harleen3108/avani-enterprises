import React from 'react';
import DH2ProjectTemplate from '../../components/dummyhome2/DH2ProjectTemplate';

const DH2WhatsAppAutomationProject = () => {
  return (
    <DH2ProjectTemplate
      title="WhatsApp Text Automation"
      logo="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=100&h=100&fit=crop"
      videoSrc=""
      posterSrc="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&fit=crop"
      subtitle="WhatsApp Business API integration for automated customer support, marketing campaigns, and instant notifications"
      overviewText={[
        "Our WhatsApp Text Automation solution leverages the official WhatsApp Business API to enable businesses to communicate with customers at scale. The platform automates customer support, marketing campaigns, order notifications, and appointment reminders through the world's most popular messaging app.",
        "With over 2 billion active users worldwide, WhatsApp offers unparalleled reach and engagement rates. Our automation system allows you to send personalized messages, handle customer queries with AI-powered chatbots, and manage unlimited conversations efficiently from a single dashboard.",
        "The platform features intelligent message routing, automated responses based on keywords, rich media support (images, videos, documents), broadcast campaigns, and comprehensive analytics. It integrates seamlessly with your existing CRM and business systems."
      ]}
      overviewImage="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&fit=crop"
      features={[
        "<strong>WhatsApp Business API Integration:</strong> Official API access for reliable, scalable messaging",
        "<strong>AI-Powered Chatbot:</strong> Intelligent bot handles customer queries, FAQs, and support tickets automatically",
        "<strong>Broadcast Campaigns:</strong> Send promotional messages, updates, and announcements to unlimited contacts",
        "<strong>Automated Notifications:</strong> Order confirmations, shipping updates, appointment reminders, and payment alerts",
        "<strong>Rich Media Support:</strong> Send images, videos, documents, location, and interactive buttons",
        "<strong>Contact Management:</strong> Organize contacts with tags, segments, and custom fields",
        "<strong>Multi-Agent Dashboard:</strong> Team inbox for managing customer conversations efficiently",
        "<strong>Analytics & Reporting:</strong> Track message delivery, open rates, response times, and campaign performance",
        "<strong>CRM Integration:</strong> Sync with Salesforce, HubSpot, Zoho, and custom systems",
        "<strong>Template Management:</strong> Create and manage pre-approved message templates for compliance"
      ]}
    />
  );
};

export default DH2WhatsAppAutomationProject;
