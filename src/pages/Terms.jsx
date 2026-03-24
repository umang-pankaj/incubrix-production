import React from 'react';
import { Scale, ShieldCheck, AlertTriangle, FileText, Mail, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Terms() {
  const lastUpdated = "24 March 2026";

  const sections = [
    {
      id: "parties",
      title: "1. Parties and Acceptance",
      content: (
        <>
          <p className="mb-4">This Agreement is entered into between IncuBrix Pte. Ltd. (“IncuBrix,” “Company,” “we,” “us,” or “our”) and you (“User,” “you,” or “your”).</p>
          <p className="mb-4">By accessing, registering for, or using the IncuBrix platform, or by clicking “I agree,” you confirm that you have read, understood, and agree to be legally bound by this Agreement. If you do not agree, you must not access or use the Platform.</p>
          <p className="text-gray-400">If you use the Platform on behalf of an organization, you represent and warrant that you have the authority to bind that organization to this Agreement.</p>
        </>
      )
    },
    {
      id: "definitions",
      title: "2. Definitions",
      content: (
        <ul className="space-y-3 text-gray-300">
          <li><strong className="text-cyan-400">Account</strong> – A registered account on the Platform.</li>
          <li><strong className="text-cyan-400">AI</strong> – Artificial intelligence, machine learning, generative AI, and related technologies.</li>
          <li><strong className="text-cyan-400">AI Output</strong> – Any content generated, transformed, or assisted by AI features.</li>
          <li><strong className="text-cyan-400">Content</strong> – All data, prompts, text, media, audio, video, images, files, metadata, inputs, and outputs processed on the Platform.</li>
          <li><strong className="text-cyan-400">Creator</strong> – A User who creates, publishes, distributes, or monetizes Content.</li>
          <li><strong className="text-cyan-400">Marketplace</strong> – The IncuBrix marketplace for AI agents, tools, services, templates, and integrations.</li>
          <li><strong className="text-cyan-400">Partner</strong> – A third party offering products or services through the Platform.</li>
          <li><strong className="text-cyan-400">Platform</strong> – All IncuBrix websites, applications, APIs, SDKs, AI models, tools, agents, processes, integrations, and related services.</li>
        </ul>
      )
    },
    {
      id: "eligibility",
      title: "3. Eligibility, Authority, and Compliance",
      content: (
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
          <li>3.1 You must be at least 18 years old to use the Platform.</li>
          <li>3.2 If you act on behalf of an organization, you confirm you have authority to bind that organization.</li>
          <li>3.3 You agree to comply with all applicable laws, regulations, export controls, sanctions, and industry standards.</li>
        </ul>
      )
    },
    {
      id: "account",
      title: "4. Account Registration, Access, and Security",
      content: (
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
          <li>4.1 You must provide accurate and complete information when creating an Account.</li>
          <li>4.2 You are responsible for all activity conducted through your Account, whether authorized or not.</li>
          <li>4.3 You must safeguard your credentials and notify IncuBrix immediately of unauthorized access or security incidents.</li>
          <li>4.4 IncuBrix may investigate suspected violations of this Agreement and may remove Content, limit functionality, suspend access, or terminate Accounts where reasonably necessary to protect the Platform, users, third parties, or legal compliance. Where appropriate, we may provide notice, but we may act without prior notice in cases involving security, fraud, abuse, unlawful activity, or material risk.</li>
        </ul>
      )
    },
    {
      id: "services",
      title: "5. Platform Services and Availability",
      content: (
        <div className="space-y-3 text-gray-300">
          <p>5.1 The Platform provides AI-powered tools for content creation, transformation, automation, collaboration, analytics, monetization, and marketplace access.</p>
          <p>5.2 Certain features may be labeled beta, experimental, or preview and are provided “as is.”</p>
          <p>5.3 The Platform is provided on an “as available” basis. No SLA or uptime guarantee applies unless agreed in a separate written enterprise agreement.</p>
          <p>5.4 <strong>Third-Party Dependencies</strong> – Certain features of the Platform depend on third-party providers and infrastructure. IncuBrix is not responsible for outages, interruptions, delays, feature changes, or failures caused by third-party services, although we will make reasonable efforts to manage and mitigate such issues.</p>
        </div>
      )
    },
    {
      id: "supplemental",
      title: "6. Supplemental Terms",
      content: "Certain features (including APIs, Marketplace services, enterprise plans, beta features, or integrations) may be governed by supplemental terms presented at the time of use. In the event of a conflict, Supplemental Terms will prevail with respect to the applicable feature."
    },
    {
      id: "acceptable-use",
      title: "7. Acceptable Use and Prohibited Activities",
      content: (
        <>
          <p className="mb-3">You agree not to:</p>
          <div className="grid md:grid-cols-2 gap-2">
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
              <li>Violate any law or regulation</li>
              <li>Infringe intellectual property, privacy, or publicity rights</li>
              <li>Generate illegal, harmful, deceptive, hateful, or abusive content</li>
              <li>Impersonate others or create undisclosed deepfakes</li>
            </ul>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
              <li>Reverse engineer, scrape, benchmark competitively, or extract models</li>
              <li>Bypass safeguards, rate limits, or security controls</li>
              <li>Introduce malware or malicious code</li>
            </ul>
          </div>
          <p className="mt-3 text-gray-400 italic">IncuBrix may enforce these rules at its sole discretion.</p>
        </>
      )
    },
    {
      id: "ownership",
      title: "8. Content Ownership, Licenses, and Moderation",
      content: (
        <ul className="space-y-3 text-gray-300">
          <li><strong className="text-white">8.1 Ownership</strong> – You retain ownership of your Content.</li>
          <li><strong className="text-white">8.2 User Warranties</strong> – You represent that you own or have rights to submit Content and that it complies with law.</li>
          <li><strong className="text-white">8.3 User Responsibility for Content</strong> – You are solely responsible for your Content, including its legality, accuracy, rights clearance, and compliance with applicable laws. IncuBrix does not endorse, verify, or assume responsibility for User Content or third-party content made available through the Platform.</li>
          <li><strong className="text-white">8.4 License to IncuBrix</strong> – You grant IncuBrix a worldwide, non-exclusive, royalty-free, transferable, and sublicensable license to host, store, process, modify, and use Content solely to operate, secure, improve, and provide the Platform and comply with legal obligations.</li>
          <li><strong className="text-white">8.5 Moderation & Disclosure</strong> – IncuBrix may review, remove, or disclose Content to comply with law, court orders, or safety requirements.</li>
        </ul>
      )
    },
    {
      id: "ai-features",
      title: "9. AI Features and AI Outputs",
      content: (
        <div className="bg-[#151d45] border border-cyan-500/20 rounded-xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">9.1 AI Outputs are probabilistic and may be inaccurate, incomplete, or inappropriate.</p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">9.2 AI Outputs do not constitute legal, medical, financial, or professional advice.</p>
          </div>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300 mt-2">
            <li>9.3 You are solely responsible for reviewing, editing, validating, and determining whether AI Outputs are appropriate before using, publishing, sharing, or relying on them.</li>
            <li>9.4 <strong>Synthetic Media and Disclosure</strong> – You must not use the Platform to create or distribute deceptive or unlawful synthetic media, including impersonation or undisclosed deepfakes. Where required by law or industry practice, you are responsible for obtaining consent and providing appropriate disclosure.</li>
            <li>9.5 IncuBrix does not guarantee originality or non-infringement of AI Outputs.</li>
            <li>9.6 <strong>AI Training</strong> – Aggregated and anonymized data may be used to improve the Platform. Personally identifiable user data is not used to train AI models unless explicitly agreed under a separate enterprise agreement.</li>
            <li>9.7 <strong>Third-Party Models</strong> – Certain AI features rely on third-party providers. IncuBrix disclaims liability for third-party AI behavior while remaining responsible for platform integration.</li>
          </ul>
        </div>
      )
    },
    {
      id: "commercial",
      title: "10. Commercial vs Personal Use",
      content: "Certain features, outputs, publishing capabilities, monetization tools, client work, team collaboration, API access, or business use may require a paid subscription or enterprise agreement. Free or trial plans may be limited to personal, evaluation, or internal use unless otherwise stated on the pricing page or in Supplemental Terms."
    },
    {
      id: "marketplace",
      title: "11. Marketplace, Creators, and Partners",
      content: (
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
          <li>11.1 Creators and Partners act independently. IncuBrix is not an agent, employer, or fiduciary.</li>
          <li>11.2 Marketplace transactions occur solely between Users and Partners.</li>
          <li>11.3 IncuBrix may charge platform fees or commissions as disclosed.</li>
          <li>11.4 IncuBrix does not guarantee any particular creative, publishing, monetization, audience growth, engagement, traffic, commercial, or revenue outcome from use of the Platform.</li>
        </ul>
      )
    },
    {
      id: "billing",
      title: "12. Credits, Usage-Based Billing, and Payments",
      content: (
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
          <li>12.1 Certain features may use credits, tokens, or usage-based billing.</li>
          <li>12.2 Paid plans are billed in advance on a recurring basis and renew automatically unless canceled before the next renewal date. Prices may exclude applicable taxes unless otherwise stated.</li>
          <li>12.3 If a subscription is upgraded, downgraded, or changed, charges may be prorated or adjusted in the current or next billing cycle, as applicable.</li>
          <li>12.4 Fees, credits, and subscriptions are generally non-refundable except where required by law or in the case of verified billing errors, duplicate charges, or unauthorized transactions. IncuBrix may, at its discretion, provide credits, refunds, or other adjustments in appropriate circumstances.</li>
          <li>12.5 You are responsible for maintaining a valid payment method. IncuBrix may suspend access to paid features if payment cannot be processed.</li>
        </ul>
      )
    },
    {
      id: "privacy",
      title: "13. Data Protection and Privacy",
      content: "Use of the Platform is subject to the IncuBrix Privacy Policy, which is incorporated by reference. Enterprise customers may request a Data Processing Addendum (DPA)."
    },
    {
      id: "dmca",
      title: "14. Copyright, IP Complaints, and DMCA",
      content: "IncuBrix responds to valid copyright infringement notices and may terminate repeat infringers. DMCA notices should include sufficient detail to identify the copyrighted work and allegedly infringing material and be sent to contact@incubrix.com."
    },
    {
      id: "security",
      title: "15. Security and Shared Responsibility",
      content: (
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
          <li>15.1 IncuBrix implements reasonable security safeguards.</li>
          <li>15.2 Users are responsible for securing their accounts, configurations, exports, and backups.</li>
        </ul>
      )
    },
    {
      id: "export",
      title: "16. Export Controls and Sanctions",
      content: "You may not use the Platform in violation of export control or sanctions laws of Singapore, the United States, the EU, or other applicable jurisdictions."
    },
    {
      id: "force-majeure",
      title: "17. Force Majeure",
      content: "IncuBrix shall not be liable for delays or failures caused by events beyond reasonable control, including natural disasters, internet outages, war, government actions, or force majeure events."
    },
    {
      id: "disclaimers",
      title: "18. Disclaimers",
      content: <p className="font-bold text-white uppercase">THE PLATFORM AND AI OUTPUTS ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND.</p>
    },
    {
      id: "liability",
      title: "19. Limitation of Liability",
      content: "To the maximum extent permitted by law, IncuBrix shall not be liable for indirect, incidental, or consequential damages. Total liability shall not exceed the fees paid by you in the 12 months preceding the claim."
    },
    {
      id: "indemnification",
      title: "20. Indemnification",
      content: "You agree to indemnify and hold harmless IncuBrix from claims arising from your Content, use of the Platform, or violation of this Agreement."
    },
    {
      id: "dispute",
      title: "21. Dispute Resolution and Governing Law",
      content: "Disputes shall be resolved by confidential arbitration in Singapore, unless prohibited by law. This Agreement is governed by the laws of Singapore."
    },
    {
      id: "termination",
      title: "22. Termination",
      content: "IncuBrix may suspend or terminate access at any time. Provisions relating to IP, AI risk, disclaimers, limitation of liability, indemnification, and governing law shall survive termination."
    },
    {
      id: "assignment",
      title: "23. Assignment",
      content: "You may not assign this Agreement without consent. IncuBrix may assign freely in connection with corporate transactions."
    },
    {
      id: "changes",
      title: "24. Changes to These Terms",
      content: "Material changes will be notified in advance where reasonable. Continued use constitutes acceptance."
    },
    {
      id: "severability",
      title: "25. Severability and Waiver",
      content: "Invalid provisions shall not affect the remainder. Failure to enforce is not a waiver."
    },
    {
      id: "entire-agreement",
      title: "26. Entire Agreement",
      content: "This Agreement constitutes the entire agreement between you and IncuBrix regarding the Platform."
    },
    {
      id: "analytics",
      title: "27. Platform Metrics and Analytics",
      content: "IncuBrix owns aggregated, anonymized platform metrics and analytics that do not identify individuals."
    },
    {
      id: "contact",
      title: "28. Contact Information",
      content: (
        <div className="bg-[#151d45] border border-white/10 rounded-xl p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-white">IncuBrix Pte. Ltd.</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-white">Singapore</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="text-white">Email: <a href="mailto:contact@incubrix.com" className="text-cyan-400 hover:underline">contact@incubrix.com</a></span>
            </div>
          </div>
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
        <div className="max-w-4xl mx-auto px-6 py-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Scale className="w-3 h-3" /> Legal Documentation
          </div>
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-6 tracking-tight">Terms of Service</h1>
          <p className="text-gray-400 text-lg">
            Last Updated: <span className="text-cyan-400">{lastUpdated}</span>
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section id="introduction" className="py-12 px-6 border-b border-white/5 bg-[#050510]/30 scroll-mt-32">
        <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
          <p className="mb-6">
            These Terms of Service (“Agreement” or “Terms”) govern your access to and use of the IncuBrix platform
            and services. This Agreement is intended to protect IncuBrix while remaining fair, transparent, and
            clear for Users, Creators, and Partners.
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
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3 border-l-4 border-cyan-500 pl-4 py-1">
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
      <div className="border-t border-white/5 py-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} IncuBrix Pte. Ltd. All rights reserved.</p>
      </div>
    </div>
  );
}