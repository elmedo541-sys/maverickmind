import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/inquiries", label: "Inquiries" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // Login page has no session yet - render it standalone (no sidebar)
  if (!session) {
    return <div className="bg-gray-50 min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-56 bg-navy text-white flex flex-col shrink-0">
        <div className="px-5 py-5 font-bold text-lg border-b border-white/10">
          MaverickMind
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2 rounded text-sm hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10 text-sm">
          <p className="text-gray-300 mb-3">Signed in as {session.username}</p>
          <LogoutButton />
        </div>
      </aside>
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
