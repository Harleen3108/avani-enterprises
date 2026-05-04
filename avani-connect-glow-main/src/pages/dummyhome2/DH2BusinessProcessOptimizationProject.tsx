import React from 'react';
import DH2ProjectTemplate from '../../components/dummyhome2/DH2ProjectTemplate';

const DH2BusinessProcessOptimizationProject = () => {
  return (
    <DH2ProjectTemplate
      title="Business Process Optimization Agent"
      logo="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=100&h=100&fit=crop"
      videoSrc=""
      posterSrc="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop"
      subtitle="An AI system that reads daily business work, understands patterns, identifies waste, and automates repeatable tasks"
      overviewText={[
        "Our Business Process Optimization Agent is an intelligent AI system that observes and analyzes your daily business operations — reading emails, support tickets, spreadsheets, and task management systems to understand what people are doing every day.",
        "The AI identifies patterns, spots inefficiencies, and recognizes tasks that are repeatable and rule-based. Once it understands these workflows, it automatically suggests or implements automation solutions to eliminate manual, time-consuming work.",
        "Think of it as having an AI assistant that constantly watches for waste in your operations and proactively fixes it — saving hours of manual effort every single day while reducing human error and ensuring consistent process execution."
      ]}
      overviewImage="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop"
      features={[
        "<strong>Email Analysis & Auto-Response:</strong> AI reads incoming emails, categorizes them, drafts responses, and handles routine inquiries automatically",
        "<strong>Support Ticket Automation:</strong> Automatically triage, categorize, and route support tickets; provide instant responses to common issues",
        "<strong>Spreadsheet Data Processing:</strong> AI monitors spreadsheets for updates, performs calculations, generates reports, and syncs data across systems",
        "<strong>Workflow Pattern Recognition:</strong> Identifies recurring task patterns and suggests automation rules based on observed behavior",
        "<strong>Task Scheduling & Reminders:</strong> Automatically schedules follow-ups, sends reminders, and ensures nothing falls through the cracks",
        "<strong>Document Generation:</strong> Auto-generate reports, invoices, proposals, and other documents based on templates and data",
        "<strong>Cross-Platform Integration:</strong> Connects with Gmail, Outlook, Slack, Google Sheets, Excel, Notion, Trello, and other business tools",
        "<strong>Performance Analytics:</strong> Dashboard showing time saved, tasks automated, and ROI metrics to measure the impact"
      ]}
    />
  );
};

export default DH2BusinessProcessOptimizationProject;
