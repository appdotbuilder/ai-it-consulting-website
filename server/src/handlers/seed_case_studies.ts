import { db } from '../db';
import { caseStudiesTable } from '../db/schema';
import { type CaseStudy } from '../schema';

const caseStudiesData = [
  {
    title: 'Retail ERP Optimization - Reduced Inventory Costs by 28%',
    slug: 'retail-erp-optimization',
    client_name: 'RetailMax Corp',
    industry: 'Retail',
    problem_description: 'A mid-sized retail chain struggled with overstocking and slow manual ERP processes, leading to significant financial losses and operational inefficiencies.',
    solution_description: 'We designed and implemented an AI-driven demand forecasting system, seamlessly integrating it with their existing ERP. The solution leveraged machine learning algorithms to analyze historical sales data, seasonal trends, and external factors for precise demand prediction.',
    results_description: 'Achieved a 28% reduction in inventory holding costs, improved stock turnover speed by 35%, and increased overall supply chain efficiency by 20% in the first year. This led to significant savings and better product availability.',
    image_url: null,
    technologies_used: ['Python', 'TensorFlow', 'AWS', 'PostgreSQL', 'ERP Integration'],
    is_featured: true
  },
  {
    title: 'Banking Fraud Detection - 40% Faster Transaction Monitoring',
    slug: 'banking-fraud-detection',
    client_name: 'SecureBank Holdings',
    industry: 'Finance',
    problem_description: 'A regional bank faced increasing incidents of financial fraud and delays in detecting suspicious transactions, resulting in customer mistrust and regulatory risks.',
    solution_description: 'Our team deployed an advanced AI pipeline featuring real-time anomaly detection and transaction scoring. This system continuously monitors transactions for unusual patterns, flags potential fraud instantly, and reduces the workload on manual review teams.',
    results_description: 'Reduced fraud detection time by 40%, lowered false positives by 22%, and significantly enhanced the security posture of the bank, leading to greater customer confidence.',
    image_url: null,
    technologies_used: ['Python', 'scikit-learn', 'Kafka', 'Apache Flink', 'Fraud Analytics Platform'],
    is_featured: true
  },
  {
    title: 'Healthcare Claims Automation - 60% Reduction in Processing Time',
    slug: 'healthcare-claims-automation',
    client_name: 'MediCare Insurance',
    industry: 'Healthcare',
    problem_description: 'An insurance provider was overwhelmed by a growing backlog of claims, leading to prolonged processing times, increased operational costs, and declining customer satisfaction.',
    solution_description: 'We developed an AI-powered claims triage and automation system that intelligently routes claims, extracts key information using NLP, and automates approvals for eligible cases. This solution was seamlessly integrated with their CRM system to provide a unified view of customer interactions.',
    results_description: 'Achieved a remarkable 60% reduction in claims processing time, leading to a 25% improvement in customer satisfaction scores and a 15% decrease in manual administrative tasks.',
    image_url: null,
    technologies_used: ['NLP', 'Machine Learning', 'CRM Integration', 'Python', 'AWS Textract', 'MongoDB'],
    is_featured: false
  },
  {
    title: 'Manufacturing Predictive Maintenance - Saved $500K Annually in Downtime',
    slug: 'manufacturing-predictive-maintenance',
    client_name: 'GlobalFab Solutions',
    industry: 'Manufacturing',
    problem_description: 'A large manufacturing firm experienced frequent unexpected equipment failures, resulting in costly production downtime, emergency repairs, and disruptions to their supply chain.',
    solution_description: 'We implemented a comprehensive predictive maintenance solution by deploying IoT sensors on critical machinery. Advanced machine learning models, supported by RAG pipelines for contextual data retrieval, analyzed real-time sensor data to predict potential failures before they occurred.',
    results_description: 'Reduced unplanned downtime incidents by 45%, resulting in annual savings of over $500K. The system also increased equipment lifespan by 10% and improved overall operational reliability.',
    image_url: null,
    technologies_used: ['IoT Sensors', 'Machine Learning', 'RAG Pipelines', 'Apache Kafka', 'Azure IoT Hub'],
    is_featured: true
  },
  {
    title: 'B2B SaaS Lead Scoring - 3x Increase in Qualified Leads',
    slug: 'b2b-saas-lead-scoring',
    client_name: 'GrowthEngine SaaS',
    industry: 'Software as a Service (SaaS)',
    problem_description: 'A B2B SaaS vendor was spending significant sales resources on unqualified leads, leading to low conversion rates and inefficient sales cycles.',
    solution_description: 'We developed and integrated an AI-driven lead scoring model into their CRM system. This model analyzes various data points (firmographics, engagement history, website behavior) to assign a qualification score to each lead, prioritizing high-potential prospects.',
    results_description: 'Achieved a 3x increase in the volume of qualified leads, improved the sales conversion rate by 18%, and significantly optimized the sales team\'s efficiency, leading to higher revenue generation.',
    image_url: null,
    technologies_used: ['Machine Learning', 'CRM Integration', 'Salesforce API', 'Python', 'Feature Engineering'],
    is_featured: false
  },
  {
    title: 'Insurance Underwriting Automation - 30% Faster Policy Issuance',
    slug: 'insurance-underwriting-automation',
    client_name: 'PolicyPro Inc.',
    industry: 'Insurance',
    problem_description: 'PolicyPro Inc. faced significant delays in policy issuance due to manual, labor-intensive underwriting processes, increasing operational costs and impacting customer satisfaction.',
    solution_description: 'We implemented an AI-driven underwriting automation system. This solution utilized Natural Language Processing (NLP) to rapidly analyze policy documents and machine learning models for accurate risk assessment. It was seamlessly integrated with their existing policy management system.',
    results_description: 'Accelerated policy issuance by 30%, reduced human error in risk assessment by 15%, and significantly lowered operational costs. This allowed for faster customer onboarding and improved policyholder experience.',
    image_url: null,
    technologies_used: ['Natural Language Processing (NLP)', 'Machine Learning', 'Python', 'AWS SageMaker', 'PostgreSQL', 'Policy Management System Integration'],
    is_featured: true
  },
  {
    title: 'Call Center AI Assistant - Improved Customer Satisfaction by 20%',
    slug: 'call-center-ai-assistant',
    client_name: 'ConnectCall Services',
    industry: 'Customer Service',
    problem_description: 'ConnectCall Services struggled with long average handle times (AHT) and inconsistent agent performance, leading to lower customer satisfaction and high agent burnout.',
    solution_description: 'We developed and deployed an AI assistant designed to provide real-time support to call center agents. This assistant leverages Large Language Models (LLMs) for intelligent script suggestions, provides instant access to knowledge bases, and performs automated post-call summarization. It was integrated with their CRM and call routing systems.',
    results_description: 'Decreased average handle time by 18%, improved first call resolution by 15%, and boosted customer satisfaction scores by 20%. Agent efficiency and morale also saw a noticeable increase.',
    image_url: null,
    technologies_used: ['Large Language Models (LLMs)', 'Natural Language Processing (NLP)', 'CRM Integration', 'Python', 'Google Cloud AI Platform', 'Real-time Analytics'],
    is_featured: true
  }
];

export const seedCaseStudies = async (): Promise<{ message: string; count: number }> => {
  try {
    // Delete existing case studies
    await db.delete(caseStudiesTable).execute();
    
    // Insert new case studies
    const results = await db.insert(caseStudiesTable)
      .values(caseStudiesData)
      .returning()
      .execute();
    
    return {
      message: 'Case studies seeded successfully',
      count: results.length
    };
  } catch (error) {
    console.error('Error seeding case studies:', error);
    throw error;
  }
};