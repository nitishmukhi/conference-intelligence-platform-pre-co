import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon, SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Chip, Input, Select, SelectItem, Tab, Tabs, Tooltip } from "@heroui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Conferencedetail() {
    const { id: confId } = useParams();
    const [tab, setTab] = React.useState('overview');
    const [q, setQ] = React.useState("");
    const [ctype, setCtype] = React.useState("");
    const [active, setActive] = React.useState([]);
    const apply = () => { const next = []; if(q) next.push(`q:${q}`); if(ctype) next.push(`type:${ctype}`); setActive(next); };
    const clear = () => { setQ(""); setCtype(""); setActive([]); };
    const remove = (f) => setActive(prev => prev.filter(x => x !== f));
  return (
   <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardBody className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
      <Link to="/conferences">
      <Button size="sm" variant="light" className="rounded-xl text-[var(--color-text)]"><ArrowLeftIcon className="w-4 h-4 mr-2 text-[var(--color-text)]" />Back</Button>
      </Link>
      <Breadcrumbs>
      <BreadcrumbItem className="text-[var(--color-text)]">Conferences</BreadcrumbItem>
      <BreadcrumbItem className="text-[var(--color-text)]">{confId}</BreadcrumbItem>
      </Breadcrumbs>
      </div>
      <Link to={`/conferences/${confId}/reports`}>
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">Open Reports</Button>
      </Link>
      </div>
      <Tabs classNames={{ tabList: "bg-[var(--color-background)]/50 rounded-xl p-1", cursor: "bg-[var(--color-primary)] rounded-lg", tab: "rounded-lg text-[var(--color-text)]" }} selectedKey={tab} onSelectionChange={setTab}>
      <Tab key="overview" title="Overview" />
      <Tab key="content" title="Content" />
      <Tab key="summary" title="Summary" />
      </Tabs>
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
      { label: 'Year', value: '2026' },
      { label: 'Location', value: 'San Francisco' },
      { label: 'Website', value: 'exampleconf.com' },
      { label: 'Items', value: '412' }
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
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Status</h3>
      </CardHeader>
      <CardBody className="p-4 space-y-3">
      <div className="flex items-center justify-between">
      <span className="text-[var(--color-text)]">Indexing</span>
      <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">Complete</Badge>
      </div>
      <div className="flex items-center justify-between">
      <span className="text-[var(--color-text)]">Summaries</span>
      <Badge className="rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-text)]">Ready</Badge>
      </div>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardBody className="p-4 flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <Input aria-label="Search in conference" placeholder="Search talks, speakers, docs..." value={q} onValueChange={setQ}
      classNames={{ inputWrapper: "h-11 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl", input: "text-[var(--color-text)] placeholder:text-[var(--color-text)]/60" }}
      startContent={<MagnifyingGlassIcon className="w-4 h-4 text-[var(--color-text)]" />}
      />
      <Select label="Content Type" labelPlacement="outside" selectedKeys={ctype ? [ctype] : []} onSelectionChange={(keys)=> setCtype(Array.from(keys)[0] || "")}
      classNames={{ trigger: "h-11 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl", popoverContent: "bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl", label: "text-[var(--color-text)]" }}>
      {['Talk','Paper','Slide Deck','Video'].map(t => (<SelectItem key={t}>{t}</SelectItem>))}
      </Select>
      <div className="flex items-center gap-2">
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={apply}>Search</Button>
      <Button variant="light" className="rounded-xl text-[var(--color-text)]" onPress={clear}>Clear</Button>
      </div>
      </div>
      <div className="flex flex-wrap gap-2">
      {active.map((f) => (
      <Chip key={f} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]" endContent={<XMarkIcon className="w-4 h-4 text-[var(--color-text)] cursor-pointer" onClick={()=>remove(f)} />}>{f}</Chip>
      ))}
      </div>
      </CardBody>
      </Card>
      </section>
  <section>
      <div className="flex flex-col gap-3">
      {[
      { id: 'i1', title: 'Keynote: The Future of AI', tags: ['Talk','Video'], conf: 'AI Summit 2026' },
      { id: 'i2', title: 'Paper: Efficient Transformers', tags: ['Paper','PDF'], conf: 'AI Summit 2026' },
      { id: 'i3', title: 'Slides: Cloud-native ML', tags: ['Slide Deck'], conf: 'CloudNext Europe' }
      ].map((item) => (
      <Card key={item.id} className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardBody className="p-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
      <p className="text-[var(--color-text)] font-semibold truncate">{item.title}</p>
      <div className="flex flex-wrap gap-2 mt-1">
      {item.tags.map((t) => (
      <Badge key={t} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{t}</Badge>
      ))}
      </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
      <Tooltip content={<span className="text-[var(--color-text)] text-xs">Generate on the fly</span>} className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl">
      <Button size="sm" variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]">
      <SparklesIcon className="w-4 h-4 mr-1 text-[var(--color-text)]" /> Summarize
      </Button>
      </Tooltip>
      <Link to={`/conferences/xyz/item/${item.id}`}>
      <Button size="sm" className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">
      Open <ArrowRightIcon className="w-4 h-4 ml-2 text-[var(--color-text)]" />
      </Button>
      </Link>
      </div>
      </CardBody>
      </Card>
      ))}
      </div>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4 flex items-center justify-between">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Executive Summary</h3>
      <Chip className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">Updated 2h ago</Chip>
      </CardHeader>
      <CardBody className="p-4 space-y-3">
      <p className="text-[var(--color-text)] text-sm">Top themes: multimodal reasoning, energy-efficient training, guardrails in production. Competitors doubled their focus on agent frameworks and RAG tooling. Market tone: steady growth with emphasis on ROI and safety.</p>
      <div>
      <Link to={`/conferences/${confId}/reports`}>
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">View full report</Button>
      </Link>
      </div>
      </CardBody>
      </Card>
      </section>
      </div>
    </div>
  );
}
