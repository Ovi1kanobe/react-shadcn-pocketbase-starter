import PageContainer from "@/components/core/page-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name);
  }, [user]);

  return (
    <PageContainer>
      <h1>Profile</h1>
      <Separator />
      <div className="flex flex-col space-y-4 p-4">
        <Card className="p-4 flex flex-col ">
          <Label>Name</Label>
          <div className="flex flex-row gap-4 items-center">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button
              className={cn(
                "transition-all duration-1000 scale-x-100",
                name == user?.name && "scale-x-0"
              )}
            >
              Save
            </Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

export default ProfilePage;
