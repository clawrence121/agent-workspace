import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getRSCSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getRSCSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        user={{
          name: session.user.name,
          email: session.user.email,
        }}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          {/* <div className="@container/main flex flex-1 flex-col gap-2"> */}
          <main>{children}</main>
          {/* </div> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
