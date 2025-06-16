import { Button } from "../ui/button";
import { oauthProviderIcon } from "./provider-icons";

interface OAuthButtonProps {
  provider: string;
  onClick: (provider: string) => void;
}

export function OAuthButton({ provider, onClick }: OAuthButtonProps) {
  const icon = oauthProviderIcon(provider);
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);
  return (
    <Button type="button" className="w-full" variant={"outline"} onClick={() => onClick(provider)}>
      {icon}
      {label}
    </Button>
  );
}
