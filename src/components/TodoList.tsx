import React from "react";
import { Todo } from "../hooks/useTodo";
import TodoItem from "./TodoItem";
import Text from "./default/Text";

type TodoListProps = {
  todoItems: Todo[];
  handleDeleteItem: (id: number) => void;
  handleChangeCheckbox: (id: number) => void;
  handleEditItem: (id: number) => void;
  count: number;
};
const TodoList: React.FC<TodoListProps> = ({
  todoItems,
  handleChangeCheckbox,
  handleEditItem,
  handleDeleteItem,
  count,
}) => {
  return (
    <div className="todo-item-container">
      {/* <h1 className="header">TODO LIST</h1> */}
      <Text
        color="info"
        fontSize="4xl"
        fontWeight="extraBold"
        label="Todolist"
      />
      {count > 0 && (
        // <p style={{ color: "white" }}>{count}Tasks</p>
        <Text
          color="secondary"
          fontSize="xl"
          fontWeight="regular"
          label={`${count} tasks`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z"
                clipRule="evenodd"
              ></path>
            </svg>
          }
        />
      )}

      <ul>
        {todoItems.map((items) => (
          <TodoItem
            key={items._id}
            items={items}
            handleChangeCheckbox={handleChangeCheckbox}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
