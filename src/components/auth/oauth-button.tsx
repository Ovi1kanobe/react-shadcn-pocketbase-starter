import { Button } from "../ui/button";
import { oauthProviderIcon } from "./provider-icons";

type OAuthButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: string;
  onClick: (provider: string) => void;
  disabled?: boolean;
}

export function OAuthButton({ provider, onClick, disabled, ...props }: OAuthButtonProps) {
  const icon = oauthProviderIcon(provider);
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);
  return (
    <Button
      type="button"
      className=""
      variant={"outline"}
      onClick={() => onClick(provider)}
      disabled={disabled}
      {...props}
    >
      {icon}
      {label}
    </Button>
  );
}
