import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function HomePage() {
  return (
    <div>
    <h1>Home Page</h1>
      <Button onClick={() => toast.error("Home page")}/>
    </div>
  )
}
