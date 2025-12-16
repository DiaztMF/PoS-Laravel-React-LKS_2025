import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import SaleTable from "@/components/fragments/SalesTable";
import SalesLoading from "@/components/fragments/SalesLoading";

interface Sale {
  id: number;
  user_id: number | string;
  total_price: number | string;
}

export default function SalePage() {
  const [sales, setSale] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getSale() {
    try {
      setIsLoading(true);
      const res = await api.get("/sales");

      const data = res.data;
      setSale(data.data);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal memuat penjualan: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSale();
  }, []);

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Sales</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex justify-end"></div>
            {isLoading ? (
              <SalesLoading />
            ) : (
              <SaleTable sales={sales} refreshSale={getSale} />
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
