"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  const hiddenRoutePatterns = [
    /^\/admin\/dashboard$/,
    /^\/admin\/posts$/,
    /^\/admin\/posts\/new$/,
    /^\/admin\/posts\/[^/]+$/,          // ex: /admin/posts/123
    /^\/admin\/settings$/,
    /^\/admin\/posts\/[^/]+\/edit$/,    // ex: /admin/posts/123/edit
  ];
  
  const isHiddenRoute = (path: string) =>
    hiddenRoutePatterns.some((pattern) => pattern.test(path));  

  if (isHiddenRoute(pathname)) return null;

  return <Header />;
}
