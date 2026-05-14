"use client";

import { useState } from "react";
import { PromptInputBox } from "./ui/ai-prompt-box";

const suggestions = [
  "Build a REST API with authentication",
  "Create a CI/CD pipeline for my app",
  "Write tests for my auth module",
  "Design a microservices architecture",
];

export default function TryCevoSection() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (message: string) => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, message]);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1800);
  };

  return (
    <section id="try-cevo" className="relative z-10 bg-[#0d0d0d] py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-medium text-gray-500 tracking-[0.22em] uppercase mb-5">
            Try CEVO
          </span>
          <h2
            className="font-display font-extrabold text-white leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Build anything with natural language
          </h2>
          <p className="mt-4 text-gray-500 text-[15px] font-sans leading-relaxed">
            Describe what you want to create and CEVO&apos;s agents will make it
            happen.
          </p>
        </div>

        {/* Message history */}
        {messages.length > 0 && (
          <div className="mb-5 space-y-2.5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className="bg-white/[0.05] border border-white/[0.08] rounded-2xl px-5 py-3.5 text-gray-200 text-[14px] font-sans"
              >
                {msg}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-1.5 px-5 py-3.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.14}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Prompt box */}
        <PromptInputBox
          onSend={handleSend}
          isLoading={isLoading}
          placeholder="Ask CEVO to build something..."
        />

        {/* Suggestion chips */}
        {messages.length === 0 && (
          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="text-[12px] text-gray-500 border border-white/[0.08] rounded-full px-4 py-2 hover:border-white/20 hover:text-gray-300 transition-all font-sans"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
