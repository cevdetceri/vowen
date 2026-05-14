function CevoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
      <path d="M6 4L24 14L6 24V18.5L18 14L6 9.5V4Z" fill="currentColor" />
    </svg>
  );
}

const footerLinks: Record<string, string[]> = {
  Product: ["Overview", "Features", "Pricing", "Changelog", "Roadmap"],
  "Use Cases": [
    "Coding Agents",
    "Research",
    "Data Analysis",
    "Automation",
    "Enterprise",
  ],
  Resources: [
    "Documentation",
    "API Reference",
    "Blog",
    "Community",
    "Status",
  ],
  Company: ["About", "Careers", "Press", "Privacy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-100 bg-[#fafafa] py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Brand */}
          <div className="lg:w-60 flex-shrink-0">
            <div className="flex items-center gap-2.5 text-[#0d0d0d] mb-4">
              <CevoMark />
              <span className="font-display font-semibold text-[17px] tracking-tight">
                CEVO
              </span>
            </div>
            <p className="text-gray-400 text-[13px] font-sans leading-relaxed">
              Build the next generation of software with agents that think, plan,
              and act.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 flex-1">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-display font-semibold text-[12.5px] text-[#0d0d0d] mb-4 tracking-tight">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 text-[13px] font-sans hover:text-gray-700 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-[12px] font-sans">
            © 2025 CEVO. All rights reserved.
          </p>
          <p className="text-gray-300 text-[12px] font-sans">
            Built for the agent-first era.
          </p>
        </div>
      </div>
    </footer>
  );
}
