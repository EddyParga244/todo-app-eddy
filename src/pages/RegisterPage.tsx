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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const { Register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await Register(email, password);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center font-josefin">
        <Card className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle>Register your account</CardTitle>
            <CardDescription>
              Enter your email below to register your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="m@example.com"
                required
              />
              <div className="flex items-center">
                <Link
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  to="/login"
                >
                  Already have an account?
                </Link>
              </div>
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <Button type="submit">Register</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
};
