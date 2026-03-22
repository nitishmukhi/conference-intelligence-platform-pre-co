import { ArrowRightIcon, MagnifyingGlassIcon, PlayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge, Button, Card, Chip, Switch, SwitchControl, SwitchThumb, Table, Tooltip } from "@heroui/react";
import React from "react";
import { Link } from "react-router-dom";
import { HeroTable, LabeledSearchInput, LabeledSelect, PagePagination } from "../components/heroui-helpers";

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
  const clearFilters = () => {
    setQuery("");
    setTopic("");
    setFilters([]);
  };
  const removeFilter = (f) => setFilters((prev) => prev.filter((x) => x !== f));
  const [page, setPage] = React.useState(1);
  const [autoSync, setAutoSync] = React.useState(true);

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Content className="flex flex-col gap-3 p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <LabeledSearchInput
                  ariaLabel="Search conferences"
                  placeholder="Search conferences..."
                  value={query}
                  onValueChange={setQuery}
                  icon={MagnifyingGlassIcon}
                />
                <LabeledSelect label="Topic" selectedKey={topic} onSelectionChange={setTopic} options={["AI", "Cloud", "BioTech", "Security"]} />
                <div className="flex items-center gap-2">
                  <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" onPress={applyFilters}>
                    Apply
                  </Button>
                  <Button className="rounded-xl text-[var(--color-text)]" variant="ghost" onPress={clearFilters}>
                    Clear
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <Chip key={f} className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">
                    <span className="flex items-center gap-1">
                      {f}
                      <button type="button" className="inline-flex rounded p-0.5 hover:bg-[var(--color-primary)]/20" aria-label={`Remove ${f}`} onClick={() => removeFilter(f)}>
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
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">All Conferences</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[var(--color-text)]/80">Page {page} of 10</span>
              </div>
            </Card.Header>
            <Card.Content className="p-0">
              <HeroTable ariaLabel="Conferences table" className="bg-transparent">
                <Table.Header>
                  <Table.Column className="text-[var(--color-text)]">NAME</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">YEAR</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">STATUS</Table.Column>
                  <Table.Column className="text-[var(--color-text)]">ACTIONS</Table.Column>
                </Table.Header>
                <Table.Body>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const id = `conf-${(page - 1) * 8 + i + 1}`;
                    const name = `Conference ${id.toUpperCase()}`;
                    const status = i % 2 === 0 ? "Indexed" : "Queued";
                    return (
                      <Table.Row key={id} id={id}>
                        <Table.Cell className="text-[var(--color-text)]">{name}</Table.Cell>
                        <Table.Cell className="text-[var(--color-text)]">2026</Table.Cell>
                        <Table.Cell>
                          <Badge className="rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-text)]">{status}</Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/conferences/${id}`}>
                            <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]" size="sm">
                              Open
                              <ArrowRightIcon className="ml-2 h-4 w-4 text-[var(--color-text)]" />
                            </Button>
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </HeroTable>
              <div className="flex items-center justify-center py-4">
                <PagePagination page={page} totalPages={10} onPageChange={setPage} className="text-[var(--color-text)]" />
              </div>
            </Card.Content>
          </Card>
        </section>

        <section>
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <Card.Header className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Ingestion Controls</h3>
              <Tooltip>
                <Tooltip.Trigger>
                  <span className="inline-flex cursor-default items-center gap-2">
                    <Switch isSelected={autoSync} onChange={setAutoSync} size="sm">
                      <SwitchControl>
                        <SwitchThumb />
                      </SwitchControl>
                    </Switch>
                    <span className="text-sm text-[var(--color-text)]">Auto-sync</span>
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content className="max-w-xs rounded-xl bg-[var(--color-surface)] p-2 text-xs text-[var(--color-text)]">
                  When enabled, new conferences are auto-indexed daily.
                </Tooltip.Content>
              </Tooltip>
            </Card.Header>
            <Card.Content className="flex flex-wrap gap-3 p-4">
              <Button className="rounded-xl bg-[var(--color-primary)] text-[var(--color-text)]">
                <PlayIcon className="mr-2 h-4 w-4 text-[var(--color-text)]" /> Start crawl
              </Button>
              <Button className="rounded-xl border border-[var(--color-border)] text-[var(--color-text)]" variant="outline">
                Run full re-index
              </Button>
            </Card.Content>
          </Card>
        </section>
      </div>
    </div>
  );
}
