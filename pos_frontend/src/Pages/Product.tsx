import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import ProductTable from "@/components/fragments/ProductTable";
import ProductLoading from "@/components/fragments/ProductLoading";

interface Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  stock: number;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    stock: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setIsDialogOpen(true);
  }

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/products", formData);

      const data = res.data;
      await getProduct();
      setIsDialogOpen(false);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal menambahkan kategori: " + error);
    } finally {
      setIsLoading(false);
    }
  }

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
                  <BreadcrumbPage>Product</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => handleCreate()}>
                Add Product
              </Button>
            </div>
            {isLoading ? (
              <ProductLoading />
            ) : (
              <ProductTable products={products} refreshProduct={getProduct} />
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={createProduct}>
            <DialogHeader>
              <DialogTitle>Create Product</DialogTitle>
              <DialogDescription>
                Add product to database. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 pt-5">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <Label htmlFor="category_id">Category Id</Label>
                <Input
                  id="category_id"
                  name="category_id"
                  type="number"
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  required
                />
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="name"
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter className="pt-5">
              <DialogClose asChild>
                <Button variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading" : "Confirm"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
