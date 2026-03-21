import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Accordion, AccordionItem, Badge, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Chip, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, Textarea } from "@heroui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Itemdetail() {
    const { id: confId, item_id: itemId } = useParams();
    const [tab, setTab] = React.useState('raw');
    const [summary, setSummary] = React.useState("Concise summary of the item will appear here...");
    const regenerate = () => {};
    const copyToClipboard = async () => { try { if (typeof window !== 'undefined' && window.navigator?.clipboard) { await window.navigator.clipboard.writeText(summary); } } catch(e) {} };
    const download = () => { if (typeof window === 'undefined') return; const blob = new window.Blob([summary], {type: 'text/markdown'}); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'summary.md'; document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(url); };
  return (
   <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardBody className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
      <Link to="/conferences/xyz">
      <Button size="sm" variant="light" className="rounded-xl text-[var(--color-text)]"><ArrowLeftIcon className="w-4 h-4 mr-2 text-[var(--color-text)]" />Back</Button>
      </Link>
      <Breadcrumbs>
      <BreadcrumbItem className="text-[var(--color-text)]">Conferences</BreadcrumbItem>
      <BreadcrumbItem className="text-[var(--color-text)]">{confId}</BreadcrumbItem>
      <BreadcrumbItem className="text-[var(--color-text)]">Item {itemId}</BreadcrumbItem>
      </Breadcrumbs>
      </div>
      <div className="flex items-center gap-2">
      <Chip className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">Talk</Chip>
      <Button variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]">
      <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2 text-[var(--color-text)]" /> Open source
      </Button>
      </div>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)] md:col-span-2">
      <CardHeader className="p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Metadata</h3>
      </CardHeader>
      <CardBody className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
      { label: 'Speaker', value: 'Alex Doe' },
      { label: 'Duration', value: '45m' },
      { label: 'Track', value: 'NLP' },
      { label: 'Published', value: '2026-05-01' }
      ].map((m) => (
      <div key={m.label} className="flex items-center justify-between rounded-xl bg-[var(--color-background)]/60 border border-[var(--color-border)] p-3">
      <span className="text-[var(--color-text)] text-sm opacity-80">{m.label}</span>
      <Chip className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{m.value}</Chip>
      </div>
      ))}
      </CardBody>
      </Card>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Citations</h3>
      </CardHeader>
      <CardBody className="p-4 space-y-2">
      <Badge className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">5 references</Badge>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4 flex items-center justify-between">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Files</h3>
      <div className="flex items-center gap-2">
      <Button size="sm" variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]">Open raw</Button>
      <Button size="sm" className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">Download</Button>
      </div>
      </CardHeader>
      <CardBody className="p-4">
      <Tabs selectedKey={tab} onSelectionChange={setTab} classNames={{ tabList: "bg-[var(--color-background)]/50 rounded-xl p-1", cursor: "bg-[var(--color-primary)] rounded-lg", tab: "rounded-lg text-[var(--color-text)]" }}>
      <Tab key="raw" title="Raw">
      <div className="rounded-xl border border-[var(--color-border)] p-3">
      <p className="text-[var(--color-text)] text-sm">Raw content placeholder...</p>
      </div>
      </Tab>
      <Tab key="processed" title="Processed">
      <div className="rounded-xl border border-[var(--color-border)] p-3">
      <p className="text-[var(--color-text)] text-sm">Processed content placeholder...</p>
      </div>
      </Tab>
      </Tabs>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Citations</h3>
      </CardHeader>
      <CardBody className="p-0">
      <Table aria-label="Citations table" className="bg-transparent">
      <TableHeader>
      <TableColumn className="text-[var(--color-text)]">TITLE</TableColumn>
      <TableColumn className="text-[var(--color-text)]">SOURCE</TableColumn>
      </TableHeader>
      <TableBody>
      {[
      { id: 'c1', title: 'Transformer Efficiency', url: 'https://arxiv.org/abs/xyz' },
      { id: 'c2', title: 'Multimodal Benchmarks', url: 'https://arxiv.org/abs/abc' }
      ].map((c) => (
      <TableRow key={c.id}>
      <TableCell className="text-[var(--color-text)]">{c.title}</TableCell>
      <TableCell>
      <a href={c.url} target="_blank" rel="noreferrer" className="text-[var(--color-primary)] underline">{c.url}</a>
      </TableCell>
      </TableRow>
      ))}
      </TableBody>
      </Table>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4 flex items-center justify-between">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">AI Summary</h3>
      <Badge className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">Citations included</Badge>
      </CardHeader>
      <CardBody className="p-4 space-y-4">
      <Textarea label="Generated summary" labelPlacement="outside" minRows={6} value={summary} onValueChange={setSummary}
      classNames={{ inputWrapper: "bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl", input: "text-[var(--color-text)] placeholder:text-[var(--color-text)]/60", label: "text-[var(--color-text)]" }} />
      <div className="flex flex-wrap gap-2">
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={regenerate}>Regenerate</Button>
      <Button variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]" onPress={copyToClipboard}>Copy</Button>
      <Button variant="light" className="rounded-xl text-[var(--color-text)]" onPress={download}>Download</Button>
      </div>
      <Accordion>
      <AccordionItem key="trace" title="Generation trace" className="text-[var(--color-text)]">
      <p className="text-[var(--color-text)] text-sm">1) Retrieved 12 context items. 2) Drafted summary. 3) Inserted citations.</p>
      </AccordionItem>
      </Accordion>
      </CardBody>
      </Card>
      </section>
      </div>
    </div>
  );
}
