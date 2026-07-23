import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/slides", label: "Slideshow" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/inquiries", label: "Inquiries" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    return <div className="bg-gray-50 min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <aside className="w-full md:w-56 bg-navy text-white flex flex-col md:min-h-screen shrink-0">
        <div className="px-5 py-4 md:py-5 font-bold text-lg border-b border-white/10">
          MaverickMind
        </div>
        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible px-2 py-2 md:py-4 gap-1 md:gap-0 md:space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2 rounded text-sm hover:bg-white/10 whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-3 md:py-4 border-t border-white/10 text-sm flex items-center justify-between md:block">
          <p className="text-gray-300 md:mb-3">Signed in as {session.username}</p>
          <LogoutButton />
        </div>
      </aside>
      <div className="flex-1 p-4 sm:p-6 md:p-8 min-w-0">{children}</div>
    </div>
  );
}