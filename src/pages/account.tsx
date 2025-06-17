import { OAuthButton } from "@/components/auth/oauth-button";
import LabeledActionBlock from "@/components/core/labeled-action-block";
import PageContainer from "@/components/core/page-container";
import ToggleCard from "@/components/core/toggle-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ChangeEmailForm from "@/components/forms/change-email";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalDialog } from "@/hooks/useGlobalDialog";
import { ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function AccountPage() {
  const { user, externalAuths, unlinkExternalAuth, updateUser } = useAuth();
  const dialog = useGlobalDialog();
  const [isOpen, setIsOpen] = useState(false);
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
        description={user.email}
        actionLabel="Change"
        onActionClick={onOpenEmailChangeForm}
        disabled={externalAuths.length > 0}
        disabledReason="You cannot change your email address while external authentication methods are linked."
      />
      <Card className="">
        <CardHeader>
          <h3 className="text-lg font-semibold">Linked External Authentication Methods</h3>
          <CardDescription>
            <p className="text-sm text-muted-foreground">
              Manage your linked external authentication methods.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex w-[350px] flex-col gap-2"
          >
            <Badge variant={"outline"}>
              <div className="flex items-center justify-between gap-4 px-4">
                <h4 className="text-sm font-semibold">
                  See all linked external authentication methods
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronsUpDown />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
            </Badge>
            <CollapsibleContent className="flex flex-col gap-2">
              {externalAuths.length > 0 ? (
                externalAuths.map((auth) => (
                  <div className="group relative flex items-center justify-end" key={auth.id}>
                    <OAuthButton provider={auth.provider} onClick={() => {}} disabled />
                    <X
                      className="absolute cursor-pointer mr-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      onClick={() => onRemoveOAuthProvider(auth.id)}
                    />
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">
                  No external authentication methods linked.
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
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
