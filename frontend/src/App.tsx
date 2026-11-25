import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Icons } from "@/lib/icons";
import SignIn from "@/screens/SignIn";
import ResetPassword from "@/screens/ResetPassword";
import Notes from "@/screens/Notes";
import Note from "@/screens/Note";
import Trash from "@/screens/Trash";
import Account from "@/screens/Account";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

// The app's menu, drawn around every screen except the ones routed outside it below.
function AppShellLayout() {
  return (
    <div className="flex min-h-screen">
      <aside
        className="w-56 shrink-0 border-r p-4"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <p
          className="mb-4 px-3 text-sm font-semibold"
          style={{ fontFamily: "var(--brand-font-heading)" }}
        >
          {"Notepad"}
        </p>
        <nav aria-label="App menu" className="flex flex-col gap-1">
          <NavLink to="/notes" className={navLinkClass}>
            <Icons.Home size={16} />
            {"My notes"}
          </NavLink>
          <NavLink to="/trash" className={navLinkClass}>
            <Icons.X size={16} />
            {"Trash"}
          </NavLink>
          <NavLink to="/account" className={navLinkClass}>
            <Icons.Settings size={16} />
            {"Account settings"}
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShellLayout />}>
        <Route path="/notes" element={<Notes />} />
        <Route path="/note" element={<Note />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}
