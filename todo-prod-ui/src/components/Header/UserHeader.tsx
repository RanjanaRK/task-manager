import userByAuth from "@/hooks/userByAuth";
import Link from "next/link";

const UserHeader = async () => {
  const { data } = await userByAuth();

  return (
    <>
      <Link href={"/profile"} className="capitalize">
        Hey {data?.first_name}
      </Link>
    </>
  );
};

export default UserHeader;
