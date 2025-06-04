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
  const [searchDataList, setSearchDataList] = useState(todos);
  const [isAssending, setIsAssending] = useState(true);

  const handleCheck = (selectedItem) => {
    const newItem = data.map((item) => {
      return item.id === selectedItem.id
        ? { ...item, isComplete: !item.isComplete }
        : item;
    });
    setData(newItem);
    setSearchDataList(newItem);
  };

  const handleAddTodo = () => {
    if (title === "") {
      setMsg("Please add todo");
    } else {
      const newTodo = {
        id: Date.now(),
        title: title,
        isComplete: false,
      };
      setData([...data, newTodo]);
      setSearchDataList([...data, newTodo]);
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
    setSearchDataList(newItem);
    toast("Todo updated successfully");
    setTitle("");
    setSelected({});
  };

  const handleDelete = (deleteItem) => {
    const newDeleteItem = data.filter((item) => {
      return item.id != deleteItem.id;
    });
    setData(newDeleteItem);
    setSearchDataList(newDeleteItem);
  };

  const handleSearch = (e) => {
    const newData = data.filter((item) => {
      return (
        item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    setSearchDataList(newData);
  };

  const handleShortByTitle =() => {
    const sortedItems = [...data.sort((a,b)=>
      isAssending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      
    )] 

    setSearchDataList(sortedItems);
    setIsAssending(!isAssending);
  }
 
  const handleShortById =() => {
    const sortedItems = [...data.sort((a,b)=>
      isAssending ? a.id - b.id : b.id - a.id
    )] 

    setSearchDataList(sortedItems);
    setIsAssending(!isAssending);
  }

  return (
    <div className="page">
      <div className="max-w-4xl mx-auto p-10 bg-white mt-10 rounded-2xl">
        <h1 className="text-center text-4xl font-bold mb-8">Todo App</h1>
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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-center text-2xl font-bold">Todo List</h1>
            <button type="button" className=" border px-3 py-1 rounded-md cursor-pointer" onClick={handleShortByTitle}>
              sort by title
            </button>
            <button type="button" className=" border px-3 py-1 rounded-md cursor-pointer" onClick={handleShortById}>
              sort by id
            </button>
          </div>
          <div className="mb-5">
            <div className="flex mb-1">
              <input
                type="text"
                placeholder="Search todo"
                onChange={handleSearch}
                className=" flex-auto border p-2 rounded-md"
              />
            </div>
          </div>
        </div>
        <ul className="list-none">
          {searchDataList.map((item) => (
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
