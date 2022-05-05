import React, { memo, useState, useEffect } from "react";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";

import todoRequests from "../../api/todo";
import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import TodoTable from "../../components/TodoTable";
import TodoModal from "../../components/TodoModal";
import { Illo } from "../../components/Illo";
import Plus from "@strapi/icons/Plus";

const HomePage = () => {
  const [todoCount, setTodoCount] = useState(0);
  const [todoData, setTodoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const todoCount = await todoRequests.getTodoCount();
    const todoData = await todoRequests.getAllTodos();
    setTodoCount(todoCount);
    setTodoData(todoData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function toggleTodo(data) {
    await todoRequests.toggleTodo(data.id);
  }

  async function deleteTodo(data) {
    await todoRequests.deleteTodo(data.id);
    fetchData();
  }

  async function editTodo(data) {
    await todoRequests.editTodo(data.id, data);
    fetchData();
  }

  async function addTodo(data) {
    await todoRequests.addTodo(data);
    fetchData();
  }

  if (isLoading) return <LoadingIndicatorPage />;

  console.log("todoData", todoData);

  return (
    <>
      <BaseHeaderLayout
        title="Todo Plugin"
        subtitle="All your todos in one place."
        as="h2"
      />
      <ContentLayout>
        {todoCount === 0 && (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any todos yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first todo
              </Button>
            }
          />
        )}
        {todoCount > 0 && (
          <>
            <Box background="neutral0" hasRadius={true} shadow="filterShadow">
              <Flex justifyContent="center" padding={8}>
                <Typography variant="alpha">
                  You have a total of {todoCount} todos 🚀
                </Typography>
              </Flex>
            </Box>
            <Box
              background="neutral0"
              hasRadius={true}
              shadow="filterShadow"
              padding={8}
              style={{ marginTop: "10px" }}
            >
              <TodoTable
                todoData={todoData}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                setShowModal={setShowModal}
              />
            </Box>
          </>
        )}
        {showModal && (
          <TodoModal setShowModal={setShowModal} addTodo={addTodo} />
        )}
      </ContentLayout>
    </>
  );
};

export default memo(HomePage);
