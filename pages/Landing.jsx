import { ArrowRightIcon, FireIcon, StarIcon } from "@heroicons/react/24/outline";
import { Accordion, AccordionItem, Badge, Button, Card, CardBody, CardHeader, Chip, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    const [open, setOpen] = React.useState(false);
    const [openConnect, setOpenConnect] = React.useState(false);
    const [source, setSource] = React.useState("");
    const [url, setUrl] = React.useState("");
    const handleIngest = () => {
      setOpen(false);
    };
  return (
   <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          <section className="w-full rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-8 md:p-12 shadow-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
      <Chip variant="flat" className="rounded-full bg-[var(--color-background)]/20 text-[var(--color-text)] w-fit">AI-powered insights</Chip>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">Conference Intelligence Platform</h1>
      <p className="text-[var(--color-text)]/90 text-base md:text-lg">Ingest conference sites, search across sessions, and generate executive-ready summaries in seconds. Stay ahead with structured highlights, citations, and export-ready reports.</p>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <Link to="/conferences">
      <Button size="md" className="rounded-xl bg-[var(--color-background)] text-[var(--color-primary)] font-semibold px-6 h-11 hover:opacity-90 transition-all">
      Browse conferences
      <ArrowRightIcon className="w-4 h-4 ml-2 text-[var(--color-primary)]" />
      </Button>
      </Link>
      <Link to="/conferences">
      <Button size="md" variant="bordered" className="rounded-xl border-[var(--color-text)] text-[var(--color-text)] font-semibold px-6 h-11 hover:bg-[var(--color-background)]/10 transition-colors">View latest reports</Button>
      </Link>
      </div>
      <div className="flex gap-2 pt-2">
      <Chip className="rounded-xl bg-[var(--color-accent)]/20 text-[var(--color-text)]">Citations</Chip>
      <Chip className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">Traceability</Chip>
      <Chip className="rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-text)]">Exports</Chip>
      </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
      {[
      "https://pixabay.com/get/g7de026f8a69afc16365586f2bf9f8bf195234081706c8bb27600b12f7618ab5ac681054a1997605e2a046d15029b3bd1120e60e1226eca98136e7692e89c5875_640.jpg",
      "https://pixabay.com/get/gf1eb74ff43deb39e7779d5ff9e86ac409b198bd7a47c887d9516708d751cdf0076551286e79d62a220ec9e41027fef7d_640.jpg",
      "https://pixabay.com/get/gd4ed6a826403ce7eb47ee4f4cfa62d40e1b29922d5687446cbe0baab8df3f75f9947f8a6afe97c046c293684d2bba849_640.jpg",
      "https://pixabay.com/get/gfe6359f5549d9cc15b2af17cec4e2865970cf2ba6f35023f63234d182e923b8ae328a73a6e1f6e85475ef219b43aaecd_640.jpg",
      "https://pixabay.com/get/g48459b3e4cbcbe10c226533b3c7c1c5336f2e259f7bd21219b8434d1b1d212c2ff31103252d724e5afd06a796730d0c215028d9fc28c10f52d26bd23665310f8_640.jpg",
      "https://pixabay.com/get/g3aac0f9acdc2276b7701d7697f1e2db7310cefc1ebd4667199149396035860478be1abd99d12c87a04bf81bf46f20e16_640.jpg"
      ].map((src, idx) => (
      <Card key={idx} className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)]/30">
      <CardBody className="p-0">
      <Image removeWrapper alt={`conference-${idx}`} src={src} className="w-full h-28 md:h-32 object-cover" />
      </CardBody>
      </Card>
      ))}
      </div>
      </div>
      </section>
  <section>
      {[
      { title: "Conferences Ingested", value: 128, progress: 72, icon: <FireIcon className="w-5 h-5 text-[var(--color-accent)]" />, badge: "+6 today" },
      { title: "Items Processed", value: 4563, progress: 58, icon: <StarIcon className="w-5 h-5 text-[var(--color-secondary)]" />, badge: "+120" },
      { title: "Summaries Generated", value: 982, progress: 81, icon: <StarIcon className="w-5 h-5 text-[var(--color-primary)]" />, badge: "98% success" }
      ].map((stat, idx) => (
      <Card key={idx} className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)] hover:shadow-primary transition-shadow">
      <CardHeader className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">{stat.icon}</div>
      <h3 className="text-[var(--color-text)] font-semibold text-base">{stat.title}</h3>
      </div>
      <Badge className="bg-[var(--color-primary)]/10 text-[var(--color-text)] rounded-xl">{stat.badge}</Badge>
      </CardHeader>
      <CardBody className="px-4 pb-4">
      <p className="text-2xl font-extrabold text-[var(--color-text)]">{stat.value.toLocaleString()}</p>
      <Progress value={stat.progress} aria-label={`${stat.title} progress`} className="mt-3" classNames={{ indicator: "bg-[var(--color-primary)]", track: "bg-[var(--color-border)]" }} />
      </CardBody>
      </Card>
      ))}
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="flex items-center justify-between p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Recent Conferences</h3>
      <Link to="/conferences">
      <Button size="sm" variant="light" className="rounded-xl text-[var(--color-primary)]">View all</Button>
      </Link>
      </CardHeader>
      <CardBody className="p-0">
      <Table aria-label="Recent conferences table" className="bg-transparent">
      <TableHeader>
      <TableColumn className="text-[var(--color-text)]">NAME</TableColumn>
      <TableColumn className="text-[var(--color-text)]">TOPICS</TableColumn>
      <TableColumn className="text-[var(--color-text)]">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
      {[
      { id: "c1", name: "AI Summit 2026", topics: ["NLP", "Vision"], href: "/conferences/ai-summit" },
      { id: "c2", name: "CloudNext Europe", topics: ["Kubernetes", "DevOps"], href: "/conferences/cloudnext" },
      { id: "c3", name: "BioTech World", topics: ["Genomics", "ML"], href: "/conferences/biotech" }
      ].map((row) => (
      <TableRow key={row.id}>
      <TableCell className="text-[var(--color-text)]">{row.name}</TableCell>
      <TableCell>
      <div className="flex gap-2">
      {row.topics.map((t) => (
      <Chip key={t} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{t}</Chip>
      ))}
      </div>
      </TableCell>
      <TableCell>
      <Link to={row.href}>
      <Button size="sm" className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">
      View
      <ArrowRightIcon className="w-4 h-4 ml-2 text-[var(--color-text)]" />
      </Button>
      </Link>
      </TableCell>
      </TableRow>
      ))}
      </TableBody>
      </Table>
      </CardBody>
      </Card>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)] lg:col-span-2">
      <CardHeader className="p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Quick Actions</h3>
      </CardHeader>
      <CardBody className="p-4 flex flex-wrap gap-3">
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={() => setOpen(true)}>Start ingestion</Button>
      <Button variant="bordered" className="rounded-xl border-[var(--color-border)] text-[var(--color-text)]" onPress={() => setOpenConnect(true)}>Connect OAuth</Button>
      </CardBody>
      </Card>

      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Status</h3>
      </CardHeader>
      <CardBody className="p-4">
      <p className="text-[var(--color-text)] text-sm">All systems operational.</p>
      <p className="text-[var(--color-text)] text-sm opacity-80">Your last sync completed 12m ago.</p>
      </CardBody>
      </Card>

      {/* Ingestion modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} classNames={{ base: "bg-[var(--color-background)] text-[var(--color-text)] rounded-2xl", backdrop: "bg-[var(--color-background)]/50" }}>
      <ModalContent>
      <ModalHeader className="text-[var(--color-text)]">Start ingestion</ModalHeader>
      <ModalBody>
      <Select label="Source" labelPlacement="outside" selectedKeys={source ? [source] : []} onSelectionChange={(keys)=> setSource(Array.from(keys)[0] || "")}
      classNames={{ trigger: "h-11 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl", popoverContent: "bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl", label: "text-[var(--color-text)]" }}>
      <SelectItem key="website">Website</SelectItem>
      <SelectItem key="sitemap">Sitemap.xml</SelectItem>
      <SelectItem key="rss">RSS Feed</SelectItem>
      </Select>
      <Input label="URL" labelPlacement="outside" placeholder="https://exampleconf.com" value={url} onValueChange={setUrl}
      classNames={{ inputWrapper: "h-11 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl", input: "text-[var(--color-text)] placeholder:text-[var(--color-text)]/60", label: "text-[var(--color-text)]" }} />
      </ModalBody>
      <ModalFooter>
      <Button variant="light" className="rounded-xl text-[var(--color-text)]" onPress={()=> setOpen(false)}>Cancel</Button>
      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={handleIngest}>Start</Button>
      </ModalFooter>
      </ModalContent>
      </Modal>

      {/* Connect modal */}
      <Modal isOpen={openConnect} onClose={() => setOpenConnect(false)} classNames={{ base: "bg-[var(--color-background)] text-[var(--color-text)] rounded-2xl", backdrop: "bg-[var(--color-background)]/50" }}>
      <ModalContent>
      <ModalHeader className="text-[var(--color-text)]">Connect account</ModalHeader>
      <ModalBody>
      <p className="text-[var(--color-text)] text-sm">Connect with Google Drive or Notion to auto-sync exports.</p>
      </ModalBody>
      <ModalFooter>
      <Button variant="light" className="rounded-xl text-[var(--color-text)]" onPress={()=> setOpenConnect(false)}>Close</Button>
      <Button className="rounded-xl bg-[var(--color-secondary)] text-[var(--color-text)]">Connect</Button>
      </ModalFooter>
      </ModalContent>
      </Modal>
      </section>
  <section>
      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4 flex items-center justify-between">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Processing Queue</h3>
      <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">3 active</Badge>
      </CardHeader>
      <CardBody className="p-4 space-y-4">
      {[
      { id: 1, name: "AI Summit 2026", progress: 64 },
      { id: 2, name: "CloudNext Europe", progress: 38 },
      { id: 3, name: "BioTech World", progress: 82 }
      ].map(item => (
      <div key={item.id}>
      <div className="flex items-center justify-between mb-1">
      <p className="text-[var(--color-text)] text-sm font-medium">{item.name}</p>
      <p className="text-[var(--color-text)] text-xs opacity-80">{item.progress}%</p>
      </div>
      <Progress value={item.progress} classNames={{ indicator: "bg-[var(--color-primary)]", track: "bg-[var(--color-border)]" }} />
      </div>
      ))}
      </CardBody>
      </Card>

      <Card className="rounded-2xl bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
      <CardHeader className="p-4">
      <h3 className="text-[var(--color-text)] text-lg font-semibold">Recent Sync Logs</h3>
      </CardHeader>
      <CardBody className="p-4">
      <Accordion>
      <AccordionItem key="1" aria-label="Log 1" title="AI Summit 2026" className="text-[var(--color-text)]">
      <p className="text-[var(--color-text)] text-sm">Crawled 124 pages. Extracted 412 items. Generated 89 summaries with 100% citation coverage.</p>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Log 2" title="CloudNext Europe" className="text-[var(--color-text)]">
      <p className="text-[var(--color-text)] text-sm">Crawled 78 pages. Extracted 210 items. Generated 55 summaries.</p>
      </AccordionItem>
      </Accordion>
      </CardBody>
      </Card>
      </section>
      </div>
    </div>
  );
}
