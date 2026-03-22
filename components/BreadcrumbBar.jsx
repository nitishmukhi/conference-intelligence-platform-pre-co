import React from "react";
import { Breadcrumbs } from "@heroui/react";

export default function BreadcrumbBar({ items }) {
  return (
    <Breadcrumbs>
      {items.map((it, idx) => (
        <Breadcrumbs.Item key={idx} className="text-[var(--color-text)]">
          {it}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  );
}
