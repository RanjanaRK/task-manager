import LoginForm from "@/components/Forms/LoginForm";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "NotesApp | auth | login",
  };
};

const page = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default page;
