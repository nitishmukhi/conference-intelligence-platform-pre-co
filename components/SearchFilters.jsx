
        import React, { useState } from "react";
import { Input, Select, SelectItem, Chip, Button, Card, CardBody } from "@heroui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
        export default function SearchFilters({ onSearchChange, onFilterChange, onClear }) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("");
  const [applied, setApplied] = useState([]);
  const topics = ["AI","Cloud","Security","BioTech"];
        return (
            <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
    <CardBody className="p-4 flex flex-col gap-3">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    <Input aria-label="Search" placeholder="Search..." value={search} onValueChange={(v)=>{ setSearch(v); onSearchChange && onSearchChange(v); }}
    classNames={{ inputWrapper: "h-11 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl", input: "text-[var(--color-text)] placeholder:text-[var(--color-text)]/60" }}
    startContent={<MagnifyingGlassIcon className="w-4 h-4 text-[var(--color-text)]" />}
    />
    <Select label="Topic" labelPlacement="outside" selectedKeys={topic ? [topic] : []} onSelectionChange={(keys)=>{ const val = Array.from(keys)[0] || ""; setTopic(val); onFilterChange && onFilterChange(val); }}
    classNames={{ trigger: "h-11 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl", popoverContent: "bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl", label: "text-[var(--color-text)]" }}>
    {topics.map(t => (<SelectItem key={t}>{t}</SelectItem>))}
    </Select>
    <div className="flex items-center gap-2">
    <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={()=> setApplied([search, topic].filter(Boolean))}>Apply</Button>
    <Button variant="light" className="rounded-xl text-[var(--color-text)]" onPress={()=>{ setSearch(""); setTopic(""); setApplied([]); onClear && onClear(); }}>Clear</Button>
    </div>
    </div>
    <div className="flex flex-wrap gap-2">
    {applied.map((f) => (
    <Chip key={f} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]" endContent={<XMarkIcon className="w-4 h-4 text-[var(--color-text)] cursor-pointer" onClick={()=> setApplied(prev => prev.filter(x => x !== f))} />}>{f}</Chip>
    ))}
    </div>
    </CardBody>
    </Card>
        );
        }
