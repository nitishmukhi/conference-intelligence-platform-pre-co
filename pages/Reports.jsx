import { ArrowDownTrayIcon, ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Badge, Breadcrumbs, Button, Card, Chip, ListBox, ListBoxItem, Switch, SwitchControl, SwitchThumb, Table, Tooltip } from "@heroui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { HeroTable, UiProgress } from "../components/heroui-helpers";

export default function Reports() {
  const { id: confId } = useParams();
  const [autoUpload, setAutoUpload] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Content className="flex items-center justify-between p-4">
              <Breadcrumbs>
                <Breadcrumbs.Item className="text-[var(--color-text)]">Conferences</Breadcrumbs.Item>
                <Breadcrumbs.Item className="text-[var(--color-text)]">{confId}</Breadcrumbs.Item>
                <Breadcrumbs.Item className="text-[var(--color-text)]">Reports</Breadcrumbs.Item>
              </Breadcrumbs>
              <Link to={`/conferences/${confId}`}>
                <Button className="rounded-xl text-[var(--color-text)]" size="sm" variant="ghost">
                  <ArrowLeftIcon className="mr-2 h-4 w-4 text-[var(--color-text)]" />
                  Back
                </Button>
              </Link>
            </Card.Content>
          </Card>
        </section>

        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Executive Summary</h3>
              <Chip className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">Stable</Chip>
            </Card.Header>
            <Card.Content className="space-y-3 p-4">
              <p className="text-sm text-[var(--color-text)]">
                Overall, the conference emphasizes pragmatic AI adoption with guardrails, agentic workflows, and performance per watt. Tooling consolidates around vector
                databases and orchestration frameworks.
              </p>
              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <Tooltip.Trigger>
                    <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">Regenerate</Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content className="rounded-xl bg-[var(--color-surface)] p-2 text-xs text-[var(--color-text)]">
                    Re-run the generation with latest data
                  </Tooltip.Content>
                </Tooltip>
                <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" variant="outline">
                  Download PDF
                </Button>
                <Button className="rounded-xl text-[var(--color-text)]" variant="ghost">
                  Download Markdown
                </Button>
              </div>
            </Card.Content>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Theme Highlights</h3>
            </Card.Header>
            <Card.Content className="p-2">
              <ListBox aria-label="Themes" selectionMode="none" className="max-h-none border-0 p-0 shadow-none">
                {[
                  { id: "t1", title: "Agent frameworks", tags: ["RAG", "Tools"] },
                  { id: "t2", title: "Safety & governance", tags: ["Policies", "Eval"] },
                  { id: "t3", title: "Energy efficiency", tags: ["Hardware", "Sustainability"] },
                ].map((t) => (
                  <ListBoxItem key={t.id} id={t.id} textValue={t.title} className="rounded-xl px-3 py-3 text-[var(--color-text)]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-[var(--color-text)]">{t.title}</span>
                      <div className="flex gap-2">
                        {t.tags.map((tag) => (
                          <Chip key={tag} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">
                            {tag}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </ListBoxItem>
                ))}
              </ListBox>
            </Card.Content>
          </Card>

          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Competitor Highlights</h3>
            </Card.Header>
            <Card.Content className="p-0">
              <HeroTable ariaLabel="Competitors table" className="bg-transparent">
                <Table.Header>
                  <Table.Column className="text-[var(--color-text)]">COMPETITOR</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">FOCUS</Table.Column>
                </Table.Header>
                <Table.Body>
                  {[
                    { id: "c1", name: "Acme AI", focus: ["Agents", "MLOps"] },
                    { id: "c2", name: "Beta Cloud", focus: ["RAG", "Search"] },
                  ].map((c) => (
                    <Table.Row key={c.id} id={c.id}>
                      <Table.Cell className="text-[var(--color-text)]">{c.name}</Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2">
                          {c.focus.map((f) => (
                            <Chip key={f} className="rounded-xl bg-[var(--color-secondary)]/20 text-[var(--color-text)]">
                              {f}
                            </Chip>
                          ))}
                        </div>
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
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Export & Cloud Sync</h3>
              <span className="inline-flex items-center gap-2">
                <Switch isSelected={autoUpload} onChange={setAutoUpload} size="sm">
                  <SwitchControl>
                    <SwitchThumb />
                  </SwitchControl>
                </Switch>
                <span className="text-sm text-[var(--color-text)]">Auto-upload</span>
              </span>
            </Card.Header>
            <Card.Content className="space-y-4 p-4">
              <div className="flex flex-wrap gap-2">
                <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={() => setProgress(100)}>
                  Export PDF
                </Button>
                <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" variant="outline">
                  Export Markdown
                </Button>
              </div>
              <div>
                <p className="mb-2 text-sm text-[var(--color-text)]">Upload progress</p>
                <UiProgress value={progress} />
              </div>
            </Card.Content>
          </Card>
        </section>

        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Generated Files</h3>
            </Card.Header>
            <Card.Content className="p-0">
              <HeroTable ariaLabel="Outputs table" className="bg-transparent">
                <Table.Header>
                  <Table.Column className="text-[var(--color-text)]">FILE</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">TYPE</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">STATUS</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">ACTIONS</Table.Column>
                </Table.Header>
                <Table.Body>
                  {[
                    { id: "f1", name: "Executive_Summary.pdf", type: "PDF", status: "Ready" },
                    { id: "f2", name: "Highlights.md", type: "Markdown", status: "Ready" },
                  ].map((f) => (
                    <Table.Row key={f.id} id={f.id}>
                      <Table.Cell className="text-[var(--color-text)]">{f.name}</Table.Cell>
                      <Table.Cell className="text-[var(--color-text)]">{f.type}</Table.Cell>
                      <Table.Cell>
                        <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{f.status}</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2">
                          <Link to="#">
                            <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" size="sm">
                              Open <ArrowRightIcon className="ml-2 h-4 w-4 text-[var(--color-text)]" />
                            </Button>
                          </Link>
                          <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" size="sm" variant="outline">
                            <ArrowDownTrayIcon className="mr-2 h-4 w-4 text-[var(--color-text)]" />
                            Download
                          </Button>
                          <Button className="rounded-xl text-[var(--color-text)]" size="sm" variant="ghost">
                            <TrashIcon className="mr-2 h-4 w-4 text-[var(--color-text)]" />
                            Delete
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </HeroTable>
            </Card.Content>
          </Card>
        </section>
      </div>
    </div>
  );
}
