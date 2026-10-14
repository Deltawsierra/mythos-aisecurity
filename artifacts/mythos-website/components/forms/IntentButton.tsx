"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";
import { announceIntent } from "@/lib/intent";

type IntentButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  /** Inquiry intent understood by the contact form, e.g. "demo". */
  intent: string;
};

/** A CTA that switches an already-mounted contact form to `intent`. */
export function IntentButton({ intent, ...props }: IntentButtonProps) {
  return <Button {...props} onClick={() => announceIntent(intent)} />;
}
