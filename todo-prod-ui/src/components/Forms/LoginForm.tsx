"use client";

import userLogin from "@/hooks/userLogin";
import { LoginSchemaType } from "@/lib/types";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Separator } from "../ui/separator";

const LoginForm = () => {
  const { push } = useRouter();

  const rhForm = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const loginHandleFunction = async (fdata: LoginSchemaType) => {
    const { success, message } = await userLogin(fdata);

    console.log(message);

    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);
      push("/");
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
                Log in to continue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  "Login"
                )}
              </Button>
              <Separator />
            </CardContent>
            <CardFooter className="justify-center">
              <div className="">
                Not registered yet?
                <Link href={"/auth/register"} className="font-bold">
                  {" "}
                  Register
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
