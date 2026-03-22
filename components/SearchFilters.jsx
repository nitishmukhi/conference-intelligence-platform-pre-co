import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Button, Card, Chip } from "@heroui/react";
import { LabeledSearchInput, LabeledSelect } from "./heroui-helpers";

export default function SearchFilters({ onSearchChange, onFilterChange, onClear }) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("");
  const [applied, setApplied] = useState([]);
  const topics = ["AI", "Cloud", "Security", "BioTech"];

  return (
    <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
      <Card.Content className="flex flex-col gap-3 p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <LabeledSearchInput
            ariaLabel="Search"
            placeholder="Search..."
            value={search}
            onValueChange={(v) => {
              setSearch(v);
              onSearchChange?.(v);
            }}
            icon={MagnifyingGlassIcon}
          />
          <LabeledSelect
            label="Topic"
            selectedKey={topic}
            onSelectionChange={(val) => {
              setTopic(val);
              onFilterChange?.(val);
            }}
            options={topics}
          />
          <div className="flex items-center gap-2">
            <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={() => setApplied([search, topic].filter(Boolean))}>
              Apply
            </Button>
            <Button
              className="rounded-xl text-[var(--color-text)]"
              variant="ghost"
              onPress={() => {
                setSearch("");
                setTopic("");
                setApplied([]);
                onClear?.();
              }}
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {applied.map((f) => (
            <Chip key={f} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">
              <span className="flex items-center gap-1">
                {f}
                <button
                  type="button"
                  className="inline-flex rounded p-0.5 hover:bg-[var(--color-primary)]/20"
                  aria-label={`Remove ${f}`}
                  onClick={() => setApplied((prev) => prev.filter((x) => x !== f))}
                >
                  <XMarkIcon className="h-4 w-4 text-[var(--color-text)]" />
                </button>
              </span>
            </Chip>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
