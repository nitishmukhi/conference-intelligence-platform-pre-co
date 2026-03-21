
        import React, { useEffect, useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Badge,
  Switch
} from "@heroui/react";
import {
  HomeIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  UserIcon,
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/outline";
        export default function Layout({ children }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
  // initialize theme
  document.documentElement.removeAttribute('data-theme');
  }, []);

  const handleThemeToggle = (selected) => {
  setIsDark(selected);
  if (selected) {
  document.documentElement.removeAttribute('data-theme');
  } else {
  document.documentElement.setAttribute('data-theme', 'light');
  }
  };

  const handleSearch = () => {
  if (searchValue) {
  // Implement search behavior or route change here if desired
  console.log('Search:', searchValue);
  }
  };

  const onUserMenuAction = (key) => {
  // surface to parent if needed
  console.log('UserMenu action:', key);
  };
        return (
            <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] flex">
    {/* Sidebar */}
    <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-md py-6 px-4 gap-6">
    <div className="flex items-center gap-3 px-2">
    <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shadow-primary">
    <span className="text-[var(--color-text)] text-sm font-bold">CI</span>
    </div>
    <span className="text-[var(--color-text)] font-semibold tracking-tight">Conference Intelligence Platform</span>
    </div>
    <nav className="flex-1 flex flex-col gap-1">
    <NavLink
      to="/"
      end
      className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[var(--color-primary)]/10 transition-colors ${isActive ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : ''}`}
    >
    <HomeIcon className="w-5 h-5 text-[var(--color-text)]" />
    <span className="text-sm text-[var(--color-text)]">Home</span>
    </NavLink>
    <NavLink
      to="/conferences"
      className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[var(--color-primary)]/10 transition-colors ${isActive ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : ''}`}
    >
    <CalendarIcon className="w-5 h-5 text-[var(--color-text)]" />
    <span className="text-sm text-[var(--color-text)]">Conferences</span>
    </NavLink>
    <div className="mt-auto p-3 rounded-xl bg-[var(--color-background)]/60 border border-[var(--color-border)]">
    <p className="text-xs text-[var(--color-text)]/80">Tip: Use the search bar above to quickly find sessions, speakers, and reports.</p>
    </div>
    </nav>
    </aside>

    {/* Main content wrapper */}
    <div className="flex-1 flex flex-col min-w-0">
    {/* Header bar */}
    <Navbar
    maxWidth="xl"
    className="sticky top-0 z-40 bg-[var(--color-background)]/70 backdrop-blur-md border-b border-[var(--color-border)] px-4"
    >
    <NavbarContent justify="start" className="gap-2 md:hidden">
    <NavbarMenuToggle className="text-[var(--color-text)]" />
    <NavbarBrand>
    <span className="text-[var(--color-text)] font-semibold">CIP</span>
    </NavbarBrand>
    </NavbarContent>

    <NavbarContent justify="start" className="hidden md:flex">
    <div className="w-80">
    <Input
    aria-label="Search"
    labelPlacement="outside"
    placeholder="Search conferences, items, reports..."
    value={searchValue}
    onValueChange={setSearchValue}
    classNames={{
    base: "w-full",
    inputWrapper: "h-11 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl input-focus-primary",
    input: "text-[var(--color-text)] placeholder:text-[var(--color-text)]/60",
    }}
    startContent={<MagnifyingGlassIcon className="w-4 h-4 text-[var(--color-text)]" />}
    onKeyDown={(e)=>{ if(e.key==='Enter'){ handleSearch(); } }}
    />
    </div>
    </NavbarContent>

    <NavbarContent justify="end" className="gap-2">
    <Switch
    isSelected={isDark}
    onValueChange={handleThemeToggle}
    size="sm"
    className="px-1"
    thumbIcon={({isSelected, className}) => (
    isSelected ? <SunIcon className={`${className} text-[var(--color-text)]`} /> : <MoonIcon className={`${className} text-[var(--color-text)]`} />
    )}
    />

    <Dropdown>
    <DropdownTrigger>
    <Button isIconOnly className="rounded-xl bg-transparent border border-[var(--color-border)]">
    <Badge content={3} color="danger">
    <BellIcon className="w-5 h-5 text-[var(--color-text)]" />
    </Badge>
    </Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Notifications" classNames={{ base: "bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl min-w-[260px]" }}>
    <DropdownItem key="notice-1" className="text-[var(--color-text)]">3 new conferences added</DropdownItem>
    <DropdownItem key="notice-2" className="text-[var(--color-text)]">2 items processed</DropdownItem>
    <DropdownItem key="notice-3" className="text-[var(--color-text)]">Reports generation complete</DropdownItem>
    </DropdownMenu>
    </Dropdown>

    <Dropdown>
    <DropdownTrigger>
    <Button className="rounded-xl bg-transparent border border-[var(--color-border)] px-2">
    <div className="flex items-center gap-2">
    <Avatar name="Alex" className="w-7 h-7" />
    <ChevronDownIcon className="w-4 h-4 text-[var(--color-text)]" />
    </div>
    </Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="User menu" onAction={onUserMenuAction} classNames={{ base: "bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl min-w-[200px]" }}>
    <DropdownItem key="profile" startContent={<UserIcon className="w-4 h-4 text-[var(--color-text)]" />}>Profile</DropdownItem>
    <DropdownItem key="settings" startContent={<Cog6ToothIcon className="w-4 h-4 text-[var(--color-text)]" />}>Settings</DropdownItem>
    <DropdownItem key="logout" color="danger">Logout</DropdownItem>
    </DropdownMenu>
    </Dropdown>
    </NavbarContent>

    <NavbarMenu className="bg-[var(--color-background)]/80 backdrop-blur-md border-t border-[var(--color-border)]">
    <NavbarMenuItem>
    <NavLink to="/" className="text-[var(--color-text)]">Home</NavLink>
    </NavbarMenuItem>
    <NavbarMenuItem>
    <NavLink to="/conferences" className="text-[var(--color-text)]">Conferences</NavLink>
    </NavbarMenuItem>
    </NavbarMenu>
    </Navbar>

    {/* Main content */}
    <main className="flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-8 py-6 bg-[var(--color-background)]">
    {children}
    </main>
    </div>
    </div>
        );
        }
