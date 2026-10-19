"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * A Link that prefetches on intent (pointer over, focus, touch) instead of on
 * entering the viewport. For link-dense chrome (the mega menu, the mobile
 * drawer, the footer): with viewport prefetch every page would download the
 * payload of ~40 routes the visitor never opens.
 */
export function IntentLink({ href, onPointerEnter, onFocus, onTouchStart, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();
  const prefetch = () => router.prefetch(href);
  return (
    <Link
      href={href}
      prefetch={false}
      onPointerEnter={(e) => {
        prefetch();
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        prefetch();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        prefetch();
        onTouchStart?.(e);
      }}
      {...props}
    />
  );
}
