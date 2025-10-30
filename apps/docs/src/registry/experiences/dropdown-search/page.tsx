"use client";

import DropdownSearch from "@/registry/experiences/dropdown-search/components/dropdown-search";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[100px] md:min-h-[400px] relative p-4">
      <div className="w-full max-w-md">
        <DropdownSearch
          applicationId="06YAZFOHSQ"
          apiKey="94b6afdc316917b6e6cdf2763fa561df"
          indexName="algolia_podcast_sample_dataset"
          placeholder="Search podcasts..."
          hitsPerPage={5}
          attributes={{
            primaryText: "title",
            secondaryText: "description",
            tertiaryText: "itunesAuthor",
            image: "imageUrl",
            url: "url",
          }}
        />
      </div>
    </div>
  );
}
