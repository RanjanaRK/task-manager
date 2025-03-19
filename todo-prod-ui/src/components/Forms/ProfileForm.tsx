"use client";

import { profileUpdateAction } from "@/hooks/action/action";
import userUpdateForm from "@/hooks/userUpdateForm";
import { ProfileSchemaType } from "@/lib/types";
import { profileSchema } from "@/lib/zodSchema";
import { User } from "@directus/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type ProfileFormProps = {
  data: User | null;
};

const ProfileForm = ({ data }: ProfileFormProps) => {
  const rhForm = useForm<ProfileSchemaType>({
    defaultValues: {
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      email: data?.email || "",
    },
    resolver: zodResolver(profileSchema),
    mode: "all",
  });

  const updateUserForm = async (fdata: ProfileSchemaType) => {
    if (
      data?.email === fdata.email &&
      data?.first_name === fdata.first_name &&
      data?.last_name === fdata.last_name
    ) {
      toast.warn("Already Updated!");

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      const { success, message } = await userUpdateForm(fdata);

      if (!success) {
        toast.error(message);
      }

      if (success) {
        toast.success(message);

        await profileUpdateAction();
      }
    }
  };

  return (
    <>
      <Form {...rhForm}>
        <form
          onSubmit={rhForm.handleSubmit(updateUserForm)}
          className="grid h-screen place-items-center"
        >
          <Card className="w-[320px]">
            <CardHeader>
              <CardTitle className="text-center font-bold">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={rhForm.control}
                name="first_name"
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
                name="last_name"
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
                  "Update"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
