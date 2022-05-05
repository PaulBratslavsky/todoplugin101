import React, { useState } from "react";
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
} from "@strapi/design-system/Table";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";
import { IconButton } from "@strapi/design-system/IconButton";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { BaseCheckbox } from "@strapi/design-system/BaseCheckbox";
import { TextInput } from "@strapi/design-system/TextInput";

import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";
import Plus from "@strapi/icons/Plus";

function TodoCheckbox({ value, checkboxID, callback, disabled }) {
  const [isChecked, setIsChecked] = useState(value);

  function handleChange() {
    setIsChecked(!isChecked);
    {
      callback && callback({ id: checkboxID, value: !isChecked });
    }
  }
  return (
    <BaseCheckbox
      checked={isChecked}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

function TodoInput({ value}) {
  const [inputValue, setInputValue] = useState(value || "");
  return (
    <TextInput
      type="text"
      aria-label="todo-input"
      name="todo-input"
      error={inputValue.length > 40 ? "Text should be less than 40 characters" : ""}
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
    />
  );
}

export default function TodoTable({
  todoData,
  toggleTodo,
  deleteTodo,
  editTodo,
  setShowModal,
}) {
  return (
    <Table
      colCount={4}
      rowCount={10}
      footer={
        <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
          Add a todo
        </TFooter>
      }
    >
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma">ID</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Todo</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Status</Typography>
          </Th>
          <Th>
            <VisuallyHidden>Actions</VisuallyHidden>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {todoData.map((todo) => {
          const [isEdit, setIsEdit] = useState(false);
          async function handleEdit() {
            setIsEdit(false);
          }
          return (
            <Tr key={todo.id}>
              <Td>
                <Typography textColor="neutral800">{todo.id}</Typography>
              </Td>
              <Td>
                {isEdit ? (
                  <TodoInput value={todo.name}/>
                ) : (
                  <Typography textColor="neutral800">{todo.name}</Typography>
                )}
              </Td>
              <Td>
                <TodoCheckbox
                  value={todo.isDone}
                  checkboxID={todo.id}
                  callback={toggleTodo}
                  disabled={isEdit}
                />
              </Td>
              <Td>
                {isEdit ? (
                  <Flex style={{ justifyContent: "end" }}>
                    <Button onClick={handleEdit}>Save</Button>
                  </Flex>
                ) : (
                  <Flex style={{ justifyContent: "end" }}>
                    <IconButton
                      onClick={() => setIsEdit(true)}
                      label="Edit"
                      noBorder
                      icon={<Pencil />}
                    />
                    <Box paddingLeft={1}>
                      <IconButton
                        onClick={() => deleteTodo(todo)}
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                      />
                    </Box>
                  </Flex>
                )}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
