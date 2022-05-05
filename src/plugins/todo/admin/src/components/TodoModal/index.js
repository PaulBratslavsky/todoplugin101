import React, { useState } from 'react';
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
} from '@strapi/design-system';



export default function TodoModal({ setShowModal, addTodo }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState();

  const handleSubmit = async e => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    try {
      setStatus('loading');
      const response =  await addTodo({ name: name });
      console.log("response", response);
      setShowModal(false);
    } catch (e) {
      setStatus('error');
    } finally {
      setStatus('success');
    }
  };

  const getError = () => {
    // Form validation error
    if (name.length > 40) {
      return 'Content is too long';
    }
    // API error
    if (status === 'error') {
      return 'Could not create todo';
    }
    return null;
  };

  return (
    <ModalLayout onClose={() => setShowModal(false)} labelledBy="title" as="form" onSubmit={handleSubmit}>
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add todo
        </Typography>
      </ModalHeader>
      <ModalBody>
        <TextInput
          placeholder="What do you need to do?"
          label="Name"
          name="text"
          hint="Max 40 characters"
          error={getError()}
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <Button type="submit" loading={status === 'loading'}>
            {status === 'loading' ? 'Saving...' : 'Add todo'}
          </Button>
        }
      />
    </ModalLayout>
  );
};