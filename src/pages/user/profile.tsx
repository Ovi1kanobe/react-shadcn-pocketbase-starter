import PageContainer from "@/components/core/page-container";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalDialog } from "@/hooks/useGlobalDialog";
import LabeledActionBlock from "@/components/core/labeled-action-block";
import UserAvatarForm from "@/components/core/user-avatar-form";
import { ChangeNameForm } from "@/components/forms/change-name";
import toast from "react-hot-toast";

function ProfilePage() {
  const dialog = useGlobalDialog();
  const { user } = useAuth();

  const onOpenNameChangeForm = () => {
    dialog.openDialog({
      content: () => (
        <ChangeNameForm
          onSubmit={dialog.closeDialog}
          onError={() => {
            toast.error("Failed to change name. Please try again.");
          }}
        />
      ),
    });
  };

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
