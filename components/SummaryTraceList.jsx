
        import React from "react";
import { Accordion, AccordionItem, Badge } from "@heroui/react";
        export default function SummaryTraceList({ items }) {
        return (
            <Accordion>
    {(items || []).map((step, idx) => (
    <AccordionItem key={idx+1} title={`Step ${idx+1}: ${step.title}`} className="text-[var(--color-text)]">
    <div className="flex items-center justify-between mb-2">
    <span className="text-[var(--color-text)] text-sm opacity-80">{step.detail}</span>
    {step.status && <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{step.status}</Badge>}
    </div>
    {step.notes && <p className="text-[var(--color-text)] text-sm">{step.notes}</p>}
    </AccordionItem>
    ))}
    </Accordion>
        );
        }
