import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownPopover,
  DropdownTrigger,
  InputGroup,
  InputGroupInput,
  InputGroupPrefix,
  Switch,
  SwitchControl,
  SwitchIcon,
  SwitchThumb,
} from "@heroui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Layout({ children }) {
  const [isDark, setIsDark] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");
  }, []);

  const handleThemeToggle = (selected) => {
    setIsDark(selected);
    if (selected) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const handleSearch = () => {
    if (searchValue) {
      console.log("Search:", searchValue);
    }
  };

  const onUserMenuAction = (id) => {
    console.log("UserMenu action:", id);
  };

  const searchField = (
    <InputGroup className="input-focus-primary h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-2">
      <InputGroupPrefix className="text-[var(--color-text)]">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </InputGroupPrefix>
      <InputGroupInput
        aria-label="Search"
        placeholder="Search conferences, items, reports..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="min-w-0 flex-1 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text)]/60 outline-none"
      />
    </InputGroup>
  );

  return (
    <div className="flex min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)]">
      <aside className="hidden shrink-0 flex-col gap-6 border-r border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-6 backdrop-blur-md md:flex md:w-64 lg:w-72">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)] shadow-primary">
            <span className="text-sm font-bold text-[var(--color-text)]">CI</span>
          </div>
          <span className="font-semibold tracking-tight text-[var(--color-text)]">Conference Intelligence Platform</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-[var(--color-primary)]/10 ${isActive ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : ""}`
            }
          >
            <HomeIcon className="h-5 w-5 text-[var(--color-text)]" />
            <span className="text-sm text-[var(--color-text)]">Home</span>
          </NavLink>
          <NavLink
            to="/conferences"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-[var(--color-primary)]/10 ${isActive ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : ""}`
            }
          >
            <CalendarIcon className="h-5 w-5 text-[var(--color-text)]" />
            <span className="text-sm text-[var(--color-text)]">Conferences</span>
          </NavLink>
          <div className="mt-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]/60 p-3">
            <p className="text-xs text-[var(--color-text)]/80">
              Tip: Use the search bar above to quickly find sessions, speakers, and reports.
            </p>
          </div>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/70 px-4 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-2 py-2">
            <div className="flex w-full flex-wrap items-center gap-2 md:flex-nowrap">
              <div className="flex flex-1 items-center gap-2 md:hidden">
                <Button
                  isIconOnly
                  aria-expanded={menuOpen}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  className="rounded-xl border border-[var(--color-border)] bg-transparent text-[var(--color-text)]"
                  variant="outline"
                  onPress={() => setMenuOpen((v) => !v)}
                >
                  {menuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
                </Button>
                <span className="font-semibold text-[var(--color-text)]">CIP</span>
              </div>

              <div className="hidden min-w-0 flex-1 md:block md:max-w-md">{searchField}</div>

              <div className="flex w-full shrink-0 items-center justify-end gap-2 md:w-auto md:flex-initial">
                <Switch isSelected={isDark} onChange={handleThemeToggle} size="sm" className="px-1">
                  {({ isSelected }) => (
                    <SwitchControl>
                      <SwitchThumb>
                        <SwitchIcon>
                          {isSelected ? (
                            <SunIcon className="h-3 w-3 text-[var(--color-text)]" />
                          ) : (
                            <MoonIcon className="h-3 w-3 text-[var(--color-text)]" />
                          )}
                        </SwitchIcon>
                      </SwitchThumb>
                    </SwitchControl>
                  )}
                </Switch>

                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      className="relative rounded-xl border border-[var(--color-border)] bg-transparent"
                      variant="outline"
                    >
                      <BellIcon className="h-5 w-5 text-[var(--color-text)]" />
                      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                        3
                      </span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownPopover className="rounded-xl">
                    <DropdownMenu
                      aria-label="Notifications"
                      selectionMode="none"
                      className="min-w-[260px] rounded-xl bg-[var(--color-surface)] p-1 text-[var(--color-text)]"
                    >
                      <DropdownItem id="notice-1" className="text-[var(--color-text)]">
                        3 new conferences added
                      </DropdownItem>
                      <DropdownItem id="notice-2" className="text-[var(--color-text)]">
                        2 items processed
                      </DropdownItem>
                      <DropdownItem id="notice-3" className="text-[var(--color-text)]">
                        Reports generation complete
                      </DropdownItem>
                    </DropdownMenu>
                  </DropdownPopover>
                </Dropdown>

                <Dropdown>
                  <DropdownTrigger>
                    <Button className="rounded-xl border border-[var(--color-border)] bg-transparent px-2" variant="outline">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <Avatar.Fallback className="text-xs">A</Avatar.Fallback>
                        </Avatar>
                        <ChevronDownIcon className="h-4 w-4 text-[var(--color-text)]" />
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownPopover className="rounded-xl">
                    <DropdownMenu
                      aria-label="User menu"
                      selectionMode="none"
                      onAction={onUserMenuAction}
                      className="min-w-[200px] rounded-xl bg-[var(--color-surface)] p-1 text-[var(--color-text)]"
                    >
                      <DropdownItem id="profile" className="text-[var(--color-text)]">
                        <span className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4" />
                          Profile
                        </span>
                      </DropdownItem>
                      <DropdownItem id="settings" className="text-[var(--color-text)]">
                        <span className="flex items-center gap-2">
                          <Cog6ToothIcon className="h-4 w-4" />
                          Settings
                        </span>
                      </DropdownItem>
                      <DropdownItem id="logout" variant="danger">
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </DropdownPopover>
                </Dropdown>
              </div>
            </div>

            {menuOpen ? (
              <div className="border-t border-[var(--color-border)] pt-3 md:hidden">
                <div className="mb-3">{searchField}</div>
                <nav className="flex flex-col gap-2 pb-2">
                  <NavLink
                    to="/"
                    end
                    className="rounded-lg px-2 py-2 text-[var(--color-text)] hover:bg-[var(--color-primary)]/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/conferences"
                    className="rounded-lg px-2 py-2 text-[var(--color-text)] hover:bg-[var(--color-primary)]/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    Conferences
                  </NavLink>
                </nav>
              </div>
            ) : null}
          </div>
        </header>

        <main className="min-w-0 flex-1 bg-[var(--color-background)] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
