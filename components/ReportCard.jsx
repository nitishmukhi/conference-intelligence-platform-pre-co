
        import React from "react";
import { Card, CardHeader, CardBody, Chip, Button } from "@heroui/react";
        export default function ReportCard({ title, status, excerpt, onOpen }) {
        return (
            <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
    <CardHeader className="p-4 flex items-center justify-between">
    <h4 className="text-[var(--color-text)] font-semibold">{title}</h4>
    {status && <Chip className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">{status}</Chip>}
    </CardHeader>
    <CardBody className="p-4 space-y-3">
    {excerpt && <p className="text-[var(--color-text)] text-sm">{excerpt}</p>}
    <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={onOpen}>Open</Button>
    </CardBody>
    </Card>
        );
        }
