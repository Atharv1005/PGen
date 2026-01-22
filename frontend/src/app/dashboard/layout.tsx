import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <DashboardHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
}