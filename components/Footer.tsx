export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm flex flex-col md:flex-row justify-between gap-2">
        <p>&copy; {new Date().getFullYear()} MaverickMind. All rights reserved.</p>
        <p>Fire alarm systems, components &amp; installation services.</p>
      </div>
    </footer>
  );
}
