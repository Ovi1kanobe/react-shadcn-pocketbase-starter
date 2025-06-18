import { Camera } from "lucide-react";
import UserAvatar from "./user-avatar";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRef } from "react";

function UserAvatarForm() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // programmatically open file dialog
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateUser(
        {
          // @ts-expect-error -- PocketBase accepts File even though type says string
          avatar: file,
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

  if (!user) return null;

  return (
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
  );
}

export default UserAvatarForm;
