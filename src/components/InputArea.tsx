import React, { useCallback, useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { Todo } from "../hooks/useTodo";
import Button from "./default/Button";
import InputField from "./default/InputField";

type InputAreaProps = {
  handleAddClick: (inputText: string, description: string) => void;
  editItem: Todo | null;
  resetEditItem: () => void;
};

const InputArea: React.FC<InputAreaProps> = ({
  handleAddClick,
  editItem,
  resetEditItem,
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editItem) {
      setInputText(editItem.task ?? "");
      // setInputText(editItem.text)
      setDescription(editItem.description);
      setShowForm(true);
    } else {
      setInputText("");
      setDescription("");
    }
  }, [editItem]);

  useEffect(() => {
    setIsVisible(inputText.trim() === "");
    setIsFocused(true);
  }, [inputText]);

  const handleInputTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputText(event.target.value);
  };

  const handleTextAreaInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = useCallback(() => {
    if (inputText.trim()) {
      handleAddClick(inputText, description);
      setInputText("");
      setDescription("");
      setShowForm(false);
    }
  }, [handleAddClick, inputText, description]);

  //   const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter") {
  //       handleSubmit();
  //     }
  //   };

  const handleCancelClick = () => {
    setInputText("");
    setDescription("");
    setShowForm(false);
    resetEditItem();
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    handleSubmit();
  };

  return (
    <div className="add-task-container">
      {!showForm && (
        <Button
          variant="primary"
          onClick={handleShowForm}
          label="Add task"
          icon={<IoAddSharp />}
        />
      )}
      {showForm && (
        <form
          onSubmit={handleSubmitClick}
          className={`form-container ${isFocused ? "focused" : "unfocused"}`}
        >
          <div className="input-fields">
            <InputField
              type="text"
              variant="standard"
              placeholder="Task name"
              value={inputText}
              onChange={handleInputTextChange}
              onKeyDown={handleOnKeyDown}
            />
            <InputField
              type="text"
              variant="outlined"
              placeholder="Description"
              value={description}
              onChange={handleTextAreaInput}
              onKeyDown={handleOnKeyDown}
            />
          </div>
          <div className="button-group">
            <Button
              onClick={handleCancelClick}
              label={"Cancel"}
              variant="secondary"
            />
            <Button
              disabled={isVisible}
              variant="error"
              onClick={handleSubmit}
              label={editItem ? "save" : "Add task"}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default InputArea;
