import React from "react";
import { Button, Card } from "@heroui/react";

export default function EmptyState({ title, description, actionLabel, onPrimary }) {
  return (
    <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 text-center">
      <Card.Content className="space-y-3 p-8">
        <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>
        {description ? <p className="text-sm text-[var(--color-text)]/80">{description}</p> : null}
        {actionLabel ? (
          <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={onPrimary}>
            {actionLabel}
          </Button>
        ) : null}
      </Card.Content>
    </Card>
  );
}
