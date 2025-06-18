import { Button } from "../ui/button";
import { oauthProviderIcon } from "./provider-icons";

type OAuthButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: string;
  disabled?: boolean;
};

export function OAuthButton({ provider, disabled, ...props }: OAuthButtonProps) {
  const icon = oauthProviderIcon(provider);
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);
  return (
    <Button type="button" className="" variant={"outline"} disabled={disabled} {...props}>
      {icon ?? "error"}
      {label}
    </Button>
  );
}
