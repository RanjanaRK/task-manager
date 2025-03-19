import Link from "next/link";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";
import UserHeader from "./UserHeader";

const Navbar = () => {
  return (
    <>
      <div className="border">
        <div className="sticky mx-auto flex max-w-screen-xl items-center justify-between gap-3 p-4 backdrop-blur">
          <Link href={"/"} className="text-2xl font-bold">
            NotesApp
          </Link>
          <div className="flex items-center gap-3">
            <LogoutButton>
              <UserHeader />
            </LogoutButton>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
