import { AppSidebar } from "@/components/app-sidebar";
import { SidebarRight } from "@/components/sidebar-right";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  stock: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export default function PosPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  async function getProduct() {
    try {
      setIsLoading(true);
      const res = await api.get("/products");

      const data = res.data;
      setProducts(data.data);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal memuat product: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  function addToCart(product: Product) {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
        },
      ];
    });
  }

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
                  <BreadcrumbPage>Point of Sale</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col p-4">
            {isLoading ? (
              <div className="grid grid-cols-4 gap-4">
                <Card className=" pb-0 p-1.5">
                  <CardHeader className="p-1">
                    <div className="bg-muted/50 h-25 rounded-xl" />
                  </CardHeader>
                  <CardContent className="ps-2 flex flex-col">
                    <span className="text-sm pb-1">
                      <Skeleton className="w-[131px] h-[20px]" />
                    </span>
                    <span className="text-sm">
                      <Skeleton className="w-[131px] h-[20px]" />
                    </span>
                  </CardContent>
                  <Skeleton className="w-full h-[40px]" />
                </Card>
                <Card className=" pb-0 p-1.5">
                  <CardHeader className="p-1">
                    <div className="bg-muted/50 h-25 rounded-xl" />
                  </CardHeader>
                  <CardContent className="ps-2 flex flex-col">
                    <span className="text-sm pb-1">
                      <Skeleton className="w-[131px] h-[20px]" />
                    </span>
                    <span className="text-sm">
                      <Skeleton className="w-[131px] h-[20px]" />
                    </span>
                  </CardContent>
                  <Skeleton className="w-full h-[40px]" />
                </Card>
                <Card className=" pb-0 p-1.5">
                  <CardHeader className="p-1">
                    <div className="bg-muted/50 h-25 rounded-xl" />
                  </CardHeader>
                  <CardContent className="ps-2 flex flex-col">
                    <span className="text-sm pb-1">
                      <Skeleton className="w-[131px] h-[20px]" />
                    </span>
                    <span className="text-sm">
                      <Skeleton className="w-[131px] h-[20px]" />
                    </span>
                  </CardContent>
                  <Skeleton className="w-full h-[40px]" />
                </Card>
                <Card className=" pb-0 p-1.5">
                  <CardHeader className="p-1">
                    <div className="bg-muted/50 h-25 rounded-xl" />
                  </CardHeader>
                  <CardContent className="ps-2 flex flex-col">
                    <span className="text-sm pb-1">
                      <Skeleton className="w-[131px] h-[20px]" />
                    </span>
                    <span className="text-sm">
                      <Skeleton className="w-[131px] h-[20px]" />
                    </span>
                  </CardContent>
                  <Skeleton className="w-full h-[40px]" />
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
                  <Card className="p-1.5 flex flex-col">
                    <CardHeader className="p-1">
                      <div className="bg-muted/50 h-24 rounded-xl" />
                    </CardHeader>

                    <CardContent className="ps-2 flex flex-col gap-1 flex-1">
                      <span className="text-sm truncate">{product.name}</span>
                      <span className="text-sm">Rp {product.price}</span>
                    </CardContent>

                    <Button
                      className="w-full h-10"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </SidebarInset>
        <SidebarRight cart={cart} setCart={setCart} />
      </SidebarProvider>
    </>
  );
}
