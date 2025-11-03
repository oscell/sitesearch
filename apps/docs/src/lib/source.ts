import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { docs } from "@/.source";
import { LogosJavascript } from "@/components/icons/javascript";
import { LogosShadcn } from "@/components/icons/shadcn";
import { LogosShadcnJs } from "@/components/icons/shadcn-js";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return null;
    if (icon === "shadcn") {
      return LogosShadcn({});
    }
    if (icon === "javascript") {
      return LogosJavascript({});
    }
    if (icon === "shadcnjs") {
      return LogosShadcnJs({});
    }
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
    return icon;
  },
});
