"use client";

import { SearchIcon, SparklesIcon } from "lucide-react";
import Search from "@/registry/experiences/search/components/search";
import SearchAskAI from "@/registry/experiences/search-askai/components/search-ai";

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-7xl pb-24 sm:pb-32">
      <div className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Component Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <SearchIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Instant Search
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Lightning-fast search with real-time results and keyboard
                  navigation
                </p>
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 overflow-hidden">
              <Search
                applicationId="betaHAXPMHIMMC"
                apiKey="8b00405cba281a7d800ccec393e9af24"
                indexName="algolia_podcast_sample_dataset"
              />
            </div>
          </div>

          {/* Search AI Component Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <SparklesIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Search with Ask AI
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  AI-powered conversational search with natural language
                  understanding
                </p>
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 overflow-hidden">
              <SearchAskAI
                applicationId="betaHAXPMHIMMC"
                apiKey="8b00405cba281a7d800ccec393e9af24"
                indexName="algolia_podcast_sample_dataset"
                baseAskaiUrl="https://beta-askai.algolia.com"
                assistantId="Y89iGlsnihaU"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
