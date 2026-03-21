
        import React from "react";
import { Card, CardBody, Button, Badge, Tooltip } from "@heroui/react";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
        export default function ResultListItem({ item, onOpen, onSummarize }) {
        return (
            <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
    <CardBody className="p-4 flex items-center justify-between gap-4">
    <div className="min-w-0">
    <p className="text-[var(--color-text)] font-semibold truncate">{item?.title || "Untitled"}</p>
    <div className="flex flex-wrap gap-2 mt-1">
    {(item?.tags || []).map((t) => (
    <Badge key={t} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{t}</Badge>
    ))}
    </div>
    </div>
    <div className="flex items-center gap-2 shrink-0">
    <Tooltip content={<span className="text-[var(--color-text)] text-xs">Generate on the fly</span>} className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl">
    <Button size="sm" variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]" onPress={()=> onSummarize && onSummarize(item)}>
    <SparklesIcon className="w-4 h-4 mr-1 text-[var(--color-text)]" /> Summarize
    </Button>
    </Tooltip>
    <Button size="sm" className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={()=> onOpen && onOpen(item)}>
    Open <ArrowRightIcon className="w-4 h-4 ml-2 text-[var(--color-text)]" />
    </Button>
    </div>
    </CardBody>
    </Card>
        );
        }
