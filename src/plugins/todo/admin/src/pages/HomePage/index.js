import React, { memo, useState, useEffect } from "react";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";

import todoRequests from "../../api/todo";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import TodoTable from "../../components/Table";
import { Illo } from "../../components/Illo";

const HomePage = () => {
  const [todoCount, setTodoCount] = useState(0);
  const [todoData, setTodoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const fetchData = async () => {
      const todoCount = await todoRequests.getTodoCount();
      const todoData = await todoRequests.getAllTodos();
      setTodoCount(todoCount);
      setTodoData(todoData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  async function toggleTodo(data) {
    await todoRequests.toggleTodo(data.id);
  }

  async function deleteTodo(data) {
    console.log(data);
    await todoRequests.deleteTodo(data.id);
    setTodoData(todoData.filter((todo) => todo.id !== data.id));
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
              />
            </Box>
          </>
        )}
      </ContentLayout>
    </>
  );
};

export default memo(HomePage);
