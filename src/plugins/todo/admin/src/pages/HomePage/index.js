import React, { memo, useState, useEffect } from "react";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";

import todoRequests from "../../api/todo";

import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Button } from "@strapi/design-system/Button";
import Plus from "@strapi/icons/Plus";

import { Illo } from "../../components/Illo";

import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import TodoTable from "../../components/TodoTable";
import TodoModal from "../../components/TodoModal";
import TodoCount from "../../components/TodoCount";

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
            <TodoCount count={todoCount} />
            <TodoTable
              todoData={todoData}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              setShowModal={setShowModal}
            />
          </>
        )}
      </ContentLayout>
      {showModal && <TodoModal setShowModal={setShowModal} addTodo={addTodo} />}
    </>
  );
};

export default memo(HomePage);
