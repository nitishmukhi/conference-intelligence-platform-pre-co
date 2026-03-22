import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Accordion, Badge, Breadcrumbs, Button, Card, Chip, Label, Table, Tabs, TextArea, TextField } from "@heroui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { HeroTable } from "../components/heroui-helpers";

export default function Itemdetail() {
  const { id: confId, item_id: itemId } = useParams();
  const [tab, setTab] = React.useState("raw");
  const [summary, setSummary] = React.useState("Concise summary of the item will appear here...");
  const regenerate = () => {};
  const copyToClipboard = async () => {
    try {
      if (typeof window !== "undefined" && window.navigator?.clipboard) {
        await window.navigator.clipboard.writeText(summary);
      }
    } catch (e) {
      /* ignore */
    }
  };
  const download = () => {
    if (typeof window === "undefined") return;
    const blob = new window.Blob([summary], { type: "text/markdown" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.md";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Content className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Link to="/conferences/xyz">
                  <Button className="rounded-xl text-[var(--color-text)]" size="sm" variant="ghost">
                    <ArrowLeftIcon className="mr-2 h-4 w-4 text-[var(--color-text)]" />
                    Back
                  </Button>
                </Link>
                <Breadcrumbs>
                  <Breadcrumbs.Item className="text-[var(--color-text)]">Conferences</Breadcrumbs.Item>
                  <Breadcrumbs.Item className="text-[var(--color-text)]">{confId}</Breadcrumbs.Item>
                  <Breadcrumbs.Item className="text-[var(--color-text)]">Item {itemId}</Breadcrumbs.Item>
                </Breadcrumbs>
              </div>
              <div className="flex items-center gap-2">
                <Chip className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">Talk</Chip>
                <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" variant="outline">
                  <ArrowTopRightOnSquareIcon className="mr-2 h-4 w-4 text-[var(--color-text)]" /> Open source
                </Button>
              </div>
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
                { label: "Speaker", value: "Alex Doe" },
                { label: "Duration", value: "45m" },
                { label: "Track", value: "NLP" },
                { label: "Published", value: "2026-05-01" },
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
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Citations</h3>
            </Card.Header>
            <Card.Content className="space-y-2 p-4">
              <Badge className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">5 references</Badge>
            </Card.Content>
          </Card>
        </section>

        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Files</h3>
              <div className="flex items-center gap-2">
                <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" size="sm" variant="outline">
                  Open raw
                </Button>
                <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" size="sm">
                  Download
                </Button>
              </div>
            </Card.Header>
            <Card.Content className="p-4">
              <Tabs selectedKey={tab} onSelectionChange={setTab}>
                <Tabs.ListContainer className="rounded-xl bg-[var(--color-background)]/50 p-1">
                  <Tabs.List className="flex gap-1">
                    <Tabs.Tab id="raw" className="rounded-lg px-4 py-2 text-[var(--color-text)]">
                      Raw
                    </Tabs.Tab>
                    <Tabs.Tab id="processed" className="rounded-lg px-4 py-2 text-[var(--color-text)]">
                      Processed
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Indicator className="rounded-lg bg-[var(--color-primary)]" />
                </Tabs.ListContainer>
                <Tabs.Panel id="raw" className="mt-4">
                  <div className="rounded-xl border border-[var(--color-border)] p-3">
                    <p className="text-sm text-[var(--color-text)]">Raw content placeholder...</p>
                  </div>
                </Tabs.Panel>
                <Tabs.Panel id="processed" className="mt-4">
                  <div className="rounded-xl border border-[var(--color-border)] p-3">
                    <p className="text-sm text-[var(--color-text)]">Processed content placeholder...</p>
                  </div>
                </Tabs.Panel>
              </Tabs>
            </Card.Content>
          </Card>
        </section>

        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Citations</h3>
            </Card.Header>
            <Card.Content className="p-0">
              <HeroTable ariaLabel="Citations table" className="bg-transparent">
                <Table.Header>
                  <Table.Column className="text-[var(--color-text)]">TITLE</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">SOURCE</Table.Column>
                </Table.Header>
                <Table.Body>
                  {[
                    { id: "c1", title: "Transformer Efficiency", url: "https://arxiv.org/abs/xyz" },
                    { id: "c2", title: "Multimodal Benchmarks", url: "https://arxiv.org/abs/abc" },
                  ].map((c) => (
                    <Table.Row key={c.id} id={c.id}>
                      <Table.Cell className="text-[var(--color-text)]">{c.title}</Table.Cell>
                      <Table.Cell>
                        <a href={c.url} target="_blank" rel="noreferrer" className="text-[var(--color-primary)] underline">
                          {c.url}
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </HeroTable>
            </Card.Content>
          </Card>
        </section>

        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">AI Summary</h3>
              <Badge className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">Citations included</Badge>
            </Card.Header>
            <Card.Content className="space-y-4 p-4">
              <TextField className="w-full">
                <Label className="mb-1 text-[var(--color-text)]">Generated summary</Label>
                <TextArea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="min-h-[140px] w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 text-[var(--color-text)] placeholder:text-[var(--color-text)]/60"
                />
              </TextField>
              <div className="flex flex-wrap gap-2">
                <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={regenerate}>
                  Regenerate
                </Button>
                <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" variant="outline" onPress={copyToClipboard}>
                  Copy
                </Button>
                <Button className="rounded-xl text-[var(--color-text)]" variant="ghost" onPress={download}>
                  Download
                </Button>
              </div>
              <Accordion>
                <Accordion.Item id="trace" className="text-[var(--color-text)]">
                  <Accordion.Heading>
                    <Accordion.Trigger className="w-full text-left">Generation trace</Accordion.Trigger>
                    <Accordion.Indicator />
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>
                      <p className="text-sm text-[var(--color-text)]">1) Retrieved 12 context items. 2) Drafted summary. 3) Inserted citations.</p>
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
