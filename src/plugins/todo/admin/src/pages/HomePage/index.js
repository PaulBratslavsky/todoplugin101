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
    if (isLoading === false) setIsLoading(true);
    const todoCount = await todoRequests.getTodoCount();
    const todoData = await todoRequests.getAllTodos();
    setTodoCount(todoCount);
    setTodoData(todoData);
    setIsLoading(false);
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  async function toggleTodo(data) {
    await todoRequests.toggleTodo(data.id);
  }

  async function deleteTodo(data) {
    await todoRequests.deleteTodo(data.id);
    await fetchData();
  }

  async function editTodo(id, data) {
    await todoRequests.editTodo(id, data);
    await fetchData();
  }

  async function addTodo(data) {
    await todoRequests.addTodo(data);
    await fetchData();
  }

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <>
      <BaseHeaderLayout
        title="Todo Plugin"
        subtitle="All your todos in one place."
        as="h2"
      />
      <ContentLayout>
        {todoCount === 0 ? (
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
        ) : (
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
                editTodo={editTodo}
                setShowModal={setShowModal}
              />
            </Box>
          </>
        )}
      </ContentLayout>
      {showModal && <TodoModal setShowModal={setShowModal} addTodo={addTodo} />}
    </>
  );
};

export default memo(HomePage);
