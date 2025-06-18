// src/pages/login.tsx
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { OAuthButton } from "@/components/auth/oauth-button";
import { useAuth } from "@/hooks/useAuth";
import { InputOTPForm } from "@/components/auth/otp-form";
import { type AuthMethodsList } from "pocketbase";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

function LoginPage() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [showOTPForm, setShowOTPForm] = useState<boolean>(false);
  const [otpId, setOtpId] = useState<string | undefined>(undefined);
  const [mfaId, setMfaId] = useState<string | undefined>(undefined);
  const [authMethods, setAuthMethods] = useState<AuthMethodsList | undefined>(undefined);

  useEffect(() => {
    auth.fetchAuthMethods(
      (error) => {
        toast.error(error.response.message);
      },
      (authMethods) => {
        setAuthMethods(authMethods);
      }
    );
  }, [auth]);

  const queryParams = new URLSearchParams(window.location.search);
  const oneTimeCode = queryParams.get("code") ?? undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.loginWithPassword(
      email,
      password,
      (error) => {
        const mfaId = error.response.mfaId;
        if (!mfaId) {
          toast.error(error.response.message);
          setShowForgotPassword(true);
          return;
        }
        setMfaId(mfaId);
        auth.requestOTP(
          email,
          (error) => {
            toast.error(error.response.message);
          },
          (res) => {
            toast.success("OTP sent to your email");
            setShowOTPForm(true);
            setOtpId(res);
          }
        );
      },
      () => {}
    );
  };

  const handleOAuth = async (provider: string) => {
    auth.loginWithOAuth(
      provider,
      (error) => {
        if (error.response.mfaId) {
          toast.error("Internal server error");
          console.log("OAuth login returned an MFA ID. The server may be misconfigured.", error);
        } else {
          toast.error(error.response.message);
          setShowForgotPassword(true);
        }
      },
      () => {},
      oneTimeCode
    );
  };

  const handleOTP = async (otp: string) => {
    if (!otpId) {
      toast.error("OTP ID not found");
      return;
    }
    auth.loginWithOTP(
      otpId,
      otp,
      (error) => {
        toast.error(error.response.message);
      },
      () => {},
      mfaId
    );
  };

  const handleForgotPassword = async () => {
    auth.requestPasswordReset(
      email,
      (error) => {
        toast.error(error.response.message);
      },
      () => {
        toast.success("Password reset email sent");
        setShowForgotPassword(false);
      }
    );
  };

  return (
    <div className="h-screen flex flex-row w-screen gap-1 justify-center">
      <div className="w-full flex items-center justify-center">
        <Card className="p-6 py-12">
          <CardTitle className="font-bold text-center text-xl">Log in to your account</CardTitle>
          <CardDescription>Enter your email and password below to log in</CardDescription>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="max-w-sm flex flex-col gap-2 justify-center items-center"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*********"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </button>
              </div>
              {showForgotPassword && (
                <p
                  onClick={handleForgotPassword}
                  className="text-red-500 text-sm underline decoration-red-500 cursor-pointer"
                >
                  Forgot Password? Click Here to reset it.
                </p>
              )}
              <Button className="w-full" type="submit">
                Sign In with Email
              </Button>
              <div className="items-center gap-1 text-xs text-gray-500">
                <Separator />
                OR CONTINUE WITH
                <Separator />
              </div>
              {authMethods?.oauth2?.providers?.map((provider) => {
                return (
                  <OAuthButton
                    key={provider.name}
                    className="w-full"
                    provider={provider.name}
                    onClick={() => handleOAuth(provider.name)}
                  />
                );
              })}
            </form>
          </CardContent>
          <CardFooter>
            <Link to="/register" className="text-sm text-blue-600 font-semibold hover:underline">
              <span className="cursor-pointer">Dont have an account? Click here to register.</span>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <InputOTPForm open={showOTPForm} setOpen={setShowOTPForm} className="" onSubmit={handleOTP} />
    </div>
  );
}

export default LoginPage;
