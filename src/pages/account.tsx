import { OAuthButton } from "@/components/auth/oauth-button";
import EditableTextCard from "@/components/core/editable-text-card";
import PageContainer from "@/components/core/page-container";
import ToggleCard from "@/components/core/toggle-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/hooks/useAuth";
import { useClient } from "@/hooks/useClient";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { ChevronsUpDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AccountPage() {
  const {
    user,
    requestEmailChange,
    externalAuths,
    fetchCurrentUser,
    unlinkExternalAuth,
    updateUser,
  } = useAuth();
  const { pb } = useClient();
  const confirmDialog = useConfirmDialog();
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onConfirmChangeEmail = () => {
    fetchCurrentUser(
      () => {
        toast.error("error fetching user after email change. Please try again.");
      },
      () => {
        // User will be logged out after email change, so we need to redirect to login and make sure the user is aware that they will be logged in.
      }
    );
  };

  useEffect(() => {
    if (!user) return;
    setEmail(user.email);
  }, [user, pb]);

  const onSaveNewEmail = () => {
    if (email === user?.email) {
      toast.error("You must change your email address to update it.");
      return;
    }
    requestEmailChange(
      email,
      () => {
        toast.error("Failed to update email. Please try again.");
      },
      () => {
        confirmDialog.openDialog({
          title: "Email Change Requested",
          description:
            "A confirmation email has been sent to your new email address. Please check your inbox and follow the instructions to complete the change. Then click OK to once you have confirmed the change.",
          confirmLabel: "OK",
          cancelLabel: null,
          onConfirm: onConfirmChangeEmail,
        });
      }
    );
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

  if (!user || !externalAuths) {
    return null;
  }

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

  return (
    <PageContainer>
      <EditableTextCard
        label="Email address"
        value={email}
        onChange={setEmail}
        onSave={onSaveNewEmail}
        description="Change your email address. A confirmation email will be sent to the new address."
        disabled={externalAuths.length > 0} // Disable changing email addresses if external auths are linked
        disabledReason="You have linked external authentication methods. Please unlink them before changing your email."
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
                  <div className="group relative flex items-center justify-end" key={auth.provider}>
                    <OAuthButton
                      provider={auth.provider}
                      onClick={() => {}}
                      disabled={true}
                      key={auth.provider}
                    />
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
