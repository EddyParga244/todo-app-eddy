import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { todoApi } from "@/api/todoApi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Trash, UserRoundPen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { validatePassword } from "@/utils/validatePassword";

export const TodoSettings = () => {
  const { Logout, clearAuth } = useAuth();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogout = () => {
    try {
      Logout();
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangePassword = async () => {
    const error = validatePassword(newPassword);
    if (error) {
      setPasswordError(error);
      return;
    }
    try {
      setPasswordError("");
      await todoApi.patch("/api/auth/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
      });
      clearAuth();
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await todoApi.delete("/api/auth/delete", {
        data: { password: deletePassword },
        withCredentials: true,
      });
      clearAuth();
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="fixed top-4 right-4 z-50 cursor-pointer"
        asChild
      >
        <Button variant="outline">
          <Settings
            size={20}
            className={
              isOpen
                ? "rotate-90 transition-transform duration-500"
                : "rotate-0 transition-transform duration-500"
            }
          ></Settings>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-full flex-row flex-wrap gap-2 border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 md:flex-col">
        <Button
          className="cursor-pointer bg-red-600 text-white"
          onClick={handleLogout}
        >
          <LogOut></LogOut> Logout
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer bg-red-600 text-white">
              <UserRoundPen></UserRoundPen> Change Password
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-50 dark:bg-navy-900">
            <DialogHeader>
              <DialogTitle className="flex w-full max-w-lg flex-col gap-6 text-navy-850 dark:text-purple-100">
                Change Password
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-purple-600">
                Enter your current and new password
              </DialogDescription>
            </DialogHeader>
            <Label className="text-navy-850 dark:text-purple-100">
              Current Password
            </Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="border-purple-300 bg-gray-50 dark:border-purple-800 dark:bg-navy-900"
            />

            <Label className="text-navy-850 dark:text-purple-100">
              New Password
            </Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="border-purple-300 bg-gray-50 dark:border-purple-800 dark:bg-navy-900"
            />
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
            <DialogFooter className="dark:bg-navy-950">
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
              <Button
                className="cursor-pointer bg-green-600 text-white"
                onClick={handleChangePassword}
              >
                Accept
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer bg-red-600 text-white">
              <Trash></Trash>Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-50 dark:bg-navy-900">
            <DialogHeader>
              <DialogTitle className="flex w-full max-w-lg flex-col gap-6 text-navy-850 dark:text-purple-100">
                Delete Account
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-purple-600">
                WARNING: This action is permanent!
              </DialogDescription>
            </DialogHeader>
            <Label className="text-navy-850 dark:text-purple-100">
              Password
            </Label>
            <Input
              type="password"
              value={deletePassword}
              onChange={(event) => setDeletePassword(event.target.value)}
              className="border-purple-300 bg-gray-50 dark:border-purple-800 dark:bg-navy-900"
            />
            <DialogFooter className="dark:bg-navy-950">
              <Button variant="outline">Cancel</Button>
              <Button
                className="cursor-pointer bg-red-600 text-white"
                onClick={handleDeleteAccount}
              >
                <Trash></Trash>Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
