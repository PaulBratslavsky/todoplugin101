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
import { Typography } from "@strapi/design-system/Typography";
import { IconButton } from "@strapi/design-system/IconButton";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { BaseCheckbox } from "@strapi/design-system/BaseCheckbox";

import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";
import Plus from "@strapi/icons/Plus";

function TodoCheckbox({ value, checkboxID, callback }) {
  const [isChecked, setIsChecked] = useState(value);

  function handleChange() {
    setIsChecked(!isChecked);
    {
      callback && callback({id: checkboxID, value: !isChecked});
    }
  }
  return <BaseCheckbox checked={isChecked} onChange={handleChange} />;
}

export default function TodoTable({
  todoData,
  toggleTodo,
  deleteTodo,
  editTodo,
}) {
  return (
    <Table
      colCount={5}
      rowCount={10}
      footer={
        <TFooter onClick={() => console.log("add a todo")} icon={<Plus />}>
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
            <VisuallyHidden>Status</VisuallyHidden>
          </Th>
          <Th>
            <VisuallyHidden>Actions</VisuallyHidden>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {todoData.map((todo) => {
          return (
            <Tr key={todo.id}>
              <Td>
                <Typography textColor="neutral800">{todo.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{todo.name}</Typography>
              </Td>
              <Td>
                <TodoCheckbox
                  value={todo.isDone}
                  checkboxID={todo.id}
                  callback={toggleTodo}
                />
              </Td>
              <Td>
                <Flex>
                  <IconButton
                    onClick={() => console.log("edit")}
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
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
