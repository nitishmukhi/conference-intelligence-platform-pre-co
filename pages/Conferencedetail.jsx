import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon, SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge, Breadcrumbs, Button, Card, Chip, Tabs, Tooltip } from "@heroui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { LabeledSearchInput, LabeledSelect } from "../components/heroui-helpers";

export default function Conferencedetail() {
  const { id: confId } = useParams();
  const [tab, setTab] = React.useState("overview");
  const [q, setQ] = React.useState("");
  const [ctype, setCtype] = React.useState("");
  const [active, setActive] = React.useState([]);
  const apply = () => {
    const next = [];
    if (q) next.push(`q:${q}`);
    if (ctype) next.push(`type:${ctype}`);
    setActive(next);
  };
  const clear = () => {
    setQ("");
    setCtype("");
    setActive([]);
  };
  const remove = (f) => setActive((prev) => prev.filter((x) => x !== f));

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Content className="flex flex-col gap-4 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Link to="/conferences">
                    <Button className="rounded-xl text-[var(--color-text)]" size="sm" variant="ghost">
                      <ArrowLeftIcon className="mr-2 h-4 w-4 text-[var(--color-text)]" />
                      Back
                    </Button>
                  </Link>
                  <Breadcrumbs>
                    <Breadcrumbs.Item className="text-[var(--color-text)]">Conferences</Breadcrumbs.Item>
                    <Breadcrumbs.Item className="text-[var(--color-text)]">{confId}</Breadcrumbs.Item>
                  </Breadcrumbs>
                </div>
                <Link to={`/conferences/${confId}/reports`}>
                  <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">Open Reports</Button>
                </Link>
              </div>
              <Tabs selectedKey={tab} onSelectionChange={setTab}>
                <Tabs.ListContainer className="rounded-xl bg-[var(--color-background)]/50 p-1">
                  <Tabs.List className="flex gap-1">
                    <Tabs.Tab id="overview" className="rounded-lg px-4 py-2 text-[var(--color-text)]">
                      Overview
                    </Tabs.Tab>
                    <Tabs.Tab id="content" className="rounded-lg px-4 py-2 text-[var(--color-text)]">
                      Content
                    </Tabs.Tab>
                    <Tabs.Tab id="summary" className="rounded-lg px-4 py-2 text-[var(--color-text)]">
                      Summary
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Indicator className="rounded-lg bg-[var(--color-primary)]" />
                </Tabs.ListContainer>
                <Tabs.Panel id="overview" className="hidden" />
                <Tabs.Panel id="content" className="hidden" />
                <Tabs.Panel id="summary" className="hidden" />
              </Tabs>
            </Card.Content>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 md:col-span-2">
            <Card.Header className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Metadata</h3>
            </Card.Header>
            <Card.Content className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
              {[
                { label: "Year", value: "2026" },
                { label: "Location", value: "San Francisco" },
                { label: "Website", value: "exampleconf.com" },
                { label: "Items", value: "412" },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]/60 p-3">
                  <span className="text-sm text-[var(--color-text)] opacity-80">{m.label}</span>
                  <Chip className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{m.value}</Chip>
                </div>
              ))}
            </Card.Content>
          </Card>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Status</h3>
            </Card.Header>
            <Card.Content className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)]">Indexing</span>
                <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)]">Summaries</span>
                <Badge className="rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-text)]">Ready</Badge>
              </div>
            </Card.Content>
          </Card>
        </section>

        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Content className="flex flex-col gap-3 p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <LabeledSearchInput
                  ariaLabel="Search in conference"
                  placeholder="Search talks, speakers, docs..."
                  value={q}
                  onValueChange={setQ}
                  icon={MagnifyingGlassIcon}
                />
                <LabeledSelect label="Content Type" selectedKey={ctype} onSelectionChange={setCtype} options={["Talk", "Paper", "Slide Deck", "Video"]} />
                <div className="flex items-center gap-2">
                  <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={apply}>
                    Search
                  </Button>
                  <Button className="rounded-xl text-[var(--color-text)]" variant="ghost" onPress={clear}>
                    Clear
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {active.map((f) => (
                  <Chip key={f} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">
                    <span className="flex items-center gap-1">
                      {f}
                      <button type="button" className="inline-flex rounded p-0.5 hover:bg-[var(--color-primary)]/20" aria-label={`Remove ${f}`} onClick={() => remove(f)}>
                        <XMarkIcon className="h-4 w-4 text-[var(--color-text)]" />
                      </button>
                    </span>
                  </Chip>
                ))}
              </div>
            </Card.Content>
          </Card>
        </section>

        <section>
          <div className="flex flex-col gap-3">
            {[
              { id: "i1", title: "Keynote: The Future of AI", tags: ["Talk", "Video"], conf: "AI Summit 2026" },
              { id: "i2", title: "Paper: Efficient Transformers", tags: ["Paper", "PDF"], conf: "AI Summit 2026" },
              { id: "i3", title: "Slides: Cloud-native ML", tags: ["Slide Deck"], conf: "CloudNext Europe" },
            ].map((item) => (
              <Card key={item.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
                <Card.Content className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[var(--color-text)]">{item.title}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <Badge key={t} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Tooltip>
                      <Tooltip.Trigger>
                        <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" size="sm" variant="outline">
                          <SparklesIcon className="mr-1 h-4 w-4 text-[var(--color-text)]" /> Summarize
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content className="rounded-xl bg-[var(--color-surface)] p-2 text-xs text-[var(--color-text)]">Generate on the fly</Tooltip.Content>
                    </Tooltip>
                    <Link to={`/conferences/xyz/item/${item.id}`}>
                      <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" size="sm">
                        Open <ArrowRightIcon className="ml-2 h-4 w-4 text-[var(--color-text)]" />
                      </Button>
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Executive Summary</h3>
              <Chip className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">Updated 2h ago</Chip>
            </Card.Header>
            <Card.Content className="space-y-3 p-4">
              <p className="text-sm text-[var(--color-text)]">
                Top themes: multimodal reasoning, energy-efficient training, guardrails in production. Competitors doubled their focus on agent frameworks and RAG
                tooling. Market tone: steady growth with emphasis on ROI and safety.
              </p>
              <div>
                <Link to={`/conferences/${confId}/reports`}>
                  <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">View full report</Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        </section>
      </div>
    </div>
  );
}
