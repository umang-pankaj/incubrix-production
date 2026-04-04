import React from 'react';
import { Shield, Lock, FileText, Globe, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Privacy() {
  const lastUpdated = "24 March 2026";

  const sections = [
    {
      id: "scope",
      title: "1. Scope and Applicability",
      content: (
        <>
          <p className="mb-4">This Privacy Policy applies to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
            <li>All users of the IncuBrix Platform worldwide</li>
            <li>Access via web applications, mobile applications, APIs, integrations, and enterprise deployments</li>
            <li>Free, paid, trial, and enterprise users</li>
          </ul>
          <p className="mt-4 text-gray-400 italic">This Policy does not apply to third-party websites or services linked from the Platform.</p>
        </>
      )
    },
    {
      id: "role",
      title: "2. Our Role",
      content: (
        <div className="space-y-4">
          <p>
            IncuBrix acts as a data controller for personal data relating to account creation, billing, support, platform administration, security, analytics, and marketing.
          </p>
          <p>
            Where IncuBrix processes customer content or personal data on behalf of a business customer under its instructions, IncuBrix acts as a data processor or service provider, as applicable.
          </p>
        </div>
      )
    },
    {
      id: "collection",
      title: "3. Information We Collect",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-cyan-400 mb-2">3.1 Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Account information (name, email address, company name, contact details)</li>
              <li>Profile information and user preferences</li>
              <li>Content you create, upload, submit, or process using the Platform</li>
              <li>Payment and billing information</li>
              <li>Communications with IncuBrix (support requests, emails, feedback)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-cyan-400 mb-2">3.2 Automatically Collected Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Device and technical information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, features used, timestamps, session duration)</li>
              <li>Log files, diagnostic data, and error reports</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-cyan-400 mb-2">3.3 Information from Third Parties</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Authentication providers (e.g., SSO services)</li>
              <li>Payment processors (transaction confirmations only)</li>
              <li>Analytics and infrastructure providers</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "usage",
      title: "4. How We Use Your Information",
      content: (
        <>
          <p className="mb-4">User data is used solely to provide, operate, and improve core platform functionality. Specifically, we use personal information to:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Provide, operate, maintain, and improve the Platform</li>
              <li>Create and manage user accounts and subscriptions</li>
              <li>Process payments and confirm transactions</li>
              <li>Send administrative notices, updates, and security alerts</li>
              <li>Respond to inquiries and provide customer support</li>
            </ul>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Monitor usage, analyze trends, and improve performance</li>
              <li>Develop new features, products, and services</li>
              <li>Detect, prevent, and address fraud, abuse, or security issues</li>
              <li>Comply with legal obligations and enforce our agreements</li>
            </ul>
          </div>
        </>
      )
    },
    {
      id: "legal-basis",
      title: "5. Legal Basis for Processing (GDPR & UK GDPR)",
      content: (
        <>
          <p className="mb-4">If you are located in the EU, EEA, or UK, we process personal data based on one or more of the following lawful bases:</p>
          <ul className="space-y-3">
            {[
              { label: "Contractual Necessity", desc: "to provide the Services you request" },
              { label: "Consent", desc: "where you have provided explicit permission" },
              { label: "Legitimate Interests", desc: "to operate, secure, and improve our Platform" },
              { label: "Legal Obligations", desc: "to comply with applicable laws" }
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-400 font-semibold whitespace-nowrap">{item.label} –</span>
                <span className="text-gray-300">{item.desc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-gray-400">You may withdraw consent at any time without affecting prior lawful processing.</p>
        </>
      )
    },
    {
      id: "ai",
      title: "6. AI Features and Data Processing",
      content: (
        <div className="bg-[#151d45] border border-cyan-500/20 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              6.1 AI Training and Improvement
            </h3>
            <p className="text-gray-300 ml-4">
              IncuBrix may use aggregated and de-identified data to improve its Services, analytics, reliability, and AI-related functionality. IncuBrix does not claim ownership of user inputs or outputs. Where user content is used for model or product improvement, IncuBrix will describe that use clearly in the applicable product experience, contract, or settings. Enterprise customers may be offered additional controls under separate agreements.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              6.2 AI-Generated Content
            </h3>
            <p className="text-gray-300 ml-4">
              AI-generated outputs may not be unique, and similar content may be generated for other users. IncuBrix does not claim ownership of AI-generated content created by users.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              6.3 Third-Party AI Models
            </h3>
            <p className="text-gray-300 ml-4">
              Certain AI features rely on third-party AI model providers. When you submit prompts, inputs, or files, such data may be processed by these providers solely to generate outputs.
            </p>
            <div className="mt-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-sm text-cyan-200 ml-4 space-y-2">
              <strong>Important:</strong> Unless expressly permitted by a separate agreement or feature-specific notice, please do not submit sensitive personal data through AI prompts, uploads, or workflows, including government identifiers, financial account details, health information, biometric data, or data about children. You are responsible for ensuring that any personal data you submit is appropriate for your use of the Services and lawful to process.
            </div>
          </div>
        </div>
      )
    },
    {
      id: "sharing",
      title: "7. Data Sharing and Disclosure",
      content: (
        <>
          <p className="mb-4 font-semibold text-white text-lg">We do not sell personal data or use it for advertising purposes.</p>
          <p className="mb-4">We may share data only in the following circumstances:</p>
          <ul className="space-y-4">
            <li>
              <strong className="text-cyan-400 block mb-1">7.1 Service Providers</strong>
              <p className="text-gray-300">Trusted third-party service providers may support hosting, infrastructure, analytics, authentication, communications, payment processing, customer support, and AI-related functionality. These providers may process data on our behalf under contractual obligations designed to protect it.</p>
            </li>
            <li>
              <strong className="text-cyan-400 block mb-1">7.2 Business Transfers</strong>
              <span className="text-gray-300">In the event of a merger, acquisition, restructuring, or sale of assets, personal data may be transferred subject to appropriate safeguards.</span>
            </li>
            <li>
              <strong className="text-cyan-400 block mb-1">7.3 Legal and Safety Requirements</strong>
              <span className="text-gray-300">We may disclose information where required by law, legal process, or to protect the rights, safety, or property of IncuBrix, our users, or the public.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: "payments",
      title: "8. Payments",
      content: "Payments are processed by third-party payment processors. IncuBrix does not store full credit card numbers or sensitive payment credentials. We retain limited transaction records for accounting and compliance purposes."
    },
    {
      id: "retention",
      title: "9. Data Retention",
      content: (
        <div className="space-y-4">
          <p>
            We retain personal data for as long as reasonably necessary to provide the Services, maintain business and security records, comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
          <p>
            If you delete your account, we will delete or de-identify your personal data within a reasonable period, except where retention is required for legal, security, fraud prevention, accounting, or backup purposes. Some data may remain in secure backups for a limited additional period before deletion.
          </p>
        </div>
      )
    },
    {
      id: "rights",
      title: "10. Your Rights and Choices",
      content: (
        <>
          <p className="mb-4">Depending on your jurisdiction, you may have the right to:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {["Access your personal data", "Correct inaccurate or incomplete data", "Request deletion of personal data",
              "Restrict or object to processing", "Receive a portable copy of your data", "Opt out of marketing communications"].map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  {r}
                </div>
              ))}
          </div>
          <p className="text-gray-300">Requests can be made by contacting <a href="mailto:support@incubrix.com" className="text-cyan-400 hover:underline">support@incubrix.com</a>. We may verify your identity before responding and will comply within legally required timelines.</p>
        </>
      )
    },
    {
      id: "cookies",
      title: "11. Cookies and Tracking Technologies",
      content: "We use cookies and similar technologies to enable essential platform functionality, remember preferences, analyze usage, and provide personalized experiences (where permitted). You may control cookies through your browser settings, though disabling them may affect Platform functionality."
    },
    {
      id: "security",
      title: "12. Data Security",
      content: "We implement reasonable technical and organizational safeguards, including encryption in transit and at rest, access controls, and regular security reviews. However, no system is completely secure. You are responsible for safeguarding your account credentials. If a data breach affecting personal data occurs, we will investigate, take appropriate remediation steps, and provide notifications to affected individuals and relevant authorities where required by applicable law."
    },
    {
      id: "international",
      title: "13. International Data Transfers",
      content: "Your information may be processed in countries outside your country of residence. We ensure appropriate safeguards are in place in accordance with applicable data protection laws."
    },
    {
      id: "children",
      title: "14. Children’s Privacy",
      content: "The Platform is not intended for individuals under 18 years of age. We do not knowingly collect personal data from children. If such data is identified, it will be deleted promptly."
    },
    {
      id: "jurisdiction",
      title: "15. Jurisdiction-Specific Rights",
      content: (
        <div className="space-y-4">
          <div>
            <strong className="text-white block">15.1 Singapore (PDPA)</strong>
            <span className="text-gray-300">If you are a resident of Singapore, you have additional rights under the Personal Data Protection Act (PDPA), including the right to access and correct your personal data and to withdraw consent, subject to applicable legal exceptions.</span>
          </div>
          <div>
            <strong className="text-white block">15.2 European Union (GDPR)</strong>
            <span className="text-gray-300">If you are located in the EU or EEA, you have rights under the GDPR, including the right to access, rectify, erase, restrict, or object to processing, the right to data portability, and the right to lodge a complaint with a supervisory authority.</span>
          </div>
        </div>
      )
    },
    {
      id: "dpa",
      title: "16. Data Processing Addendum (DPA)",
      content: "For enterprise customers where IncuBrix acts as a data processor, a Data Processing Addendum will be provided upon request to ensure compliance with GDPR, PDPA, and other applicable regulations."
    },
    {
      id: "changes",
      title: "17. Changes to This Privacy Policy",
      content: "We may update this Privacy Policy from time to time. Material changes will be posted on the Platform with an updated “Last Updated” date. Continued use of the Platform constitutes acceptance of the revised Policy."
    },
    {
      id: "contact",
      title: "18. Contact Information",
      content: (
        <div className="bg-[#151d45] border border-white/10 rounded-xl p-6">
          <p className="text-gray-300 mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="text-white">Email: <a href="mailto:support@incubrix.com" className="text-cyan-400 hover:underline">support@incubrix.com</a></span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-white">Company Name: IncuBrix Pte. Ltd.</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-white">Registered Office: Singapore</span>
            </div>
          </div>
          <p className="mt-4 text-gray-400 text-sm">We will make reasonable efforts to respond to and resolve inquiries in a timely manner.</p>
        </div>
      )
    }
  ];

  const [activeSection, setActiveSection] = React.useState('introduction');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0, rootMargin: "-120px 0px -70% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    
    // Also observe introduction
    const intro = document.getElementById('introduction');
    if (intro) observer.observe(intro);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0a0e27] text-gray-200 min-h-screen font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <div className="relative border-b border-white/5 bg-[#050510]/50 backdrop-blur-3xl">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 py-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Shield className="w-3 h-3" /> Legal Documentation
          </div>
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">
            Last Updated: <span className="text-cyan-400">{lastUpdated}</span>
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section id="introduction" className="py-8 px-6 border-b border-white/5 bg-[#050510]/30 scroll-mt-32">
        <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
          <p className="mb-6">
            <strong className="text-white">IncuBrix Pte. Ltd. (“IncuBrix,” “we,” “our,” or “us”)</strong> is committed to protecting your privacy
            and handling personal data responsibly. This Privacy Policy explains how we collect, use, disclose,
            store, and protect personal information when you access or use our platform, websites, applications,
            APIs, and related services (collectively, the “Platform” or “Services”).
          </p>
          <p className="p-4 bg-cyan-900/10 border-l-4 border-cyan-500 text-gray-300 italic">
            By creating an account, accessing, or using the Platform, you acknowledge that you have read and
            understood this Privacy Policy and agree to the practices described herein. If you do not agree,
            please do not use the Platform.
          </p>
        </div>
      </section>

      {/* Content Area with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32">
              <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-6 pl-4 border-l-2 border-transparent">
                On this Page
              </div>
              <nav className="relative border-l-2 border-white/5 ml-[1px]">
                <div className="flex flex-col">
                  <button
                    onClick={() => scrollToSection('introduction')}
                    className={`relative py-2.5 pl-6 text-sm text-left transition-all hover:text-cyan-400 group ${activeSection === 'introduction'
                        ? 'text-cyan-400 font-medium'
                        : 'text-gray-500 hover:text-gray-300'
                      }`}
                  >
                    {activeSection === 'introduction' && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-[-2px] top-0 bottom-0 w-[3px] bg-cyan-400 shadow-[2px_0_8px_rgba(34,211,238,0.3)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span>Overview</span>
                  </button>
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`relative py-2.5 pl-6 text-sm text-left transition-all hover:text-cyan-400 group ${activeSection === section.id
                          ? 'text-cyan-400 font-medium'
                          : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-[-2px] top-0 bottom-0 w-[3px] bg-cyan-400 shadow-[2px_0_8px_rgba(34,211,238,0.3)]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="line-clamp-1">{section.title}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            <div className="space-y-16">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    {section.title}
                  </h2>
                  <div className="text-gray-300 leading-relaxed text-base">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} IncuBrix Pte. Ltd. All rights reserved.</p>
      </div>
    </div>
  );
}