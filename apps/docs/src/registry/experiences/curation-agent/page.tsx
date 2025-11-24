"use client";

import { HighlightAskAI } from "@/registry/experiences/highlight-to-askai/components/highlight-to-askai";
import { CurationAgent } from "./components/curation-agent";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[100px] md:min-h-[400px] relative p-6">
      <div className="w-full max-w-3xl">
        <CurationAgent
          applicationId="CCZC5HO11D"
          apiKey="eaf19d39d027fc0064273050813d6eb0"
          agentId="e9d7a2bb-8e10-4168-a6a7-6c2a2d3e8ddd"
        />

        <p className="mt-2 text-right text-xs opacity-60">
          Tip: Try selecting a sentence across multiple lines.
        </p>
      </div>
    </div>
  );
}
