import InputArea from "./InputArea";
import TodoList from "./TodoList";
// import { Todo } from "../hooks/useTodo";
import useTodo from "../hooks/useTodo";

// type TodoPageProps = {
//   todoItems: Todo[];
//   handleChangeCheckbox: (id: number) => void;
//   handleEditItem: (id: number) => void;
//   handleDeleteItem: (id: number) => void;
//   handleAddClick: (inputText: string, description: string) => void;
//   resetEditItem: () => void;
//   editItem: Todo | null;
//   count: number;
// };

const TodoPage = () => {
  const {
    items,
    editItem,
    resetEditItem,
    updateItems,
    handleChangeCheckbox,
    handleEditItem,
    handleDeleteItem,
    count,
  } = useTodo();

  const handleAddClick = (inputText: string, description: string) => {
    updateItems(inputText, description);
  };

  return (
    <div>
      <TodoList
        todoItems={items}
        handleChangeCheckbox={handleChangeCheckbox}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
        count={count}
      />
      <InputArea
        handleAddClick={handleAddClick}
        resetEditItem={resetEditItem}
        editItem={editItem}
      />
    </div>
  );
};

export default TodoPage;
