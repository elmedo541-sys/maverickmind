import InstallAppButton from "./InstallAppButton";

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm grid grid-cols-1 md:grid-cols-3 items-center gap-3 text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} MAVERICK MINDS, INC. All rights reserved.</p>
        <InstallAppButton variant="footer" />
        <p className="md:text-right">Fire alarm systems, components &amp; installation services.</p>
      </div>
    </footer>
  );
}
