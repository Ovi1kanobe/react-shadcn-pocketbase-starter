import { OAuthButton } from "@/components/auth/oauth-button";
import LabeledActionBlock from "@/components/core/labeled-action-block";
import PageContainer from "@/components/core/page-container";
import ToggleCard from "@/components/core/toggle-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ChangeEmailForm from "@/components/forms/change-email";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalDialog } from "@/hooks/useGlobalDialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function AccountPage() {
  const { user, externalAuths, updateUser, sendVerificationEmail } = useAuth();
  const dialog = useGlobalDialog();
  const navigate = useNavigate();

  const onConfirmChangeEmail = () => {
    navigate("/logout");
  };

  const onOpenEmailChangeForm = () => {
    dialog.openDialog({
      content: () => (
        <ChangeEmailForm onSubmit={dialog.closeDialog} onSuccess={onEmailChangeRequested} />
      ),
    });
  };

  const onSendVerificationEmail = () => {
    sendVerificationEmail(
      () => {
        toast.error("Failed to send verification email. Please try again.");
      },
      () => {
        toast.success("Verification email sent successfully.");
      }
    );
  };

  const onEmailChangeRequested = () => {
    dialog.openDialog({
      content: () => (
        <>
          <h3 className="text-lg font-semibold">Email Change Requested</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A confirmation email has been sent to your new email address. Please check your inbox
            and follow the instructions to complete the change. Then click OK once you have
            confirmed.
          </p>
          <div className="pt-4 flex justify-end">
            <Button onClick={onConfirmChangeEmail}>OK</Button>
          </div>
        </>
      ),
    });
  };

  const onToggleEmailVisibility = (checked: boolean) => {
    updateUser(
      {
        emailVisibility: checked,
      },
      () => {
        toast.error("Failed to update email visibility. Please try again.");
      },
      () => {
        toast.success("Email visibility updated successfully.");
      }
    );
  };

  if (!user || !externalAuths) {
    return null;
  }

  return (
    <PageContainer>
      <LabeledActionBlock
        title="Email Address"
        description={user.email + ` (${user.verified ? "Verified" : "Not Verified"})`}
        actionLabel="Change"
        onActionClick={onOpenEmailChangeForm}
        disabled={externalAuths.length > 0}
        disabledReason="You cannot change your email address while external authentication methods are linked."
      />
      {!user.verified && (
        <LabeledActionBlock
          title="Email Verification"
          description="Your email is not verified."
          actionLabel="Send Verification Email"
          onActionClick={onSendVerificationEmail}
        />
      )}
      <LinkedAuthenticationMethods />
      <ToggleCard
        label="Email Visibility"
        information="Do you want your email address to be visible to the application?"
        checked={user.emailVisibility}
        onCheckedChange={onToggleEmailVisibility}
      />
    </PageContainer>
  );
}

export default AccountPage;

function LinkedAuthenticationMethods() {
  const { externalAuths, unlinkExternalAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const onRemoveOAuthProvider = async (id: string) => {
    unlinkExternalAuth(
      id,
      () => {
        toast.error("Failed to remove external authentication method. Please try again.");
      },
      () => {
        toast.success("External authentication method removed successfully.");
      }
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">Linked External Authentication Methods</h3>
        <CardDescription>Manage your linked external authentication methods.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {isOpen ? "Hide" : "Show"} Linked Methods
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {externalAuths && externalAuths.length > 0 ? (
              externalAuths.map((auth) => (
                <div
                  className="flex flex-row w-full items-center justify-between space-x-2"
                  key={auth.id}
                >
                  <div className="w-1/12 bg-gray-400 h-[2px] rounded-3xl" />
                  <OAuthButton
                    disabled
                    provider={auth.provider}
                    className="w-3/4"
                    onClick={() => {}}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemoveOAuthProvider(auth.id)}
                    className=""
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <p>No external authentication methods linked.</p>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
