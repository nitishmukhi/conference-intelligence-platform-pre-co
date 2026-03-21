
        import React from "react";
import { Badge, Tooltip } from "@heroui/react";
        export default function CitationBadge({ label, href, title }) {
        return (
            <Tooltip content={<span className="text-[var(--color-text)] text-xs">{title}</span>} className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl">
    <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">
    <a href={href} target="_blank" rel="noreferrer" className="text-[var(--color-primary)] underline">{label}</a>
    </Badge>
    </Tooltip>
        );
        }
