import EditableTextCard from "@/components/core/editable-text-card";
import PageContainer from "@/components/core/page-container";
import { useAuth } from "@/hooks/useAuth";
import { useClient } from "@/hooks/useClient";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AccountPage() {
  const { user, requestEmailChange, externalAuths, fetchCurrentUser } = useAuth();
  const { pb } = useClient();
  const confirmDialog = useConfirmDialog();
  const [email, setEmail] = useState("");

  const onConfirmChangeEmail = () => {
    fetchCurrentUser(
      () => {
        toast.error("error fetching user after email change. Please try again.");
      },
      () => {
        // User will be logged out after email change, so we need to redirect to login and make sure the user is aware that they will be logged in.
      }
    )
  }

  useEffect(() => {
    if (!user) return;
    setEmail(user.email);
  }, [user, pb]);

  const onSaveNewEmail = () => {
    requestEmailChange(
      email,
      () => {
        toast.error("Failed to update email. Please try again.");
      },
      () => {
        confirmDialog.openDialog(
          {
            title: "Email Change Requested",
            description:
              "A confirmation email has been sent to your new email address. Please check your inbox and follow the instructions to complete the change. Then click OK to once you have confirmed the change.",
            confirmLabel: "OK",
            cancelLabel: null,
            onConfirm: onConfirmChangeEmail
          }
        )
      }
    );
  };

  return (
    <PageContainer>
      <EditableTextCard
        label="Email address"
        value={email}
        onChange={setEmail}
        onSave={onSaveNewEmail}
        description="Change your email address. A confirmation email will be sent to the new address."
        disabled={externalAuths != null && externalAuths.length > 0} // Disable changing email addresses if external auths are linked
        disabledReason="You have linked external authentication methods. Please unlink them before changing your email."
      />
    </PageContainer>
  );
}

export default AccountPage;
