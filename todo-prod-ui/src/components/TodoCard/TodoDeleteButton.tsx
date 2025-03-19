import { todoRefetchAction } from "@/hooks/action/action";
import deleteTodo from "@/hooks/todoItems/deleteTodo";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

type TodoDeleteButtonProps = {
  todoId: string;
};

const TodoDeleteButton = ({ todoId }: TodoDeleteButtonProps) => {
  const [load, setLoad] = useState(false);

  const deleteTodoFn = async () => {
    setLoad(true);

    const { success, message } = await deleteTodo(todoId);

    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);
      await todoRefetchAction();
    }

    setLoad(false);
  };

  return (
    <>
      <Button
        variant={"destructive"}
        size={"icon"}
        onClick={deleteTodoFn}
        disabled={load}
      >
        <Trash2 />
      </Button>
    </>
  );
};

export default TodoDeleteButton;
