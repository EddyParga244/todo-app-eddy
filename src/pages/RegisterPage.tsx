import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { validatePassword } from "@/utils/validatePassword";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const { Register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    try {
      setPasswordError("");
      await Register(email, password);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center font-josefin">
        <Card className="flex w-full max-w-lg flex-col gap-6 bg-gray-50 p-6 dark:bg-navy-900">
          <CardHeader>
            <CardTitle className="text-navy-850 dark:text-purple-100">
              Register your account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-purple-600">
              Enter your email below to register your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="w-full max-w-md p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-navy-850 dark:text-purple-100"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="m@example.com"
                  required
                  className="border-purple-300 bg-gray-50 dark:border-purple-800 dark:bg-navy-900"
                />
              </div>

              <div className="flex items-center">
                <Link
                  className="ml-auto inline-block text-sm text-navy-850 underline-offset-4 hover:underline dark:text-purple-100"
                  to="/login"
                >
                  Already have an account?
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="password"
                  className="text-navy-850 dark:text-purple-100"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="border-purple-300 bg-gray-50 dark:border-purple-800 dark:bg-navy-900"
                />
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-6 w-full cursor-pointer bg-green-600 text-white hover:bg-green-400"
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
};
