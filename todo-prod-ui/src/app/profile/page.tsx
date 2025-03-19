import ProfileForm from "@/components/Forms/ProfileForm";
import userByAuth from "@/hooks/userByAuth";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "NotesApp | Profile",
  };
};

const page = async () => {
  const { data, isError } = await userByAuth();

  if (isError) {
    return null;
  }
  return (
    <>
      <ProfileForm data={data} />
    </>
  );
};

export default page;
