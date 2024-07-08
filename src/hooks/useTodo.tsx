import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export type Todo = {
  _id?: number;
  text?: string;
  description: string;
  checked?: boolean;
  timeStamp?: string;
  title?: string;
  task?: string;
  completed?: boolean;
  userId?: number;
};

const useTodo = () => {
  const [items, setItems] = useState<Todo[]>([]);
  const [editItem, setEditItem] = useState<Todo | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchTodoList = async () => {
      const token = localStorage.getItem("key");

      const response = await axios.get("http://localhost:8000/api/todo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const todoItem = response.data;
      setItems(todoItem);
    };
    fetchTodoList();
  }, []);

  const format = () => {
    const date = new Date();

    const datePart = date.toLocaleDateString("en-Us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-Us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${datePart} | ${timePart}`;
    // const month = String(date.getMonth()).padStart(2,"0")
    // const day = String(date.getDate()).padStart(2,'0')
    // const hours = String(date.getHours()).padStart(2,'0')
    // const minutes = String(date.getMinutes()).padStart(2,'0')
    // const seconds = String(date.getSeconds()).padStart(2,'0')
    // return `${day}/${month} ${hours}:${minutes}`
  };

  const updateItems = useCallback(
    async (value: string, description: string) => {
      const token = localStorage.getItem("key");
      if (editItem) {
        try {
          const updatedTodo = {
            ...editItem,
            task: value,
            description,
          };
          const response = await axios.put(
            `http://localhost:8000/api/todo/${editItem._id}`,
            updatedTodo,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setItems((previousvalue) =>
            previousvalue.map((item) =>
              item._id === editItem._id ? updatedTodo : item
            )
          );
          setEditItem(null);
        } catch (error) {
          console.error("Error updating item:", error);
        }
      } else {
        const newTodo: Todo = {
          task: value,
          description,
          checked: false,
        };

        try {
          const response = await axios.post(
            "http://localhost:8000/api/todo",
            newTodo,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const createdTodo = response.data;
          setItems((previousValue) => [...previousValue, createdTodo]);
          setCount((prevValue) => prevValue + 1);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Error response:", error.response);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
    },
    [items, editItem]
  );

  // const updateItems = useCallback(
  //   async (value: string, description: string) => {
  //     if (editItem) {
  //       setItems((previousvalue) =>
  //         previousvalue.map(
  //           (item) =>
  //             item._id === editItem._id
  //               ? { ...item, task: value, description, timeStamp: format() }
  //               : item
  //           // item.id === editItem.id ? { ...item, text: value,description,timeStamp:format() } : item
  //         )
  //       );
  //       setEditItem(null);
  //     } else {
  //       const newTodo = {
  //         task: value,
  //         description,
  //       };
  //       const response = await axios.post(
  //         "http://localhost:8000/api/todo",
  //         newTodo,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "auth-token",
  //           },
  //         }
  //       );
  //       const createdTodo = response.data;
  //       console.log("createdTodo", createdTodo);
  //       setItems((previousValue) => [
  //         ...previousValue,
  //         createdTodo,
  //         // ...previousValue,
  //         // {
  //         //   _id: Date.now(),
  //         //   title: value,
  //         //   description,
  //         //   timeStamp: format(),
  //         //   checked: false,
  //         // },
  //       ]);
  //       setCount((prevValue) => prevValue + 1);
  //     }
  //   },
  //   [items, editItem]
  // );

  const handleChangeCheckbox = useCallback(
    async (id: number) => {
      const foundTodo = items.find((item) => item._id === id);
      if (!foundTodo) return;
      const updatedTodo = {
        ...foundTodo,
        checked: !foundTodo.checked,
      };
      try {
        const token = localStorage.getItem("key");
        const response = await axios.put(
          `http://localhost:8000/api/todo/${id}`,
          updatedTodo,
          {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("check", response);
        const toggledChecked = items.map((item) =>
          item._id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(toggledChecked);
      } catch (error) {
        console.log("Error Updating checkbox: ", error);
      }
    },
    [items]
  );

  const handleEditItem = useCallback(
    (id: number) => {
      const itemTodoEdit = items.find((item) => item._id === id);

      if (itemTodoEdit) {
        setEditItem(itemTodoEdit);
      }
    },
    [items]
  );

  const handleDeleteItem = useCallback(
    async (id: number) => {
      const token = localStorage.getItem("key");

      const itemTodoDelete = items.find((item) => item._id === id);
      if (!itemTodoDelete) return;
      const updateDeleteId = items.filter((item) => item._id !== id);
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (shouldDelete) {
        const response = await axios.delete(
          `http://localhost:8000/api/todo/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updateDeleteId = items.filter((item) => item._id !== id);
        setItems(updateDeleteId);
        setCount((prevValue) => {
          return prevValue - 1;
        });
      }
    },
    [items]
  );

  const resetEditItem = () => {
    setEditItem(null);
  };

  return {
    items,
    editItem,
    resetEditItem,
    updateItems,
    handleChangeCheckbox,
    handleEditItem,
    handleDeleteItem,
    count,
  };
};

export default useTodo;