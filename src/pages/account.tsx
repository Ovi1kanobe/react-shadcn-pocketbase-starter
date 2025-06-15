import EditableTextCard from "@/components/core/editable-text-card";
import PageContainer from "@/components/core/page-container";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AccountPage() {
  const { user, requestEmailChange } = useAuth();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!user) return;
    setEmail(user.email);
  }, [user]);

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
      />
    </PageContainer>
  );
}

export default AccountPage;
