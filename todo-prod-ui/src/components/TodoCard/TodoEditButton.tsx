import { todoRefetchAction } from "@/hooks/action/action";
import editTodoItem from "@/hooks/todoItems/editTodoItem";
import { EditAddTodoSchemaType, TodoType } from "@/lib/types";
import { editAddTodoSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type TodoEditButtonProps = {
  data: TodoType;
};

const TodoEditButton = ({ data }: TodoEditButtonProps) => {
  const rhForm = useForm<EditAddTodoSchemaType>({
    defaultValues: {
      todoTitle: data.todoTitle,
      todoContent: data.todoContent,
    },
    resolver: zodResolver(editAddTodoSchema),
    mode: "all",
  });

  const editAddTodoFunction = async (fdata: EditAddTodoSchemaType) => {
    const { success, message } = await editTodoItem(data, fdata);
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
        <Dialog>
          <DialogTrigger asChild={true}>
            <Button variant={"default"} size={"icon"}>
              <Pencil />
            </Button>
          </DialogTrigger>

          <DialogContent aria-describedby={undefined} className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>EDit Todo</DialogTitle>
            </DialogHeader>
            <div className="flex w-full items-center space-x-2">
              <Form {...rhForm}>
                <form
                  onSubmit={rhForm.handleSubmit(editAddTodoFunction)}
                  className="w-full"
                >
                  <div className="space-y-6">
                    <FormField
                      control={rhForm.control}
                      name="todoTitle"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Input
                              placeholder="Title"
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={rhForm.control}
                      name="todoContent"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Input
                              placeholder="content..."
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogClose asChild>
                      <Button
                        size={"icon"}
                        className="w-full"
                        type="submit"
                        disabled={!rhForm.formState.isValid}
                      >
                        {rhForm.formState.isSubmitting ? (
                          <Loader2Icon className="animate-spin" />
                        ) : (
                          <Plus />
                        )}
                      </Button>
                    </DialogClose>
                  </div>
                </form>
              </Form>
            </div>
            {/* <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TodoEditButton;
