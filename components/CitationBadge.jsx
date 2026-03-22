import React from "react";
import { Badge, Tooltip } from "@heroui/react";

export default function CitationBadge({ label, href, title }) {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <span className="inline-flex">
          <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">
            <a href={href} target="_blank" rel="noreferrer" className="text-[var(--color-primary)] underline">
              {label}
            </a>
          </Badge>
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content className="rounded-xl bg-[var(--color-surface)] p-2 text-xs text-[var(--color-text)]">{title}</Tooltip.Content>
    </Tooltip>
  );
}
