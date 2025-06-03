"use client";

import { useState } from "react";
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

  const handleCheck = (selectedItem) => {
    const newItem = data.map((item) => {
      return item.id === selectedItem.id
        ? { ...item, isComplete: !item.isComplete }
        : item;
    });
    setData(newItem);
  };
  return (
    <div className="page">
      <div className="max-w-xl mx-auto p-10 bg-white mt-10 rounded-2xl">
        <h1 className="text-center text-4xl font-bold mb-8">Todo List</h1>
        <ul className="list-none">
          {data.map((item) => (
            <li
              className="bg-purple-200 mb-2 rounded-sm p-2 flex justify-between items-center"
              key={item.id}
            >
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  onChange={() => handleCheck(item)}
                  checked={item.isComplete}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
