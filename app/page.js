"use client";

import { use, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "@/app/globals.css";
import "@/app/page.css";

const todos = [
  {
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    isComplete: false,
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    isComplete: true,
  },
  {
    id: 3,
    title: "fugiat veniam minus",
    isComplete: false,
  },
  {
    id: 4,
    title: "et porro tempora",
    isComplete: true,
  },
  {
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    isComplete: false,
  },
];

export default function Home() {
  const [data, setData] = useState(todos);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [selected, setSelected] = useState({});

  const handleCheck = (selectedItem) => {
    const newItem = data.map((item) => {
      return item.id === selectedItem.id
        ? { ...item, isComplete: !item.isComplete }
        : item;
    });
    setData(newItem);
  };

  const handleAddTodo = () => {
    if (title === "") {
      setMsg("Please add todo");
    } else {
      const newTodo = {
        id: data.length + 1,
        title: title,
        isComplete: false,
      };
      setData([...data, newTodo]);
      toast("Todo added successfully");
      setTitle("");
      setMsg("");
    }
  };

  const handleAddInput = (e) => {
    setTitle(e.target.value);
    setMsg("");
  };

  const handleEdit = (editItem) => {
    setTitle(editItem.title);
    setSelected(editItem);
  };

  const handleUpdate = () => {
    const newItem = data.map((item) => {
      return item.id === selected.id ? { ...item, title: title } : item;
    });
    setData(newItem);
    toast("Todo updated successfully");
    setTitle("");
    setSelected({});
  };

  const handleDelete = (deleteItem) => {
    const newDeleteItem = data.filter(item=>{
      return item.id != deleteItem.id
    })
    setData(newDeleteItem);
  };

  return (
    <div className="page">
      <div className="max-w-4xl mx-auto p-10 bg-white mt-10 rounded-2xl">
        <h1 className="text-center text-4xl font-bold mb-8">Todo List</h1>
        <div className="mb-5">
          <div className="flex mb-1">
            <ToastContainer />
            <input
              type="text"
              placeholder="Enter your todo"
              value={title}
              onChange={handleAddInput}
              className=" flex-auto border p-2 rounded-tl-md rounded-bl-md"
            />
            {!selected.id ? (
              <button
                onClick={handleAddTodo}
                className=" bg-green-600 p-2 text-white rounded-tr-md rounded-br-md cursor-pointer"
              >
                Add Todo
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className=" bg-green-600 p-2 text-white rounded-tr-md rounded-br-md cursor-pointer"
              >
                Update Todo
              </button>
            )}
          </div>
          {msg && <p className=" text-red-600">{msg}</p>}
        </div>
        <ul className="list-none">
          {data.map((item) => (
            <li
              className="bg-purple-200 mb-2 rounded-sm p-2 flex gap-2 justify-between items-center"
              key={item.id}
            >
              <div className="flex gap-2 items-center flex-auto">
                <input
                  type="checkbox"
                  onChange={() => handleCheck(item)}
                  checked={item.isComplete}
                  className="cursor-pointer"
                />
                <p className={item.isComplete ? "line-through" : ""}>
                  {item.title}
                </p>
              </div>
              <div
                className={`${
                  item.isComplete ? "bg-green-800" : "bg-purple-500"
                } whitespace-nowrap p-2 rounded-sm text-white`}
              >
                Status: {item.isComplete ? "Completed" : "Pending"}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className=" bg-cyan-500 p-2 text-white rounded-md cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className=" bg-red-600 p-2 text-white rounded-md cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
