import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Contact Links</h1>
      <p className="text-sm text-gray-500 mb-6">
        These show as clickable icons on your public Contact page.
      </p>
      <SettingsForm
        defaultValues={{
          contactEmail: settings?.contactEmail,
          messengerUrl: settings?.messengerUrl,
          viberUrl: settings?.viberUrl,
        }}
      />
    </div>
  );
}