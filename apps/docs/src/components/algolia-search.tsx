"use client";

import { DocSearchModal } from "@docsearch/react/modal";
import type { SharedProps } from "fumadocs-ui/components/dialog/search";
import { useState } from "react";

// Replace these with your actual Algolia credentials
const appId = "GCH2YM3XGA";
const apiKey = "00f6062a9978e5a3ca3203b4c3797fcc";
const indexName = "Sitesearch [prod]";

export default function AlgoliaSearch(props: SharedProps) {
  // get theme from localstorage
  const theme =
    typeof window !== "undefined"
      ? localStorage?.getItem("theme") || "light"
      : "light";
  const isDark = theme === "dark";

  const [isAskAiActive, setIsAskAiActive] = useState(false);

  if (!props.open) {
    return null;
  }

  const handleClose = () => {
    props.onOpenChange(false);
  };

  const handleAskAiToggle = (toggle: boolean) => {
    setIsAskAiActive(toggle);
  };

  return (
    <DocSearchModal
      appId={appId}
      apiKey={apiKey}
      indices={[indexName]}
      askAi="iZKY9ihQQPcz"
      theme={isDark ? "dark" : "light"}
      placeholder="Search documentation..."
      initialScrollY={0}
      onAskAiToggle={handleAskAiToggle}
      isAskAiActive={isAskAiActive}
      onClose={handleClose}
    />
  );
}
