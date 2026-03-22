import React from "react";
import { Accordion, Badge } from "@heroui/react";

export default function SummaryTraceList({ items }) {
  return (
    <Accordion>
      {(items || []).map((step, idx) => (
        <Accordion.Item key={idx} id={`step-${idx}`} className="text-[var(--color-text)]">
          <Accordion.Heading>
            <Accordion.Trigger className="w-full text-left">
              Step {idx + 1}: {step.title}
            </Accordion.Trigger>
            <Accordion.Indicator />
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-[var(--color-text)] opacity-80">{step.detail}</span>
                {step.status ? <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{step.status}</Badge> : null}
              </div>
              {step.notes ? <p className="text-sm text-[var(--color-text)]">{step.notes}</p> : null}
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
