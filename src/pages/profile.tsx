import PageContainer from "@/components/core/page-container";
import EditableTextCard from "@/components/core/editable-text-card";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";
import UserAvatar from "@/components/core/user-avatar";

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // programmatically open file dialog
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateUser(
        {
          avatar: file, //Due to Pocketbase Typegen's limitations, we must ignore this type error. The update function can infact take a file
        },
        () => {
          toast.error("Failed to update avatar. Please try again.");
        },
        () => {
          toast.success("Avatar updated successfully!");
          // Reset the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      );
    }
  };

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
          {user && (
            <UserAvatar user={user} className="size-36 group" onClick={handleClick}>
              <div className="w-full h-full bg-black absolute cursor-pointer opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
              <Camera
                size={18}
                className="absolute text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-500"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </UserAvatar>
          )}
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
