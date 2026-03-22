import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Badge, Button, Card, Tooltip } from "@heroui/react";

export default function ResultListItem({ item, onOpen, onSummarize }) {
  return (
    <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
      <Card.Content className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <p className="truncate font-semibold text-[var(--color-text)]">{item?.title || "Untitled"}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {(item?.tags || []).map((t) => (
              <Badge key={t} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]"
                size="sm"
                variant="outline"
                onPress={() => onSummarize?.(item)}
              >
                <SparklesIcon className="mr-1 h-4 w-4 text-[var(--color-text)]" /> Summarize
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content className="rounded-xl bg-[var(--color-surface)] p-2 text-xs text-[var(--color-text)]">Generate on the fly</Tooltip.Content>
          </Tooltip>
          <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" size="sm" onPress={() => onOpen?.(item)}>
            Open <ArrowRightIcon className="ml-2 h-4 w-4 text-[var(--color-text)]" />
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
