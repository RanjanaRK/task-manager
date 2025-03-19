"use client";

import userLogout from "@/hooks/userLogout";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../ui/button";

type LogoutButtonProps = {
  children: ReactNode;
};

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const logoutFn = async () => {
    await userLogout();

    push("/auth/login");
  };

  if (pathname === "/" || pathname === "/profile") {
    return (
      <>
        {children}
        <Button variant={"destructive"} size={"icon"} onClick={logoutFn}>
          <LogOut />
        </Button>
      </>
    );
  }
};

export default LogoutButton;
