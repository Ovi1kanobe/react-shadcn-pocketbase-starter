import PageContainer from "@/components/core/page-container";
import EditableTextCard from "@/components/core/editable-text-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name);
  }, [user]);

  function handleSave() {
    updateUser(
      { name },
      () => {
        toast.error("Failed to update name. Please try again.");
      },
      () => {
        toast.success("Name updated successfully!");
        setName(name);
      }
    );
  }

  return (
    <PageContainer>
      <div className="p-4 pb-2">
        <Card className="p-4 flex items-center gap-4">
          <Avatar className="size-16">
            {user?.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="uppercase">{user?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold leading-none">{user?.name || "Profile"}</h1>
            {user?.email && <p className="text-muted-foreground text-sm">{user.email}</p>}
          </div>
        </Card>
      </div>
      <Separator />
      <div className="flex flex-col space-y-4 p-4">
        <EditableTextCard label="Name" value={name} onChange={setName} onSave={handleSave} />
      </div>
    </PageContainer>
  );
}

export default ProfilePage;
