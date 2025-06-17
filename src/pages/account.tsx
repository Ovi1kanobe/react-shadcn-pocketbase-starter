import { OAuthButton } from "@/components/auth/oauth-button";
import LabeledActionBlock from "@/components/core/labeled-action-block";
import PageContainer from "@/components/core/page-container";
import ToggleCard from "@/components/core/toggle-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalDialog } from "@/hooks/useGlobalDialog";
import { ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function AccountPage() {
  const { user, requestEmailChange, externalAuths, unlinkExternalAuth, updateUser } = useAuth();
  const dialog = useGlobalDialog();
  const [newEmail, setNewEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onConfirmChangeEmail = () => {
    navigate("/logout");
  };

  const onOpenEmailChangeForm = () => {
    setNewEmail("");
    setEmailConfirm("");
    dialog.openDialog({
      title: "Change Email",
      content: () => (
        <>
          <Label>New email address</Label>
          <Input
            type="email"
            placeholder="New email address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full"
          />
          <Label className="mt-2">Confirm new email address</Label>
          <Input
            type="email"
            placeholder="Confirm new email address"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            className="w-full"
          />
          {newEmail !== emailConfirm && emailConfirm !== "" && (
            <p className="mt-2 text-sm text-red-600">
              Email addresses do not match. Please ensure both fields are the same.
            </p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            Please enter your new email address. A confirmation email will be sent to this address.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Note: You must confirm the change via the email sent to your new address.
          </p>
        </>
      ),
      confirmLabel: "Save",
      cancelLabel: "Cancel",
      onConfirm: onSaveNewEmail,
      onCancel: () => {
        setNewEmail("");
        setEmailConfirm("");
      },
    });
  };

  const onSaveNewEmail = () => {
    if (newEmail === user?.email) {
      toast.error("You must change your email address to update it.");
      return;
    }
    if (newEmail !== emailConfirm && emailConfirm !== "") {
      toast.error("Email addresses do not match. Please ensure both fields are the same.");
      return;
    }
    requestEmailChange(
      newEmail,
      () => {
        toast.error("Failed to update email. Please try again.");
      },
      () => {
        dialog.openDialog({
          title: "Email Change Requested",
          description:
            "A confirmation email has been sent to your new email address. Please check your inbox and follow the instructions to complete the change. Then click OK to once you have confirmed the change.",
          confirmLabel: "OK",
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
