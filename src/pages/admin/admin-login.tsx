import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Link } from "react-router";

function AdminLoginPage() {
  const { loginWithPassword } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginWithPassword(
      email,
      password,
      (error) => {
        toast.error(error.response.message);
      },
      () => {}
    );
  };

  return (
    <div className="h-screen flex flex-row w-screen gap-1 justify-center ">
      <div className="w-full flex items-center justify-center ">
        <Card className="p-6 py-12">
          <CardTitle className="font-bold text-center text-xl">Admin Login</CardTitle>
          <CardDescription>Enter your admin credentials below to log in.</CardDescription>

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
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Link to="/login" className="text-sm text-blue-600 font-semibold hover:underline">
              <span className="cursor-pointer">Not an admin? Click here for user login.</span>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AdminLoginPage;
