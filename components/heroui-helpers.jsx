import {
  InputGroup,
  InputGroupInput,
  InputGroupPrefix,
  Label,
  ListBox,
  ListBoxItem,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  ProgressBar,
  ProgressBarFill,
  ProgressBarTrack,
  Select,
  Table,
} from "@heroui/react";

export function HeroTable({ ariaLabel, className = "", children }) {
  return (
    <Table.Root className={className}>
      <Table.ScrollContainer>
        <Table.Content aria-label={ariaLabel}>{children}</Table.Content>
      </Table.ScrollContainer>
    </Table.Root>
  );
}

export function LabeledSearchInput({ ariaLabel, placeholder, value, onValueChange, icon: Icon }) {
  return (
    <InputGroup className="input-focus-primary h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-2">
      {Icon ? (
        <InputGroupPrefix className="text-[var(--color-text)]">
          <Icon className="h-4 w-4" />
        </InputGroupPrefix>
      ) : null}
      <InputGroupInput
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text)]/60 outline-none"
      />
    </InputGroup>
  );
}

export function LabeledSelect({ label, selectedKey, onSelectionChange, options }) {
  return (
    <Select.Root
      selectedKey={selectedKey || undefined}
      onSelectionChange={(key) => onSelectionChange(key == null ? "" : String(key))}
    >
      <Label className="mb-1 block text-sm text-[var(--color-text)]">{label}</Label>
      <Select.Trigger className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-[var(--color-text)]">
        <Select.Value className="flex-1 truncate text-left" />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="min-w-[var(--trigger-width)] rounded-xl bg-[var(--color-surface)] p-1 text-[var(--color-text)] shadow-lg">
        <ListBox aria-label={label} selectionMode="single">
          {options.map((opt) => (
            <ListBoxItem key={opt} id={opt} textValue={opt} className="cursor-pointer rounded-lg px-3 py-2 text-[var(--color-text)] outline-none data-[focused]:bg-[var(--color-primary)]/10">
              {opt}
            </ListBoxItem>
          ))}
        </ListBox>
      </Select.Popover>
    </Select.Root>
  );
}

export function PagePagination({ page, totalPages, onPageChange, className }) {
  return (
    <Pagination className={className}>
      <PaginationContent className="flex flex-wrap items-center justify-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink isActive={p === page} onPress={() => onPageChange(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}

export function UiProgress({ value, className }) {
  return (
    <ProgressBar value={value} className={className}>
      <ProgressBarTrack className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
        <ProgressBarFill className="h-full rounded-full bg-[var(--color-primary)]" />
      </ProgressBarTrack>
    </ProgressBar>
  );
}
