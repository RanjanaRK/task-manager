"use client";

import userRegister from "@/hooks/userRegister";
import { RegisterSchemaType } from "@/lib/types";
import { registerSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const RegisterForm = () => {
  const { push } = useRouter();

  const rhForm = useForm<RegisterSchemaType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const loginHandleFunction = async (fdata: RegisterSchemaType) => {
    const { success, message } = await userRegister(fdata);

    console.log(message);

    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);
      push("/auth/login");
    }
  };

  return (
    <>
      <Form {...rhForm}>
        <form
          onSubmit={rhForm.handleSubmit(loginHandleFunction)}
          className="grid h-screen place-items-center"
        >
          <Card className="w-[320px]">
            <CardHeader>
              <CardTitle className="text-center font-bold">
                Register here
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={rhForm.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={rhForm.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={rhForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={rhForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                type="submit"
                disabled={
                  !rhForm.formState.isValid || rhForm.formState.isSubmitting
                }
              >
                {rhForm.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
              <Separator />
            </CardContent>
            <CardFooter className="justify-center">
              <div className="">
                Already have registered?
                <Link href={"/auth/login"} className="font-bold">
                  {" "}
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
