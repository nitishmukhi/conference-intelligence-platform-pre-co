
        import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
        export default function EmptyState({ title, description, actionLabel, onPrimary }) {
        return (
            <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)] text-center">
    <CardBody className="p-8 space-y-3">
    <h3 className="text-[var(--color-text)] text-lg font-semibold">{title}</h3>
    {description && <p className="text-[var(--color-text)]/80 text-sm">{description}</p>}
    {actionLabel && <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={onPrimary}>{actionLabel}</Button>}
    </CardBody>
    </Card>
        );
        }
