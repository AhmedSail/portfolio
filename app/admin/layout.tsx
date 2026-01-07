import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <AdminSidebar className="hidden lg:flex fixed left-0 top-0 h-screen w-64" />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-8 p-4 bg-card rounded-2xl border border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">A</span>
            </div>
            <span className="font-bold">Portfolio Admin</span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-64 bg-card border-r-border"
            >
              <AdminSidebar className="h-full border-none" />
            </SheetContent>
          </Sheet>
        </div>

        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
