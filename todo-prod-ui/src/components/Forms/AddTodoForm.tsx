"use client";

import { todoRefetchAction } from "@/hooks/action/action";
import postTodoItem from "@/hooks/todoItems/postTodoItem";
import { AddTodoSchemaType } from "@/lib/types";
import { addTodoSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const AddTodoForm = () => {
  const rhForm = useForm<AddTodoSchemaType>({
    defaultValues: {
      todoTitle: "",
      todoContent: "",
    },
    resolver: zodResolver(addTodoSchema),
    mode: "all",
  });

  const addTodoFunction = async (fdata: AddTodoSchemaType) => {
    const { success, message } = await postTodoItem(fdata);

    if (!success) {
      toast.error(message);
    }
    if (success) {
      rhForm.reset();

      toast.success(message);

      await todoRefetchAction();
    }
  };

  return (
    <>
      <div className="">
        <Form {...rhForm}>
          <form onSubmit={rhForm.handleSubmit(addTodoFunction)}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
              <FormField
                control={rhForm.control}
                name="todoTitle"
                render={({ field }) => (
                  <FormItem className="col-span-1 sm:col-span-4">
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={rhForm.control}
                name="todoContent"
                render={({ field }) => (
                  <FormItem className="col-span-1 sm:col-span-7">
                    <FormControl>
                      <Input placeholder="content..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                size={"icon"}
                className="w-full"
                type="submit"
                disabled={!rhForm.formState.isValid}
              >
                {rhForm.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Plus />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddTodoForm;
