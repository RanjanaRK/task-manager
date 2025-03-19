import AddTodoForm from "@/components/Forms/AddTodoForm";
import TodoContent from "@/components/TodoCard/TodoContent";
import getAllTodo from "@/hooks/todoItems/getAllTodo";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "NotesApp | Home",
  };
};

const page = async () => {
  const { data, isError, error } = await getAllTodo();

  console.log(data);
  if (isError) {
    console.log(error);

    return null;
  }

  return (
    <>
      <section className="space-y-3">
        <AddTodoForm />

        <div className="flex flex-col gap-6">
          {data?.map((i) => {
            return <TodoContent key={i.id} todoData={i} />;
          })}
        </div>
      </section>
    </>
  );
};

export default page;
