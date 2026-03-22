import { ArrowRightIcon, FireIcon, StarIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Input,
  Label,
  Modal,
  Table,
  TextField,
} from "@heroui/react";
import React from "react";
import { Link } from "react-router-dom";
import { HeroTable, LabeledSelect, UiProgress } from "../components/heroui-helpers";

const imgs = [
  "https://pixabay.com/get/g7de026f8a69afc16365586f2bf9f8bf195234081706c8bb27600b12f7618ab5ac681054a1997605e2a046d15029b3bd1120e60e1226eca98136e7692e89c5875_640.jpg",
  "https://pixabay.com/get/gf1eb74ff43deb39e7779d5ff9e86ac409b198bd7a47c887d9516708d751cdf0076551286e79d62a220ec9e41027fef7d_640.jpg",
  "https://pixabay.com/get/gd4ed6a826403ce7eb47ee4f4cfa62d40e1b29922d5687446cbe0baab8df3f75f9947f8a6afe97c046c293684d2bba849_640.jpg",
  "https://pixabay.com/get/gfe6359f5549d9cc15b2af17cec4e2865970cf2ba6f35023f63234d182e923b8ae328a73a6e1f6e85475ef219b43aaecd_640.jpg",
  "https://pixabay.com/get/g48459b3e4cbcbe10c226533b3c7c1c5336f2e259f7bd21219b8434d1b1d212c2ff31103252d724e5afd06a796730d0c215028d9fc28c10f52d26bd23665310f8_640.jpg",
  "https://pixabay.com/get/g3aac0f9acdc2276b7701d7697f1e2db7310cefc1ebd4667199149396035860478be1abd99d12c87a04bf81bf46f20e16_640.jpg",
];

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
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="w-full rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-8 shadow-primary md:p-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="inline-flex w-fit rounded-full bg-[var(--color-background)]/20 px-3 py-1 text-sm text-[var(--color-text)]">
                AI-powered insights
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] md:text-5xl">
                Conference Intelligence Platform
              </h1>
              <p className="text-base text-[var(--color-text)]/90 md:text-lg">
                Ingest conference sites, search across sessions, and generate executive-ready summaries in seconds. Stay ahead with structured highlights,
                citations, and export-ready reports.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link to="/conferences">
                  <Button className="h-11 rounded-xl bg-[var(--color-background)] px-6 font-semibold text-[var(--color-primary)] transition-all hover:opacity-90">
                    Browse conferences
                    <ArrowRightIcon className="ml-2 h-4 w-4 text-[var(--color-primary)]" />
                  </Button>
                </Link>
                <Link to="/conferences">
                  <Button className="h-11 rounded-xl border border-[var(--color-text)] px-6 font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-background)]/10" variant="outline">
                    View latest reports
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-xl bg-[var(--color-accent)]/20 px-3 py-1 text-sm text-[var(--color-text)]">Citations</span>
                <span className="rounded-xl bg-[var(--color-secondary)]/20 px-3 py-1 text-sm text-[var(--color-text)]">Traceability</span>
                <span className="rounded-xl bg-[var(--color-primary)]/20 px-3 py-1 text-sm text-[var(--color-text)]">Exports</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {imgs.map((src, idx) => (
                <Card key={idx} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)]/30">
                  <Card.Content className="p-0">
                    <img alt={`conference-${idx}`} src={src} className="h-28 w-full object-cover md:h-32" />
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Conferences Ingested", value: 128, progress: 72, icon: <FireIcon className="h-5 w-5 text-[var(--color-accent)]" />, badge: "+6 today" },
            { title: "Items Processed", value: 4563, progress: 58, icon: <StarIcon className="h-5 w-5 text-[var(--color-secondary)]" />, badge: "+120" },
            { title: "Summaries Generated", value: 982, progress: 81, icon: <StarIcon className="h-5 w-5 text-[var(--color-primary)]" />, badge: "98% success" },
          ].map((stat, idx) => (
            <Card key={idx} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 transition-shadow hover:shadow-primary">
              <Card.Header className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-2">{stat.icon}</div>
                  <h3 className="text-base font-semibold text-[var(--color-text)]">{stat.title}</h3>
                </div>
                <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{stat.badge}</Badge>
              </Card.Header>
              <Card.Content className="px-4 pb-4">
                <p className="text-2xl font-extrabold text-[var(--color-text)]">{stat.value.toLocaleString()}</p>
                <UiProgress value={stat.progress} className="mt-3" />
              </Card.Content>
            </Card>
          ))}
        </section>

        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Recent Conferences</h3>
              <Link to="/conferences">
                <Button className="rounded-xl text-[var(--color-primary)]" variant="ghost" size="sm">
                  View all
                </Button>
              </Link>
            </Card.Header>
            <Card.Content className="p-0">
              <HeroTable ariaLabel="Recent conferences table" className="bg-transparent">
                <Table.Header>
                  <Table.Column className="text-[var(--color-text)]">NAME</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">TOPICS</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">ACTIONS</Table.Column>
                </Table.Header>
                <Table.Body>
                  {[
                    { id: "c1", name: "AI Summit 2026", topics: ["NLP", "Vision"], href: "/conferences/ai-summit" },
                    { id: "c2", name: "CloudNext Europe", topics: ["Kubernetes", "DevOps"], href: "/conferences/cloudnext" },
                    { id: "c3", name: "BioTech World", topics: ["Genomics", "ML"], href: "/conferences/biotech" },
                  ].map((row) => (
                    <Table.Row key={row.id} id={row.id}>
                      <Table.Cell className="text-[var(--color-text)]">{row.name}</Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2">
                          {row.topics.map((t) => (
                            <span key={t} className="rounded-xl bg-[var(--color-primary)]/10 px-2 py-0.5 text-sm text-[var(--color-text)]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={row.href}>
                          <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" size="sm">
                            View
                            <ArrowRightIcon className="ml-2 h-4 w-4 text-[var(--color-text)]" />
                          </Button>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </HeroTable>
            </Card.Content>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 lg:col-span-2">
            <Card.Header className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Quick Actions</h3>
            </Card.Header>
            <Card.Content className="flex flex-wrap gap-3 p-4">
              <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={() => setOpen(true)}>
                Start ingestion
              </Button>
              <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" variant="outline" onPress={() => setOpenConnect(true)}>
                Connect OAuth
              </Button>
            </Card.Content>
          </Card>

          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Status</h3>
            </Card.Header>
            <Card.Content className="p-4">
              <p className="text-sm text-[var(--color-text)]">All systems operational.</p>
              <p className="text-sm text-[var(--color-text)] opacity-80">Your last sync completed 12m ago.</p>
            </Card.Content>
          </Card>
        </section>

        <Modal isOpen={open} onOpenChange={setOpen}>
          <Modal.Backdrop className="bg-[var(--color-background)]/50" />
          <Modal.Container placement="center" className="max-w-lg">
            <Modal.Dialog className="rounded-2xl bg-[var(--color-background)] p-6 text-[var(--color-text)]">
              <Modal.Header>
                <Modal.Heading>Start ingestion</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="flex flex-col gap-4">
                <LabeledSelect label="Source" selectedKey={source} onSelectionChange={setSource} options={["website", "sitemap", "rss"]} />
                <TextField className="w-full">
                  <Label className="mb-1 text-[var(--color-text)]">URL</Label>
                  <Input
                    placeholder="https://exampleconf.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-[var(--color-text)] placeholder:text-[var(--color-text)]/60"
                  />
                </TextField>
              </Modal.Body>
              <Modal.Footer className="flex justify-end gap-2 pt-4">
                <Button className="rounded-xl text-[var(--color-text)]" variant="ghost" onPress={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={handleIngest}>
                  Start
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal>

        <Modal isOpen={openConnect} onOpenChange={setOpenConnect}>
          <Modal.Backdrop className="bg-[var(--color-background)]/50" />
          <Modal.Container placement="center" className="max-w-md">
            <Modal.Dialog className="rounded-2xl bg-[var(--color-background)] p-6 text-[var(--color-text)]">
              <Modal.Header>
                <Modal.Heading>Connect account</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-[var(--color-text)]">Connect with Google Drive or Notion to auto-sync exports.</p>
              </Modal.Body>
              <Modal.Footer className="flex justify-end gap-2 pt-4">
                <Button className="rounded-xl text-[var(--color-text)]" variant="ghost" onPress={() => setOpenConnect(false)}>
                  Close
                </Button>
                <Button className="rounded-xl bg-[var(--color-secondary)] text-[var(--color-text)]">Connect</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Processing Queue</h3>
              <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">3 active</Badge>
            </Card.Header>
            <Card.Content className="space-y-4 p-4">
              {[
                { id: 1, name: "AI Summit 2026", progress: 64 },
                { id: 2, name: "CloudNext Europe", progress: 38 },
                { id: 3, name: "BioTech World", progress: 82 },
              ].map((item) => (
                <div key={item.id}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--color-text)]">{item.name}</p>
                    <p className="text-xs text-[var(--color-text)] opacity-80">{item.progress}%</p>
                  </div>
                  <UiProgress value={item.progress} />
                </div>
              ))}
            </Card.Content>
          </Card>

          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Recent Sync Logs</h3>
            </Card.Header>
            <Card.Content className="p-4">
              <Accordion>
                <Accordion.Item id="log-1" className="text-[var(--color-text)]">
                  <Accordion.Heading>
                    <Accordion.Trigger className="w-full text-left">AI Summit 2026</Accordion.Trigger>
                    <Accordion.Indicator />
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>
                      <p className="text-sm text-[var(--color-text)]">
                        Crawled 124 pages. Extracted 412 items. Generated 89 summaries with 100% citation coverage.
                      </p>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item id="log-2" className="text-[var(--color-text)]">
                  <Accordion.Heading>
                    <Accordion.Trigger className="w-full text-left">CloudNext Europe</Accordion.Trigger>
                    <Accordion.Indicator />
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>
                      <p className="text-sm text-[var(--color-text)]">Crawled 78 pages. Extracted 210 items. Generated 55 summaries.</p>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Card.Content>
          </Card>
        </section>
      </div>
    </div>
  );
}
