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

export const TodoSettings = () => {
  const { Logout, clearAuth } = useAuth();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const handleLogout = () => {
    try {
      Logout();
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
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
      <DropdownMenuContent className="flex flex-col gap-2 border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0">
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current and new password
              </DialogDescription>
            </DialogHeader>
            <Label>Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />

            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                WARNING: This action is permanent!
              </DialogDescription>
            </DialogHeader>
            <Label>Password</Label>
            <Input
              type="password"
              value={deletePassword}
              onChange={(event) => setDeletePassword(event.target.value)}
            />
            <DialogFooter>
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
