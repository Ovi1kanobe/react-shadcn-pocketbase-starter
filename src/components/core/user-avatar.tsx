import type { UsersRecord } from "@/lib/pocketbase-types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useClient } from "@/hooks/useClient";
import { cn } from "@/lib/utils";

type UserAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  user: UsersRecord;
  children?: React.ReactNode;
};

function UserAvatar({ user, children, onClick, className }: UserAvatarProps) {
  const { pb } = useClient();

  return (
    <Avatar
      className={cn("relative flex items-center justify-center shadow-xl", className)}
      onClick={onClick}
    >
      {user?.avatar && <AvatarImage src={pb.files.getURL(user, user.avatar)} alt={user.name} />}
      <AvatarFallback className="uppercase">{user?.name?.slice(0, 2)}</AvatarFallback>
      {children}
    </Avatar>
  );
}

export default UserAvatar;
