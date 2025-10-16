"use client";

import { cn } from "@/lib/utils";
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
            code={`npx shadcn@latest add @algolia/search-ai`}
            title="Copy install command"
          ></CopyCodeButton>
        </div>
        <div>
          <OpenInV0Button name="search-ai"></OpenInV0Button>
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
            code={`npx shadcn@latest @add @algolia/search`}
            title="Copy install command"
          ></CopyCodeButton>
        </div>
        <div>
          <OpenInV0Button name="search-ai"></OpenInV0Button>
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
        />
      </div>
    </>
  );
}
