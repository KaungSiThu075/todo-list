import React, { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";

type TodoItem = {
  text: string;
  isCompleted: boolean;
  isSearched: boolean;
};

export default function TodoApp() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const [todo, setTodo] = useState<string>("");

  const [searchWord, setSearchWord] = useState("");

  const Texting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const AddingTodo = () => {
    if (todo.length) {
      setTodoList([
        {
          text: todo,
          isCompleted: false,
          isSearched: false,
        },
        ...todoList,
      ]);
      setTodo("");
      console.log(todoList);
    } else {
      setTodoList(todoList);
    }
  };

  const ToggleTodo = (ID: number) => {
    const newTodoList = todoList.map((item: TodoItem, index) => {
      if (index === ID) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTodoList(newTodoList);
  };

  const DeleteTodo = (ID: number) => {
    const newTodo = todoList
      .map((t) => {
        return t;
      })
      .filter((t, index) => ID !== index);

    console.log(newTodo);
    setTodoList(newTodo);
  };

  const Searching = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const filteredList = todoList.filter((item: TodoItem) => {
      if (
        item.text.toLocaleUpperCase().indexOf(inputValue.toLocaleUpperCase()) >
        -1
      ) {
        return item;
      }
    });

    const otherList = todoList.filter((item: TodoItem) => {
      if (
        item.text.toLocaleUpperCase().indexOf(inputValue.toLocaleUpperCase()) <=
        -1
      ) {
        return item;
      }
    });

    const filteredTodoList = [...filteredList, ...otherList];

    setTodoList(filteredTodoList);

    setSearchWord(inputValue);
  };

  return (
    <div>
      <h1 className=" my-1.5 text-center text-3xl font-medium">Todo List</h1>
      <div
        className=" flex  
        xs:flex-col gap-3 items-center 
        md:flex-row px-8
        lg:px-12
         xl:px-14
       "
      >
        <input
          onChange={Texting}
          value={todo}
          type="text"
          className=" outline outline-sky-500 focus:outline-none hover:cursor-pointer hover:bg-slate-100 focus:outline-sky-300 rounded-2xl p-1 shadow-sm
          xs:w-11/12
          sm:w-11/12"
        />

        <button
          className=" bg-sky-500 py-1 px-2 rounded-xl text-slate-200  hover:text-white
          md:text-sm"
          onClick={AddingTodo}
        >
          Add to List
        </button>

        <button
          className=" bg-red-500 py-1 px-2 rounded-xl text-slate-200  hover:text-white
          md:text-sm"
          onClick={() => setTodoList([])}
        >
          Clear all TodoList
        </button>
      </div>

      <div
        className=" flex items-center justify-center 
      xs:my-4"
      >
        <input
          onChange={Searching}
          value={searchWord}
          className="  outline outline-sky-500 focus:outline-none hover:cursor-pointer hover:bg-slate-100 focus:outline-sky-300 rounded-2xl p-1
          xs:w-4/5
          md:w-11/12"
          type="text"
          placeholder="Sort Filter Todo List Box"
        />
        <RxCross1 className=" mx-1" onClick={() => setSearchWord("")} />
      </div>

      <div>
        {!todoList.length && (
          <p className=" xs:text-center">
            Life is a journey. Let's take a walk mate...
          </p>
        )}
        {!!todoList.length &&
          todoList.map((item, index) => {
            return (
              <div
                key={index}
                className=" flex justify-center items-center gap-4"
              >
                {item.isCompleted ? (
                  <ImCross
                    className=" text-red-500"
                    onClick={() => ToggleTodo(index)}
                  />
                ) : (
                  <FaCheck
                    className=" text-sky-500"
                    onClick={() => ToggleTodo(index)}
                  />
                )}

                <p className={item.isCompleted ? ` line-through` : ""}>
                  {item.text}
                </p>
                <FaTrash
                  className=" text-red-500"
                  onClick={() => DeleteTodo(index)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
