"use client";

import { todoRefetchAction } from "@/hooks/action/action";
import todoCheckedToggle from "@/hooks/todoItems/todoCheckedToggle";
import { TodoType } from "@/lib/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import TodoDeleteButton from "./TodoDeleteButton";
import TodoEditButton from "./TodoEditButton";

type TodoContentProps = {
  todoData: TodoType;
};

const TodoContent = ({ todoData }: TodoContentProps) => {
  const [pending, setPending] = useState<boolean>(false);
  const [checkToggle, setCheckToggle] = useState<boolean>(false);

  const checkedToggle = async (checked: boolean) => {
    setPending(true);

    await todoCheckedToggle(todoData.id, checked);

    await todoRefetchAction();

    setPending(false);
    setCheckToggle(checked);
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="sm:item-center flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Checkbox
                  id="todoCheck"
                  className="accent-red-600"
                  value={`${todoData.todoCheck}`}
                  onCheckedChange={(c: boolean) => checkedToggle(c)}
                  disabled={pending}
                />
                <Label
                  className={`${todoData.todoCheck && "line-through opacity-40"} text-sm font-medium leading-none decoration-foreground decoration-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                  htmlFor="todoCheck"
                >
                  {todoData.todoTitle}
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                {todoData.todoContent}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              {checkToggle === false ? (
                <TodoEditButton data={todoData} />
              ) : (
                <Button variant={"default"} size={"icon"} disabled>
                  <Pencil />
                </Button>
              )}

              <TodoDeleteButton todoId={todoData.id} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TodoContent;
