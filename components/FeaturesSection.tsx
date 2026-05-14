"use client";

import { useRef, useEffect, useState } from "react";
import {
  Zap,
  Shield,
  GitBranch,
  Globe,
  Code2,
  BarChart3,
} from "lucide-react";

const features = [
  {
    Icon: Zap,
    title: "Instant Agent Deployment",
    description:
      "Deploy intelligent agents in seconds. CEVO handles orchestration, scaling, and monitoring automatically.",
  },
  {
    Icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Built-in secrets management, access controls, and audit logging keep your agents and data secure.",
  },
  {
    Icon: GitBranch,
    title: "Version Control Native",
    description:
      "Every agent run is tracked. Branch, diff, and roll back agent behaviors just like code.",
  },
  {
    Icon: Globe,
    title: "Any Model, Any Cloud",
    description:
      "Connect to any LLM provider or run on your own infrastructure. No vendor lock-in.",
  },
  {
    Icon: Code2,
    title: "End-to-End Code Generation",
    description:
      "Agents that write, test, and deploy code. Human-in-the-loop controls where it matters most.",
  },
  {
    Icon: BarChart3,
    title: "Real-time Observability",
    description:
      "Full traces, metrics, and cost tracking for every agent interaction across your stack.",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="relative z-10 py-32 px-8 md:px-16 lg:px-24 bg-[#fafafa]">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <span className="text-[11px] font-medium text-gray-400 tracking-[0.22em] uppercase">
            Capabilities
          </span>
          <h2
            className="mt-4 font-display font-extrabold text-[#0d0d0d] leading-[1.02] tracking-tight max-w-2xl"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3.5rem)" }}
          >
            Everything you need to build in the agent era
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-100 rounded-2xl overflow-hidden"
        >
          {features.map(({ Icon, title, description }, i) => (
            <div
              key={title}
              className={`border-gray-100 p-8 transition-all duration-500 ease-out hover:bg-white group ${
                i < 3 ? "border-b" : ""
              } ${i % 3 !== 2 ? "md:border-r" : ""} ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center mb-6 group-hover:border-gray-400 transition-colors">
                <Icon className="w-[17px] h-[17px] text-gray-500 group-hover:text-gray-800 transition-colors" />
              </div>
              <h3 className="font-display font-bold text-[17px] text-[#0d0d0d] mb-2.5 tracking-tight">
                {title}
              </h3>
              <p className="text-gray-500 text-[13.5px] leading-relaxed font-sans">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
