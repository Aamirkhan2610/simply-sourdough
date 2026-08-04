import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin CRM",
  description: "Simply Sourdough admin panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
