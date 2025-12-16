import { AppSidebar } from "@/components/app-sidebar";
import CategoryTable from "@/components/fragments/CategoryTable";
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
import CategoryLoading from "@/components/fragments/CategoryLoading";

interface Category {
  id: number;
  name: string;
}

export default function CategoryPage() {
  const [categories, setCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setIsDialogOpen(true);
  }

  async function createCategory(e:React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/categories", formData)

      const data = res.data;
      await getCategory();
      setIsDialogOpen(false);

      toast.success(data.message)
    } catch (error) {
      toast.error("Gagal menambahkan kategori: " + error)
    } finally {
      setIsLoading(false)
    }
  }

  async function getCategory() {
    try {
      setIsLoading(true);
      const res = await api.get("/categories");

      const data = res.data;
      setCategory(data.data);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal memuat category: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
  }, [])

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
                  <BreadcrumbPage>Category</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => handleCreate()}>Add Category</Button>
            </div>
            {isLoading ? <CategoryLoading /> : <CategoryTable categories={categories} refreshCategory={getCategory} />}
          </div>
        </SidebarInset>
      </SidebarProvider>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={createCategory}>
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>
                Add category to database. Click save when you&apos;re done.
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
                />
              </div>
            </div>
            <DialogFooter className="pt-5">
              <DialogClose asChild>
                <Button variant="outline" disabled={isLoading}>Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>{isLoading ? "Loading" : "Confirm"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
