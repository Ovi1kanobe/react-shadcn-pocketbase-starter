import EditableTextCard from "@/components/core/editable-text-card";
import PageContainer from "@/components/core/page-container";
import { useAuth } from "@/hooks/useAuth";
import { useClient } from "@/hooks/useClient";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AccountPage() {
  const { user, requestEmailChange, externalAuths } = useAuth();
  const { pb } = useClient();
  const [email, setEmail] = useState("");

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
        toast.success(
          "Email updated successfully! Please check your inbox for a confirmation email."
        );
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
