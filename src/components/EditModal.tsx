import React, { FC, useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookToEdit: Book | null;
}

interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}

// EditModal will be used as a pop up for the user to smoothly edit the desired book
const EditModal: FC<EditModalProps> = ({ isOpen, onClose, bookToEdit }) => {
  const [editedBook, setEditedBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    publishedDate: '',
    genre: '',
  });

  // Once bookToEdit changes (handleEdit is ran) we update the edits
  useEffect(() => {
    if (bookToEdit) {
      setEditedBook(bookToEdit);
    }
  }, [bookToEdit]);

  // Once the Save button is pressed we update supabase with the chosen edits
  const handleEdit = async () => {
    if (editedBook) {
      const { data, error } = await supabase
        .from('bookData')
        .update({
          id: editedBook.id,
          title: editedBook.title,
          author: editedBook.author,
          publishedDate: editedBook.publishedDate,
          genre: editedBook.genre,
        })
        .eq('id', editedBook.id)
        .select();

      if (error) {
        console.error('Error updating book:', error);
      } else if (data) {
        onClose();
      }
    }

    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter title"
                value={editedBook.title}
                onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Enter author"
                value={editedBook.author}
                onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Published Date</FormLabel>
              <Input
                type="date"
                name="publishedDate"
                placeholder="Enter date (MM/DD/YYYY)"
                value={editedBook.publishedDate}
                onChange={(e) => setEditedBook({ ...editedBook, publishedDate: e.target.value })}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Genre</FormLabel>
              <Input
                placeholder="Enter genre"
                value={editedBook.genre}
                onChange={(e) => setEditedBook({ ...editedBook, genre: e.target.value })}
                required
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Stack direction="row" spacing={4}>
            <Button colorScheme="blue" onClick={handleEdit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;


