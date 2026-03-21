import { ArrowRightIcon, MagnifyingGlassIcon, PlayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge, Button, Card, CardBody, CardHeader, Chip, Input, Pagination, Select, SelectItem, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@heroui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Conferences() {
    const [query, setQuery] = React.useState("");
    const [topic, setTopic] = React.useState("");
    const [filters, setFilters] = React.useState([]);
    const applyFilters = () => {
      const next = [];
      if (query) next.push(`q:${query}`);
      if (topic) next.push(`topic:${topic}`);
      setFilters(next);
    };
    const clearFilters = () => { setQuery(""); setTopic(""); setFilters([]); };
    const removeFilter = (f) => setFilters(prev => prev.filter(x => x !== f));
    const [page, setPage] = React.useState(1);
    const [autoSync, setAutoSync] = React.useState(true);
  return (
   <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardBody className="p-4 flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <Input
      aria-label="Search conferences"
      placeholder="Search conferences..."
      value={query}
      onValueChange={setQuery}
      classNames={{ inputWrapper: "h-11 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl", input: "text-[var(--color-text)] placeholder:text-[var(--color-text)]/60" }}
      startContent={<MagnifyingGlassIcon className="w-4 h-4 text-[var(--color-text)]" />}
      />
      <Select label="Topic" labelPlacement="outside" selectedKeys={topic ? [topic] : []} onSelectionChange={(keys)=> setTopic(Array.from(keys)[0] || "")}
      classNames={{ trigger: "h-11 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl", popoverContent: "bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl", label: "text-[var(--color-text)]" }}>
      {['AI','Cloud','BioTech','Security'].map(t => (<SelectItem key={t}>{t}</SelectItem>))}
      </Select>
      <div className="flex items-center gap-2">
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={applyFilters}>Apply</Button>
      <Button variant="light" className="rounded-xl text-[var(--color-text)]" onPress={clearFilters}>Clear</Button>
      </div>
      </div>
      <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
      <Chip key={f} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]" endContent={<XMarkIcon className="w-4 h-4 text-[var(--color-text)] cursor-pointer" onClick={()=> removeFilter(f)} />}>{f}</Chip>
      ))}
      </div>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4 flex items-center justify-between">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">All Conferences</h3>
      <div className="flex items-center gap-2 text-sm">
      <span className="text-[var(--color-text)]/80">Page {page} of 10</span>
      </div>
      </CardHeader>
      <CardBody className="p-0">
      <Table aria-label="Conferences table" className="bg-transparent">
      <TableHeader>
      <TableColumn className="text-[var(--color-text)]">NAME</TableColumn>
      <TableColumn className="text-[var(--color-text)]">YEAR</TableColumn>
      <TableColumn className="text-[var(--color-text)]">STATUS</TableColumn>
      <TableColumn className="text-[var(--color-text)]">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
      {Array.from({length: 8}).map((_, i) => {
      const id = `conf-${(page-1)*8 + i + 1}`;
      const name = `Conference ${id.toUpperCase()}`;
      const status = i % 2 === 0 ? 'Indexed' : 'Queued';
      return (
      <TableRow key={id}>
      <TableCell className="text-[var(--color-text)]">{name}</TableCell>
      <TableCell className="text-[var(--color-text)]">2026</TableCell>
      <TableCell>
      <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{status}</Badge>
      </TableCell>
      <TableCell>
      <Link to={`/conferences/${id}`}>
      <Button size="sm" className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">
      Open
      <ArrowRightIcon className="w-4 h-4 ml-2 text-[var(--color-text)]" />
      </Button>
      </Link>
      </TableCell>
      </TableRow>
      );
      })}
      </TableBody>
      </Table>
      <div className="flex items-center justify-center py-4">
      <Pagination total={10} page={page} onChange={setPage} className="text-[var(--color-text)]" />
      </div>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4 flex items-center justify-between">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Ingestion Controls</h3>
      <Tooltip content={<span className="text-[var(--color-text)] text-xs">When enabled, new conferences are auto-indexed daily.</span>} className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl">
      <Switch isSelected={autoSync} onValueChange={setAutoSync} size="sm"> <span className="text-[var(--color-text)] text-sm ml-2">Auto-sync</span> </Switch>
      </Tooltip>
      </CardHeader>
      <CardBody className="p-4 flex flex-wrap gap-3">
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">
      <PlayIcon className="w-4 h-4 mr-2 text-[var(--color-text)]" /> Start crawl
      </Button>
      <Button variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]">Run full re-index</Button>
      </CardBody>
      </Card>
      </section>
      </div>
    </div>
  );
}
