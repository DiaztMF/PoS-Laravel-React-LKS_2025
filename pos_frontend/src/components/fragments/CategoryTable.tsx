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

interface Category {
  id: number;
  name: string;
}

interface Props {
  categories: Category[]
  refreshCategory: () => void
}

export default function CategoryTable({ categories, refreshCategory }: Props) {
  const [editFormData, setEditFormData] = useState<Category>({
    id: 0,
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  function handleEdit(category: Category) {
    setEditFormData({ id: category.id, name: category.name });
    setIsDialogOpen(true);
  }

  function handleDelete(category: Category) {
    setEditFormData({ id: category.id, name: category.name });
    setIsAlertDialogOpen(true);
  }

  async function updateCategory(e: React.FormEvent) {
    e.preventDefault();
    const id = editFormData.id;

    try {
      setIsLoading(true);
      const res = await api.put(`/categories/${id}`, editFormData);

      const data = res.data;
      await refreshCategory();
      setIsDialogOpen(false);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal mengupdate category: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCategory() {
    const id = editFormData.id;

    try {
      setIsLoading(true);
      const res = await api.delete(`/categories/${id}`);

      const data = res.data;
      await refreshCategory();
      setIsAlertDialogOpen(false);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal menghapus category: " + error);
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
            <TableHead className="text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category: Category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="text-right">
                <div className="">
                  <Button variant="ghost" onClick={() => handleEdit(category)}><Edit2 /></Button>
                  <Button variant="ghost" onClick={() => handleDelete(category)}><Trash2 /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={updateCategory}>
            <DialogHeader>
              <DialogTitle>Edit category</DialogTitle>
              <DialogDescription>
                Make changes to the category here. Click save when you&apos;re
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
            This action cannot be undone. This will permanently delete the category and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteCategory} disabled={isLoading}>{isLoading ? "Loading" : "Continue"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
