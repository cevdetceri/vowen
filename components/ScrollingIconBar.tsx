"use client";

import {
  Monitor,
  Grid3X3,
  Network,
  Sparkles,
  Code2,
  Terminal,
  GitBranch,
  Copy,
  Box,
  Braces,
  Search,
  CornerDownLeft,
  Cpu,
  Layers,
  Wand2,
  Database,
  Cloud,
  PenTool,
  ArrowUpRight,
  Lock,
} from "lucide-react";

const tools = [
  { Icon: Monitor, label: "Browser" },
  { Icon: Grid3X3, label: "Modules" },
  { Icon: Network, label: "Network" },
  { Icon: Sparkles, label: "AI" },
  { Icon: Code2, label: "Code" },
  { Icon: Terminal, label: "Terminal" },
  { Icon: GitBranch, label: "Versions" },
  { Icon: Copy, label: "Docs" },
  { Icon: Box, label: "3D" },
  { Icon: Braces, label: "JSON" },
  { Icon: Search, label: "Search" },
  { Icon: CornerDownLeft, label: "Return" },
  { Icon: Cpu, label: "Compute" },
  { Icon: Layers, label: "Layers" },
  { Icon: Wand2, label: "Magic" },
  { Icon: Database, label: "Data" },
  { Icon: Cloud, label: "Cloud" },
  { Icon: PenTool, label: "Design" },
  { Icon: ArrowUpRight, label: "Deploy" },
  { Icon: Lock, label: "Security" },
];

const doubled = [...tools, ...tools];

export default function ScrollingIconBar() {
  return (
    <div className="relative overflow-hidden py-5 border-t border-b border-gray-100/80">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-3 animate-scroll-left"
        style={{ width: "max-content" }}
      >
        {doubled.map(({ Icon, label }, i) => (
          <button
            key={`${label}-${i}`}
            title={label}
            className="flex-shrink-0 w-11 h-11 rounded-full border border-gray-200 bg-white/70 flex items-center justify-center hover:border-gray-400 hover:bg-white transition-all group cursor-pointer"
          >
            <Icon className="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-800 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
