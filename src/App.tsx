import ProtectedRoutes from "./components/ProtectedRoutes";
import TodoPage from "./components/TodoPage";
import Login from "./components/form/Login";
import Signup from "./components/form/Signup";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const App: React.FC = () => {
  // const {
  //   items,
  //   editItem,
  //   resetEditItem,
  //   updateItems,
  //   handleChangeCheckbox,
  //   handleEditItem,
  //   handleDeleteItem,
  //   count
  // } = useTodo();

  // const handleAddClick = (inputText: string,description:string) => {
  //   updateItems(inputText,description);
  // };
  // const [items, setItems] = useState<Todo[]>([]);
  // const [editItem, setEditItem] = useState<Todo | null>(null);

  // const updateItems = useCallback( (value: string) => {
  //   if (editItem) {
  //     setItems((previousvalue) =>
  //       previousvalue.map((item) =>
  //         item.id === editItem.id ? { ...item, text: value } : item
  //       )
  //     );
  //     setEditItem(null);
  //   } else {
  //     setItems((previousValue) => [
  //       ...previousValue,
  //       { id: Date.now(), text: value, checked: false },
  //     ]);
  //   }
  // },[items,editItem]);

  // const handleAddClick = (inputText: string) => {
  //   updateItems(inputText);
  // };

  // const handleChangeCheckbox = useCallback((id: number) => {
  //   const foundTodo = items.find((item) => item.id === id);
  //   if (!foundTodo) return;
  //   const toggledChecked = items.map((item) =>
  //     item.id === id ? { ...item, checked: !item.checked } : item
  //   );
  //   setItems(toggledChecked);
  // },[items]);

  // const handleEditItem = useCallback((id: number) => {
  //   const itemTodoEdit = items.find((item) => item.id === id);
  //   if (itemTodoEdit) {
  //     setEditItem(itemTodoEdit);
  //   }
  // },[items]);

  // const handleDeleteItem = useCallback((id: number) => {
  //   const itemTodoDelete = items.find((item) => item.id === id);
  //   if (!itemTodoDelete) return;
  //   const updateDeleteId = items.filter((item) => item.id !== id);
  //   const shouldDelete = window.confirm(
  //     "Are you sure you want to delete this item?"
  //   );
  //   if (shouldDelete) {
  //     setItems(updateDeleteId);
  //   }
  // },[items]);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/todo"
            element={
              <ProtectedRoutes>
                <TodoPage/>
              </ProtectedRoutes>
            }
          />
          {/* <Route path="/todo" element={<TodoList //TodoList
        todoItems={items}
        handleChangeCheckbox={handleChangeCheckbox}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
        count={count}
        
      />}  />
      <Route path="/todo" element={ <InputArea handleAddClick={handleAddClick} resetEditItem={resetEditItem}   editItem={editItem}  />}/> */}
        </Routes>
      </BrowserRouter>
      {/* <TodoList //TodoList
        todoItems={items}
        handleChangeCheckbox={handleChangeCheckbox}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
        count={count}
      />
      <InputArea handleAddClick={handleAddClick} resetEditItem={resetEditItem}   editItem={editItem}  />
      
      <Login /> */}
    </div>
  );
};

export default App;
