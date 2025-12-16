import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

export default function SalesLoading() {
  return (
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
          <TableRow>
            <TableCell className="font-medium"><Skeleton className="w-[84px] h-[36px]"/></TableCell>
            <TableCell><Skeleton className="w-[152px] h-[36px]"/></TableCell>
            <TableCell><Skeleton className="w-[209px] h-[36px]"/></TableCell>
            <TableCell className="flex items-center justify-end">
              <div className="">
                <Skeleton className="w-[75px] h-[36px]"/>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium"><Skeleton className="w-[84px] h-[36px]"/></TableCell>
            <TableCell><Skeleton className="w-[152px] h-[36px]"/></TableCell>
            <TableCell><Skeleton className="w-[209px] h-[36px]"/></TableCell>
            <TableCell className="flex items-center justify-end">
              <div className="">
                <Skeleton className="w-[75px] h-[36px]"/>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium"><Skeleton className="w-[84px] h-[36px]"/></TableCell>
            <TableCell><Skeleton className="w-[152px] h-[36px]"/></TableCell>
            <TableCell><Skeleton className="w-[209px] h-[36px]"/></TableCell>
            <TableCell className="flex items-center justify-end">
              <div className="">
                <Skeleton className="w-[75px] h-[36px]"/>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium"><Skeleton className="w-[84px] h-[36px]"/></TableCell>
            <TableCell><Skeleton className="w-[152px] h-[36px]"/></TableCell>
            <TableCell><Skeleton className="w-[209px] h-[36px]"/></TableCell>
            <TableCell className="flex items-center justify-end">
              <div className="">
                <Skeleton className="w-[75px] h-[36px]"/>
              </div>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  );
}
