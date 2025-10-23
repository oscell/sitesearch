"use client";

import { cn } from "@/lib/utils";
import { HighlightAskAI } from "@/registry/experiences/highlight-to-askai/components/highlight-to-askai";
import Search from "@/registry/experiences/search/components/search";
import SearchWithAskAi from "@/registry/experiences/search-askai/components/search-ai";
import { CopyCodeButton } from "./copy-code-button";
import { OpenInV0Button } from "./open-in-v0";
import { GridPattern } from "./ui/grid-pattern";

export function PreviewSiteSearch() {
  return (
    <>
      <div className="flex justify-between items-center mb-2 ">
        <div>
          <CopyCodeButton
            code={`npx shadcn@latest add @algolia/highlight-to-askai`}
            title="Copy install command"
          ></CopyCodeButton>
        </div>
        <div>
          <OpenInV0Button name="highlight-to-askai"></OpenInV0Button>
        </div>
      </div>
      <div className="bg-background relative flex h-[400px] items-center justify-center overflow-hidden rounded-lg border p-20">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          )}
        />
        <SearchWithAskAi
          applicationId="betaHAXPMHIMMC"
          apiKey="8b00405cba281a7d800ccec393e9af24"
          indexName="algolia_podcast_sample_dataset"
          assistantId="rO3NctSlNXEx"
          placeholder="Search for podcasts..."
          baseAskaiUrl="https://beta-askai.algolia.com"
          hitsPerPage={6}
          keyboardShortcut="cmd+k"
          buttonText="🎧 Search Podcasts"
          attributes={{
            primaryText: "title",
            secondaryText: "description",
          }}
        />
      </div>
    </>
  );
}

export function PreviewSearchNoAskAI() {
  return (
    <>
      <div className="flex justify-between items-center mb-2 ">
        <div>
          <CopyCodeButton
            code={`npx shadcn@latest add @algolia/search`}
            title="Copy install command"
          ></CopyCodeButton>
        </div>
        <div>
          <OpenInV0Button name="search"></OpenInV0Button>
        </div>
      </div>
      <div className="bg-background relative flex h-[400px] items-center justify-center overflow-hidden rounded-lg border p-20">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          )}
        />
        <Search
          applicationId="betaHAXPMHIMMC"
          apiKey="8b00405cba281a7d800ccec393e9af24"
          indexName="algolia_podcast_sample_dataset"
          placeholder="Search for podcasts..."
          hitsPerPage={15}
          keyboardShortcut="cmd+k"
          buttonText="🎧 Search Podcasts"
          attributes={{
            primaryText: "title",
            secondaryText: "description",
            image: "imageUrl",
          }}
        />
      </div>
    </>
  );
}

export function PreviewHighlightToAskAI() {
  return (
    <>
      <div className="flex justify-between items-center mb-2 ">
        <div>
          <CopyCodeButton
            code={`npx shadcn@latest add @algolia/highlight-to-askai`}
            title="Copy install command"
          ></CopyCodeButton>
        </div>
        <div>
          <OpenInV0Button name="highlight-to-askai"></OpenInV0Button>
        </div>
      </div>
      <div className="bg-background relative flex h-[400px] items-center justify-center overflow-hidden rounded-lg border p-20">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          )}
        />
        <div className=" ">
          <HighlightAskAI
            excludeElements={["pre", "code"]}
            applicationId="betaHAXPMHIMMC"
            apiKey="8b00405cba281a7d800ccec393e9af24"
            indexName="algolia_podcast_sample_dataset"
            assistantId="rO3NctSlNXEx"
            askAiBaseUrl="https://beta-askai.algolia.com"
            side="top"
            sideOffset={8}
          >
            <article className="prose dark:prose-invert">
              <h3>Try it</h3>
              <p>
                Select any text in this block to see a small tooltip. Click
                <em> Ask AI?</em> to expand the panel. We’ll wire streaming
                later.
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
    </>
  );
}
