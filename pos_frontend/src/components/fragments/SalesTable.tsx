import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Sale {
  id: number;
  user_id: number | string;
  total_price: number | string;
}

interface Detail {
  sale_id: number | string;
  product_id: number | string;
  quantity: number | string;
  subtotal: number | string;
}

interface Props {
  sales: Sale[];
  refreshSale: () => void;
}

export default function SaleTable({ sales, refreshSale }: Props) {
  const [editFormData, setEditFormData] = useState<Sale>({
    id: 0,
    user_id: "",
    total_price: "",
  });
  const [detail, setDetail] = useState<Detail>({
    sale_id: "",
    product_id: "",
    quantity: "",
    subtotal: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  function handleGetDetails(sales: Sale) {
    setIsDialogOpen(true);
    getDetails(sales);
  }

  async function getDetails(sales: Sale) {
    const sale_id = sales.id;

    try {
      const res = await api.get(`/sales-details/${sale_id}`);

      const data = res.data;
      setDetail(data.data[0]);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal memuat detail pejualan: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(sale: Sale) {
    setEditFormData({
      id: sale.id,
      user_id: sale.user_id,
      total_price: sale.total_price,
    });
    setIsAlertDialogOpen(true);
  }

  async function deleteSale() {
    const id = editFormData.id;

    try {
      setIsLoading(true);
      const res = await api.delete(`/sales/${id}`);

      const data = res.data;
      await refreshSale();
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
            <TableHead>User Id</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className="text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale: Sale) => (
            <TableRow key={sale.id}>
              <TableCell className="font-medium">{sale.id}</TableCell>
              <TableCell>{sale.user_id}</TableCell>
              <TableCell>{sale.total_price}</TableCell>
              <TableCell className="text-right">
                <div className="">
                  <Button
                    variant="ghost"
                    onClick={() => handleGetDetails(sale)}
                  >
                    <Eye />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(sale)}>
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteSale} disabled={isLoading}>
              {isLoading ? "Loading" : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sales details</DialogTitle>
            <DialogDescription>View details of the sales</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Sale Id</Label>
              <Label className="bg-muted p-3 rounded-sm">
                {detail.sale_id}
              </Label>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Product Id</Label>
              <Label className="bg-muted p-3 rounded-sm">
                {detail.product_id}
              </Label>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Quantity</Label>
              <Label className="bg-muted p-3 rounded-sm">
                {detail.quantity}
              </Label>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Subtotal</Label>
              <Label className="bg-muted p-3 rounded-sm">
                Rp {detail.subtotal}
              </Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
