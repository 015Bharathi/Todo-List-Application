import React from "react";
import { Todo } from "../hooks/useTodo";
import Button from "./default/Button";
import Text from "./default/Text";

type TodoItemProps = {
  items: Todo;
  handleDeleteItem: (id: number) => void;
  handleChangeCheckbox: (id: number) => void;
  handleEditItem: (id: number) => void;
};
const TodoItem: React.FC<TodoItemProps> = ({
  items,
  handleChangeCheckbox,
  handleEditItem,
  handleDeleteItem,
}) => {
  return (
    <li key={items._id} className="todo-item">
      <div className="todo-main">
        <input
          type="checkbox"
          id={`checkbox-${items._id}`}
          checked={items.checked}
          onChange={() => handleChangeCheckbox(items._id!)}
        />
        <label
          className="custom-checkbox"
          htmlFor={`checkbox-${items._id}`}
        ></label>
        <label
          className="todo-text"
          style={{
            textDecoration: items.checked ? "line-through" : "none",
          }}
        >
          <Text label={items.task} fontSize="xl" />
        </label>
        <div className="button-container">
          <Button
            variant="outline"
            onClick={() => handleEditItem(items._id!)}
            disabled={items.checked}
            icon={
              <svg width="24" height="24">
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="currentColor"
                    d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z"
                  ></path>
                  <path
                    stroke="currentColor"
                    d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"
                  ></path>
                </g>
              </svg>
            }
          />
          <Button
            variant="outline"
            onClick={() => handleDeleteItem(items._id!)}
            icon={
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM5 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6Zm12 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
          />
        </div>
      </div>
      <div className="todo-description">
        <Text color="white" fontSize="lg" label={items.description} />
      </div>
      <div className="timestamp">
        <Text label={items.timeStamp} fontSize="lg" color="primary" />
      </div>
    </li>
  );
};

export default TodoItem;
