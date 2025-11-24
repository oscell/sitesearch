/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: markdown rendering, sanitized by marked */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: parts are stable during render */
"use client";

import type { Placement } from "@floating-ui/react";
import React from "react";
import {
  ToolCallInput,
  ToolCallOutput,
  useAgentStudio,
} from "../hooks/use-agent-studio";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { UIMessage } from "@ai-sdk/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type CurationAgentProps = {
  applicationId: string;
  apiKey: string;
  agentId: string;
  excludeElements?: string[];
  side?: Placement;
  sideOffset?: number;
  delay?: number;
  className?: string;
};

const AlgoliaLogo = ({ size = 52 }: { size?: number | string }) => (
  <svg
    width="80"
    height="24"
    aria-label="Algolia"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2196.2 500"
    style={{ maxWidth: size }}
  >
    <defs>
      {/* eslint-disable-nextLine @docusaurus/no-untranslated-text */}
      <style>{`.cls-1,.cls-2{fill:#003dff}.cls-2{fillRule:evenodd}`}</style>
    </defs>
    <path
      className="cls-2"
      d="M1070.38,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"
    />
    <rect
      className="cls-1"
      x="1845.88"
      y="104.73"
      width="62.58"
      height="277.9"
      rx="5.9"
      ry="5.9"
    />
    <path
      className="cls-2"
      d="M1851.78,71.38h50.77c3.26,0,5.9-2.64,5.9-5.9V5.9c0-3.62-3.24-6.39-6.82-5.83l-50.77,7.95c-2.87,.45-4.99,2.92-4.99,5.83v51.62c0,3.26,2.64,5.9,5.9,5.9Z"
    />
    <path
      className="cls-2"
      d="M1764.03,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"
    />
    <path
      className="cls-2"
      d="M1631.95,142.72c-11.14-12.25-24.83-21.65-40.78-28.31-15.92-6.53-33.26-9.85-52.07-9.85-18.78,0-36.15,3.17-51.92,9.85-15.59,6.66-29.29,16.05-40.76,28.31-11.47,12.23-20.38,26.87-26.76,44.03-6.38,17.17-9.24,37.37-9.24,58.36,0,20.99,3.19,36.87,9.55,54.21,6.38,17.32,15.14,32.11,26.45,44.36,11.29,12.23,24.83,21.62,40.6,28.46,15.77,6.83,40.12,10.33,52.4,10.48,12.25,0,36.78-3.82,52.7-10.48,15.92-6.68,29.46-16.23,40.78-28.46,11.29-12.25,20.05-27.04,26.25-44.36,6.22-17.34,9.24-33.22,9.24-54.21,0-20.99-3.34-41.19-10.03-58.36-6.38-17.17-15.14-31.8-26.43-44.03Zm-44.43,163.75c-11.47,15.75-27.56,23.7-48.09,23.7-20.55,0-36.63-7.8-48.1-23.7-11.47-15.75-17.21-34.01-17.21-61.2,0-26.89,5.59-49.14,17.06-64.87,11.45-15.75,27.54-23.52,48.07-23.52,20.55,0,36.63,7.78,48.09,23.52,11.47,15.57,17.36,37.98,17.36,64.87,0,27.19-5.72,45.3-17.19,61.2Z"
    />
    <path
      className="cls-2"
      d="M894.42,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"
    />
    <path
      className="cls-2"
      d="M2133.97,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"
    />
    <path
      className="cls-2"
      d="M1314.05,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-11.79,18.34-19.6,39.64-22.11,62.59-.58,5.3-.88,10.68-.88,16.14s.31,11.15,.93,16.59c4.28,38.09,23.14,71.61,50.66,94.52,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47h0c17.99,0,34.61-5.93,48.16-15.97,16.29-11.58,28.88-28.54,34.48-47.75v50.26h-.11v11.08c0,21.84-5.71,38.27-17.34,49.36-11.61,11.08-31.04,16.63-58.25,16.63-11.12,0-28.79-.59-46.6-2.41-2.83-.29-5.46,1.5-6.27,4.22l-12.78,43.11c-1.02,3.46,1.27,7.02,4.83,7.53,21.52,3.08,42.52,4.68,54.65,4.68,48.91,0,85.16-10.75,108.89-32.21,21.48-19.41,33.15-48.89,35.2-88.52V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,64.1s.65,139.13,0,143.36c-12.08,9.77-27.11,13.59-43.49,14.7-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-1.32,0-2.63-.03-3.94-.1-40.41-2.11-74.52-37.26-74.52-79.38,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33Z"
    />
    <path
      className="cls-1"
      d="M249.83,0C113.3,0,2,110.09,.03,246.16c-2,138.19,110.12,252.7,248.33,253.5,42.68,.25,83.79-10.19,120.3-30.03,3.56-1.93,4.11-6.83,1.08-9.51l-23.38-20.72c-4.75-4.21-11.51-5.4-17.36-2.92-25.48,10.84-53.17,16.38-81.71,16.03-111.68-1.37-201.91-94.29-200.13-205.96,1.76-110.26,92-199.41,202.67-199.41h202.69V407.41l-115-102.18c-3.72-3.31-9.42-2.66-12.42,1.31-18.46,24.44-48.53,39.64-81.93,37.34-46.33-3.2-83.87-40.5-87.34-86.81-4.15-55.24,39.63-101.52,94-101.52,49.18,0,89.68,37.85,93.91,85.95,.38,4.28,2.31,8.27,5.52,11.12l29.95,26.55c3.4,3.01,8.79,1.17,9.63-3.3,2.16-11.55,2.92-23.58,2.07-35.92-4.82-70.34-61.8-126.93-132.17-131.26-80.68-4.97-148.13,58.14-150.27,137.25-2.09,77.1,61.08,143.56,138.19,145.26,32.19,.71,62.03-9.41,86.14-26.95l150.26,133.2c6.44,5.71,16.61,1.14,16.61-7.47V9.48C499.66,4.25,495.42,0,490.18,0H249.83Z"
    />
  </svg>
);

function LoadingSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-row gap-2 items-center justify-center my-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="w-32 h-32 rounded-full" />
      ))}
    </div>
  );
}

export function CurationAgent({
  applicationId,
  apiKey,
  agentId,
  className,
}: CurationAgentProps) {
  const { messages, isGenerating, sendMessage } = useAgentStudio({
    applicationId,
    apiKey,
    agentId,
  });

  // STATIC subject – does not change
  const subject = React.useRef({
    objectID: "M0E20000000EEWD",
    title: "T-Shirt Majestic Filatures beige-white",
    image:
      "https://fxqklbpngldowtbkqezm.supabase.co/storage/v1/object/public/assets-flagship-fashion/M0E20000000EEWD_0.jpg",
  }).current;

  // Collect all combinations from all assistant messages
  const combinations = React.useMemo(() => {
    const allCombinations: Array<{
      key: string;
      title: string;
      items: Array<{
        imageUrl: string;
        name: string;
        objectID: string;
      }>;
    }> = [];

    messages.forEach((message: UIMessage) => {
      if (message.role === "assistant" && message.parts) {
        message.parts.forEach((part, partIndex) => {
          if (
            (part as any).type === "tool-compose-combinations" &&
            (part as any).state === "output-available" &&
            (part as any).output
          ) {
            const input = (part as any).input as unknown as ToolCallInput;
            if (input.combinations && input.combinations.length > 0) {
              input.combinations.forEach((group, groupIndex) => {
                if (group.items && group.items.length > 0) {
                  allCombinations.push({
                    key: `${
                      (part as any).toolCallId || partIndex
                    }-${groupIndex}`,
                    title: group.title,
                    items: group.items,
                  });
                }
              });
            }
          }
        });
      }
    });

    return allCombinations;
  }, [messages]);

  const hasOutput = combinations.length > 0;
  // NEW: tab state that always points to real content
  const [tab, setTab] = React.useState<string>("loading-1");

  React.useEffect(() => {
    if (hasOutput) {
      // Keep current tab if it still exists, else fall back to first combo
      setTab((prev) =>
        combinations.some((c) => c.key === prev) ? prev : combinations[0]?.key
      );
    } else {
      setTab("loading-1");
    }
  }, [hasOutput, combinations]);

  return (
    <div className={`flex gap-4 ${className ?? ""}`}>
      {/* LEFT: Subject is always visible and stable */}
      <aside className="sticky top-0 self-start w-40 shrink-0 flex flex-col items-center gap-2">
        <img
          src={subject.image}
          alt={subject.title}
          className="object-cover w-40 h-40 overflow-hidden rounded shadow-lg shadow-foreground"
        />
        <div className="text-sm font-medium text-center line-clamp-2">
          {subject.title}
        </div>
      </aside>

      {/* RIGHT: Interactive panel */}
      <section className="flex-1 min-w-0">
        <Input
          type="text"
          placeholder="What are you looking for?"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage({ text: (e.target as HTMLInputElement).value });
            }
          }}
          disabled={isGenerating}
        />

        {/* Loading state */}

        {/* Combinations – subject remains visible at left */}
        {(hasOutput || !isGenerating) && (
          <div className="mt-3">
            {/* REPLACE your <Tabs ...> block with this */}

            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="flex flex-row gap-2">
                {!hasOutput ? (
                  <>
                    <TabsTrigger value="loading-1">combination 1</TabsTrigger>
                    <TabsTrigger value="loading-2">combination 2</TabsTrigger>
                  </>
                ) : (
                  combinations.map((combination) => (
                    <TabsTrigger key={combination.key} value={combination.key}>
                      {combination.title}
                    </TabsTrigger>
                  ))
                )}
              </TabsList>

              {/* Loading state now lives in TabsContent, so layout matches populated */}
              {!hasOutput ? (
                <>
                  <TabsContent value="loading-1" className="mt-0">
                    <Carousel className="w-full relative">
                      <CarouselContent className="-ml-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <CarouselItem key={i} className="pl-2 basis-1/3">
                            <Skeleton className="w-32 h-32 rounded" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-0" />
                      <CarouselNext className="right-0" />
                    </Carousel>
                  </TabsContent>

                  <TabsContent value="loading-2" className="mt-0">
                    <Carousel className="w-full relative">
                      <CarouselContent className="-ml-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <CarouselItem key={i} className="pl-2 basis-1/3">
                            <Skeleton className="w-32 h-32 rounded" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-0" />
                      <CarouselNext className="right-0" />
                    </Carousel>
                  </TabsContent>
                </>
              ) : (
                combinations.map((combination) => (
                  <TabsContent
                    key={combination.key}
                    value={combination.key}
                    className="mt-0"
                  >
                    <Carousel className="w-full relative">
                      <CarouselContent className="-ml-2">
                        {combination.items.map((item) => (
                          <CarouselItem
                            key={item.objectID}
                            className="pl-2 basis-1/3"
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-32 h-32 rounded object-cover mt-0 mb-0"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-0" />
                      <CarouselNext className="right-0" />
                    </Carousel>
                  </TabsContent>
                ))
              )}
            </Tabs>
          </div>
        )}

        <AlgoliaLogo />
      </section>
    </div>
  );
}

export default CurationAgent;
