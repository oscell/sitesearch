"use client";

import Search from "@/registry/experiences/search/components";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[100px] md:min-h-[400px] relative p-4">
      <Search
        applicationId="betaHAXPMHIMMC"
        apiKey="8b00405cba281a7d800ccec393e9af24"
        indexName="algolia_podcast_sample_dataset"
      />
    </div>
  );
}
