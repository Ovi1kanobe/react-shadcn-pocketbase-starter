import { Button } from "../ui/button";
import { oauthProviderIcon } from "./provider-icons";

interface OAuthButtonProps {
  provider: string;
  onClick: (provider: string) => void;
  disabled?: boolean;
}

export function OAuthButton({ provider, onClick, disabled }: OAuthButtonProps) {
  const icon = oauthProviderIcon(provider);
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);
  return (
    <Button type="button" className="w-full" variant={"outline"} onClick={() => onClick(provider) } disabled={disabled}>
      {icon}
      {label}
    </Button>
  );
}
