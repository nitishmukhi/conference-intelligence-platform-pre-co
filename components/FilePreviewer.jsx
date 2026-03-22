import React, { useState } from "react";
import { Button, Card, Tabs } from "@heroui/react";

export default function FilePreviewer({ raw, processed, onOpenRaw, onOpenProcessed, onDownload }) {
  const [tab, setTab] = useState("raw");

  return (
    <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
      <Card.Content className="p-4">
        <Tabs selectedKey={tab} onSelectionChange={setTab}>
          <Tabs.ListContainer className="rounded-xl bg-[var(--color-background)]/50 p-1">
            <Tabs.List className="flex gap-1">
              <Tabs.Tab id="raw" className="rounded-lg px-4 py-2 text-[var(--color-text)]">
                Raw
              </Tabs.Tab>
              <Tabs.Tab id="processed" className="rounded-lg px-4 py-2 text-[var(--color-text)]">
                Processed
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Indicator className="rounded-lg bg-[var(--color-primary)]" />
          </Tabs.ListContainer>
          <Tabs.Panel id="raw" className="mt-3">
            <div className="rounded-xl border border-[var(--color-border)] p-3">
              <pre className="whitespace-pre-wrap text-xs text-[var(--color-text)]">{raw || "No raw content"}</pre>
            </div>
          </Tabs.Panel>
          <Tabs.Panel id="processed" className="mt-3">
            <div className="rounded-xl border border-[var(--color-border)] p-3">
              <pre className="whitespace-pre-wrap text-xs text-[var(--color-text)]">{processed || "No processed content"}</pre>
            </div>
          </Tabs.Panel>
        </Tabs>
        <div className="mt-3 flex gap-2">
          <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" size="sm" variant="outline" onPress={onOpenRaw}>
            Open raw
          </Button>
          <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" size="sm" variant="outline" onPress={onOpenProcessed}>
            Open processed
          </Button>
          <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" size="sm" onPress={onDownload}>
            Download
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
