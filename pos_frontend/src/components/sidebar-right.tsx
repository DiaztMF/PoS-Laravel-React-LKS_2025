import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface Props {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export function SidebarRight({ cart, setCart }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  async function completeSale() {
  if (cart.length === 0) {
    toast.error("Cart masih kosong")
    return
  }

  const payload = {
    items: cart.map((item) => ({
      product_id: item.id,
      quantity: item.qty,
    })),
  }

  try {
    const res = await api.post("/sales", payload)
    
    setIsLoading(true)
    toast.success(res.data.message)

    setCart([])
  } catch (error: any) {
    toast.error(error.response.data.errors)
  } finally {
    setIsLoading(false)
  }
}

  return (
    <Sidebar collapsible="none" className="sticky top-0 hidden h-svh lg:flex">
      <SidebarHeader className="flex justify-center h-18">
        <h1 className="text-xl">Checkout</h1>
      </SidebarHeader>
      <SidebarContent className="pr-2">
        {cart.map((item) => (
          <Item variant="muted" size="sm" key={item.id}>
            <ItemContent>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemDescription>Rp {item.price}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Input
                type="number"
                className="w-15"
                value={item.qty}
                onChange={(e) =>
                  setCart((prev) =>
                    prev.map((p) =>
                      p.id === item.id
                        ? { ...p, qty: Math.max(1, Number(e.target.value)) }
                        : p
                    )
                  )
                }
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCart((prev) => prev.filter((p) => p.id !== item.id))
                }
              >
                <X color="red" />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent className="pr-2">
          <SidebarSeparator className="mx-0" />
          <div className="flex-col pr-2">
            <div className="flex flex-row justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm">Rp {subtotal}</span>
            </div>
          </div>
          <div className="pr-1.5 mb-4">
            <div className="flex flex-row justify-between">
              <span>Total Price</span>
              <span>Rp {subtotal}</span>
            </div>
          </div>
        </SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full mb-1" onClick={completeSale} disabled={isLoading}>{isLoading ? "Loading" : "Complete Sale"}</Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
