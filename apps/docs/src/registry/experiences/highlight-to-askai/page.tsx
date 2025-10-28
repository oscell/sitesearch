"use client";

import { HighlightAskAI } from "@/registry/experiences/highlight-to-askai/components/highlight-to-askai";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[100px] md:min-h-[400px] relative p-6">
      <div className="w-full max-w-3xl">
        <HighlightAskAI
          excludeElements={["pre", "code"]}
          applicationId="06YAZFOHSQ"
          apiKey="94b6afdc316917b6e6cdf2763fa561df"
          indexName="algolia_podcast_sample_dataset"
          assistantId="UpR727VnXnoG"
          askAiBaseUrl="https://askai.algolia.com"
          side="top"
          sideOffset={8}
        >
          <article className="prose dark:prose-invert">
            <h3>Try it</h3>
            <p>
              Select any text in this block to see a small tooltip. Click
              <em> Ask AI?</em> to expand the panel and stream an answer.
            </p>
            <p>
              The tooltip respects excluded elements like <code>pre</code> and
              <code>code</code>, and it uses smart placement to avoid viewport
              edges.
            </p>
          </article>
        </HighlightAskAI>
        <p className="mt-2 text-right text-xs opacity-60">
          Tip: Try selecting a sentence across multiple lines.
        </p>
      </div>
    </div>
  );
}
