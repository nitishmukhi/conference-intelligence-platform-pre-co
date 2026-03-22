import React from "react";
import { Button, Card, Chip } from "@heroui/react";

export default function ReportCard({ title, status, excerpt, onOpen }) {
  return (
    <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
      <Card.Header className="flex items-center justify-between p-4">
        <h4 className="font-semibold text-[var(--color-text)]">{title}</h4>
        {status ? <Chip className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">{status}</Chip> : null}
      </Card.Header>
      <Card.Content className="space-y-3 p-4">
        {excerpt ? <p className="text-sm text-[var(--color-text)]">{excerpt}</p> : null}
        <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={onOpen}>
          Open
        </Button>
      </Card.Content>
    </Card>
  );
}
