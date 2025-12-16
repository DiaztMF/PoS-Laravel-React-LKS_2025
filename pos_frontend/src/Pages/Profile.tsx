import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import api from "@/lib/axios";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Profile {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  async function getProfile() {
    try {
      setIsLoading(true);
      const res = await api.get("/profile");

      const data = res.data;
      setProfile(data.data);

      toast.success(data.message);
    } catch (error) {
      toast.error("Gagal memuat profile: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    try {
      setIsLoading(true);
      const res = await api.post("/logout");

      const data = res.data;

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error("Logout gagal: " + error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
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
          <div className="flex flex-1 flex-col gap-4 p-4 items-center justify-center">
            <Card className="w-1/2">
              <CardHeader>
                <CardTitle>View your account</CardTitle>
                <CardDescription>
                  Detail of your account, click Logout button to logout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Label className="bg-muted p-3 rounded-sm">
                        {profile.name}
                      </Label>
                    </Field>
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Label className="bg-muted p-3 rounded-sm">
                        {profile.email}
                      </Label>
                    </Field>
                    <Field>
                      <Button
                        disabled={isLoading}
                        onClick={() => handleLogout()}
                      >
                        {isLoading ? "Loading" : "Logout"}
                      </Button>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
