import { EmailSettingsForm } from "@/components/admin/EmailSettingsForm";

export const metadata = {
  title: "Email settings · Admin CRM",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-espresso">
          Email settings
        </h1>
        <p className="text-sm text-muted">
          Choose which inbox receives website orders, and the Zoho account used
          to send them.
        </p>
      </div>
      <EmailSettingsForm />
    </div>
  );
}
