import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  category_id: number | string;
  price: number | string;
  stock: number | string;
}

interface Props {
  products: Product[]
  refreshProduct: () => void
}

export default function ProductTable({ products, refreshProduct }: Props) {
  const [editFormData, setEditFormData] = useState<Product>({
    id: 0,
    name: "",
    category_id: '',
    price: '',
    stock: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  function handleEdit(product: Product) {
    setEditFormData({ id: product.id, name: product.name, category_id: product.category_id, price: product.price, stock: product.stock });
    setIsDialogOpen(true);
  }

  function handleDelete(product: Product) {
    setEditFormData({ id: product.id, name: product.name, category_id: product.category_id, price: product.price, stock: product.stock });
    setIsAlertDialogOpen(true);
  }

  async function updateProduct(e: React.FormEvent) {
    e.preventDefault();
    const id = editFormData.id;

    try {
      setIsLoading(true);
      const res = await api.put(`/products/${id}`, editFormData);

      const data = res.data;
      await refreshProduct();
      setIsDialogOpen(false);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal mengupdate product: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProduct() {
    const id = editFormData.id;

    try {
      setIsLoading(true);
      const res = await api.delete(`/products/${id}`);

      const data = res.data;
      await refreshProduct();
      setIsAlertDialogOpen(false);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal menghapus product: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="text-right">
                <div className="">
                  <Button variant="ghost" onClick={() => handleEdit(product)}><Edit2 /></Button>
                  <Button variant="ghost" onClick={() => handleDelete(product)}><Trash2 /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={updateProduct}>
            <DialogHeader>
              <DialogTitle>Edit product</DialogTitle>
              <DialogDescription>
                Make changes to the product here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 pt-5">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  required
                />
                <Label htmlFor="category_id">Category Id</Label>
                <Input
                  id="category_id"
                  name="category_id"
                  type="number"
                  value={editFormData.category_id}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, category_id: e.target.value })
                  }
                  required
                />
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                                    type="number"

                  value={editFormData.price}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, price: e.target.value })
                  }
                  required
                />
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="name"
                                    type="number"

                  value={editFormData.stock}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, stock: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter className="pt-5">
              <DialogClose asChild>
                <Button variant="outline" disabled={isLoading}>Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>{isLoading ? "Loading" : "Save changes"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteProduct} disabled={isLoading}>{isLoading ? "Loading" : "Continue"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
