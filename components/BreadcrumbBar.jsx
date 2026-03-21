
        import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
        export default function BreadcrumbBar({ items }) {
        return (
            <Breadcrumbs>
    {items.map((it, idx) => (
    <BreadcrumbItem key={idx} className="text-[var(--color-text)]">{it}</BreadcrumbItem>
    ))}
    </Breadcrumbs>
        );
        }
