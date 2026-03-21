import { ArrowDownTrayIcon, ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Badge, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Chip, Listbox, ListboxItem, Progress, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@heroui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Reports() {
    const { id: confId } = useParams();
    const [autoUpload, setAutoUpload] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
  return (
   <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardBody className="p-4 flex items-center justify-between">
      <Breadcrumbs>
      <BreadcrumbItem className="text-[var(--color-text)]">Conferences</BreadcrumbItem>
      <BreadcrumbItem className="text-[var(--color-text)]">{confId}</BreadcrumbItem>
      <BreadcrumbItem className="text-[var(--color-text)]">Reports</BreadcrumbItem>
      </Breadcrumbs>
      <Link to={`/conferences/${confId}`}>
      <Button size="sm" variant="light" className="rounded-xl text-[var(--color-text)]"><ArrowLeftIcon className="w-4 h-4 mr-2 text-[var(--color-text)]" />Back</Button>
      </Link>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4 flex items-center justify-between">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Executive Summary</h3>
      <Chip className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">Stable</Chip>
      </CardHeader>
      <CardBody className="p-4 space-y-3">
      <p className="text-[var(--color-text)] text-sm">Overall, the conference emphasizes pragmatic AI adoption with guardrails, agentic workflows, and performance per watt. Tooling consolidates around vector databases and orchestration frameworks.</p>
      <div className="flex flex-wrap gap-2">
      <Tooltip content={<span className="text-[var(--color-text)] text-xs">Re-run the generation with latest data</span>} className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl">
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">Regenerate</Button>
      </Tooltip>
      <Button variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]">Download PDF</Button>
      <Button variant="light" className="rounded-xl text-[var(--color-text)]">Download Markdown</Button>
      </div>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Theme Highlights</h3>
      </CardHeader>
      <CardBody className="p-2">
      <Listbox aria-label="Themes">
      {[
      { id:'t1', title:'Agent frameworks', tags:['RAG','Tools'] },
      { id:'t2', title:'Safety & governance', tags:['Policies','Eval'] },
      { id:'t3', title:'Energy efficiency', tags:['Hardware','Sustainability'] }
      ].map((t)=> (
      <ListboxItem key={t.id} textValue={t.title} className="text-[var(--color-text)]">
      <div className="flex items-center justify-between gap-2">
      <span className="text-[var(--color-text)] text-sm font-medium">{t.title}</span>
      <div className="flex gap-2">
      {t.tags.map(tag => <Chip key={tag} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{tag}</Chip>)}
      </div>
      </div>
      </ListboxItem>
      ))}
      </Listbox>
      </CardBody>
      </Card>

      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Competitor Highlights</h3>
      </CardHeader>
      <CardBody className="p-0">
      <Table aria-label="Competitors table" className="bg-transparent">
      <TableHeader>
      <TableColumn className="text-[var(--color-text)]">COMPETITOR</TableColumn>
      <TableColumn className="text-[var(--color-text)]">FOCUS</TableColumn>
      </TableHeader>
      <TableBody>
      {[
      { id:'c1', name:'Acme AI', focus:['Agents','MLOps'] },
      { id:'c2', name:'Beta Cloud', focus:['RAG','Search'] }
      ].map((c) => (
      <TableRow key={c.id}>
      <TableCell className="text-[var(--color-text)]">{c.name}</TableCell>
      <TableCell>
      <div className="flex gap-2">
      {c.focus.map(f => <Chip key={f} className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">{f}</Chip>)}
      </div>
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
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Export & Cloud Sync</h3>
      <Switch isSelected={autoUpload} onValueChange={setAutoUpload} size="sm"> <span className="text-[var(--color-text)] text-sm ml-2">Auto-upload</span> </Switch>
      </CardHeader>
      <CardBody className="p-4 space-y-4">
      <div className="flex flex-wrap gap-2">
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={()=> setProgress(100)}>Export PDF</Button>
      <Button variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]">Export Markdown</Button>
      </div>
      <div>
      <p className="text-[var(--color-text)] text-sm mb-2">Upload progress</p>
      <Progress value={progress} classNames={{ indicator: "bg-[var(--color-primary)]", track: "bg-[var(--color-border)]" }} />
      </div>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Generated Files</h3>
      </CardHeader>
      <CardBody className="p-0">
      <Table aria-label="Outputs table" className="bg-transparent">
      <TableHeader>
      <TableColumn className="text-[var(--color-text)]">FILE</TableColumn>
      <TableColumn className="text-[var(--color-text)]">TYPE</TableColumn>
      <TableColumn className="text-[var(--color-text)]">STATUS</TableColumn>
      <TableColumn className="text-[var(--color-text)]">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
      {[
      { id:'f1', name:'Executive_Summary.pdf', type:'PDF', status:'Ready' },
      { id:'f2', name:'Highlights.md', type:'Markdown', status:'Ready' }
      ].map((f) => (
      <TableRow key={f.id}>
      <TableCell className="text-[var(--color-text)]">{f.name}</TableCell>
      <TableCell className="text-[var(--color-text)]">{f.type}</TableCell>
      <TableCell>
      <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{f.status}</Badge>
      </TableCell>
      <TableCell>
      <div className="flex gap-2">
      <Link to="#">
      <Button size="sm" className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">Open <ArrowRightIcon className="w-4 h-4 ml-2 text-[var(--color-text)]" /></Button>
      </Link>
      <Button size="sm" variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]"><ArrowDownTrayIcon className="w-4 h-4 mr-2 text-[var(--color-text)]" />Download</Button>
      <Button size="sm" variant="light" className="rounded-xl text-[var(--color-text)]"><TrashIcon className="w-4 h-4 mr-2 text-[var(--color-text)]" />Delete</Button>
      </div>
      </TableCell>
      </TableRow>
      ))}
      </TableBody>
      </Table>
      </CardBody>
      </Card>
      </section>
      </div>
    </div>
  );
}
