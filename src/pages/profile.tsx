import PageContainer from "@/components/core/page-container";
import EditableTextCard from "@/components/profile/editable-text-card";
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
      <h1>Profile</h1>
      <Separator />
      <div className="flex flex-col space-y-4 p-4">
        <EditableTextCard label="Name" value={name} onChange={setName} onSave={handleSave} />
      </div>
    </PageContainer>
  );
}

export default ProfilePage;
