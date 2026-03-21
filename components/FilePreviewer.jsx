
        import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, Button } from "@heroui/react";
        export default function FilePreviewer({ raw, processed, onOpenRaw, onOpenProcessed, onDownload }) {
  const [tab, setTab] = useState('raw');
        return (
            <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
    <CardBody className="p-4">
    <Tabs selectedKey={tab} onSelectionChange={setTab} classNames={{ tabList: "bg-[var(--color-background)]/50 rounded-xl p-1", cursor: "bg-[var(--color-primary)] rounded-lg", tab: "rounded-lg text-[var(--color-text)]" }}>
    <Tab key="raw" title="Raw">
    <div className="rounded-xl border border-[var(--color-border)] p-3">
    <pre className="text-[var(--color-text)] text-xs whitespace-pre-wrap">{raw || "No raw content"}</pre>
    </div>
    </Tab>
    <Tab key="processed" title="Processed">
    <div className="rounded-xl border border-[var(--color-border)] p-3">
    <pre className="text-[var(--color-text)] text-xs whitespace-pre-wrap">{processed || "No processed content"}</pre>
    </div>
    </Tab>
    </Tabs>
    <div className="flex gap-2 mt-3">
    <Button size="sm" variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]" onPress={onOpenRaw}>Open raw</Button>
    <Button size="sm" variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]" onPress={onOpenProcessed}>Open processed</Button>
    <Button size="sm" className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={onDownload}>Download</Button>
    </div>
    </CardBody>
    </Card>
        );
        }
