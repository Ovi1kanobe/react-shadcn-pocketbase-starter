import PageContainer from "@/components/core/page-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [inputLocked, setInputLocked] = useState(true);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
  }, [user]);

  function handlePushButton() {
    if (inputLocked) {
      setInputLocked(false);
      return;
    }
    updateUser({ name },() => {
      toast.error("Failed to update name. Please try again.");
    }, () => {
      toast.success("Name updated successfully!");
      setInputLocked(true);
      setName(name);
    })
  }

  return (
    <PageContainer>
      <h1>Profile</h1>
      <Separator />
      <div className="flex flex-col space-y-4 p-4">
        <Card className="p-4 flex flex-col ">
          <Label>Name</Label>
          <div className="flex flex-row gap-4 items-center relative cursor-pointer">
            <Input 
            onClick={() => setInputLocked(false)}
            value={name} 
            disabled={inputLocked}
            onChange={(e) => setName(e.target.value)} 
            className={cn("w-full transition-all duration-500")} />
            <Button
            onClick={handlePushButton}
            variant={"default"}
              className={cn(
                "overflow-hidden transition-all duration-500")}
            >
              {inputLocked ? "Change" : "Save"}
            </Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

export default ProfilePage;
