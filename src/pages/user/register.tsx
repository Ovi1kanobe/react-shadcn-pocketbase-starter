import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { PasswordStrength } from "../../components/auth/password-strength";

function RegisterPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    auth.register(
      email,
      password,
      confirmPassword,
      (error) => {
        if (error.status === 400) {
          toast.error("User already exists");
          return;
        }
        toast.error(error.response.message);
      },
      () => {
        navigate("/login", { replace: true });
      }
    );
  };

  return (
    <div className="h-screen flex flex-row w-screen gap-1 justify-center">
      <div className="w-full flex items-center justify-center">
        <Card className="p-6 py-12">
          <CardTitle className="font-bold text-center text-xl">Create an account</CardTitle>
          <CardDescription>Enter your email and password below to register.</CardDescription>
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

              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
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
              <Button className="w-full" type="submit">
                Register
              </Button>
            </form>
            <PasswordStrength password={password} />
          </CardContent>
          <CardFooter>
            <Link to="/login" className="text-sm text-blue-600 font-semibold hover:underline">
              <span className="cursor-pointer">Already have an account? Click here to login.</span>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
