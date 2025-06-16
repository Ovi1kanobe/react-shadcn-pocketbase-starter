import PageContainer from "@/components/core/page-container";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LabeledActionBlock from "@/components/core/labeled-action-block";
import UserAvatarForm from "@/components/core/user-avatar-form";

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name);
  }, [user]);

  function onChangeName() {
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

  const onOpenNameChangeForm = () => {
    // Open the dialog context with the correct props
  }

  return (
    <PageContainer>
      <Card className="p-4 flex items-center gap-4">
        {user && (
          <>
            <UserAvatarForm />
            <div>
              <h1 className="text-2xl font-bold leading-none">{user?.name || "Profile"}</h1>
              {user?.email && <p className="text-muted-foreground text-sm">{user.email}</p>}
            </div>
          </>
        )}
      </Card>
      <Separator />
      <div className="flex flex-col space-y-4 p-4">
        <LabeledActionBlock
          title="Name"
          description="Change your display name."
          actionLabel="Change"
          onActionClick={onOpenNameChangeForm}
        />
      </div>
    </PageContainer>
  );
}

export default ProfilePage;
