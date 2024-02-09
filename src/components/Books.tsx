
import React, { FC, useState } from 'react';
import EditModal from './EditModal';
import { FaRegTrashAlt,FaRegEdit  } from "react-icons/fa";
import {supabase} from '../supabaseClient'
import { Link as RouterLink } from 'react-router-dom';


import {
    Table,
    Text,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    IconButton,
    Stack,
    VStack,
    Heading,
    Button,
  } from '@chakra-ui/react'


interface Book {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
    genre: string;
  }

interface BooksProps {
  books: Book[]; 
}


// Books will be used to view all the book entries in the database.
const Books: FC<BooksProps> = ({books}) => {

// State variables to keep track of modal
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

// Update book object via ID and close the modal
function handleEdit(id: number) {
    const bookToEdit = books.find(book => book.id === id) || null;
    setEditingBook(bookToEdit);
    setEditModalOpen(true)
  };

// Delete book data via ID and refresh the window
async function handleDelete(id: number) {

    setLoadingDelete(true)

    try{
      await supabase
      .from('bookData')
      .delete()
      .eq('id', id)
    }catch (error) {
      console.error('Unexpected error:', error);
    }

    setLoadingDelete(false)
    
    window.location.reload();
};


const handleCloseEditModal = () => {
    setEditingBook(null);
    setEditModalOpen(false);
};
  return (
    <VStack p={4}>
        <Heading as='h2' mb={4}>
          Books
        </Heading>
        
        {books.length === 0 ? // Update DOM based on databases size
        (
        <>
          <Text fontSize="lg" fontWeight="bold">
          No books available. Add some books to the library!
          </Text>
          <Button as={RouterLink} to="/addbook" colorScheme="teal" mt={4}>
              Add More Books
          </Button>
        </>
        )
        
        :
        
        (
        <TableContainer >
          <Table variant='simple' >
            <TableCaption>List of All Books</TableCaption>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Published Date</Th>
                <Th>Genre</Th>
              </Tr>
            </Thead>
            <Tbody >
                {books.map((book) => ( // Map through all books and display in table format
                  <Tr key={book.id}>
                    <Td>{book.title}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.publishedDate}</Td>
                    <Td>{book.genre}</Td>
                    <Td>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        isRound={true}
                        icon={<FaRegEdit />}
                        size='sm'
                        colorScheme='blue'
                        onClick={() => handleEdit(book.id)}
                        aria-label={''}
                      />
                      <IconButton
                        isRound={true}
                        icon={<FaRegTrashAlt />}
                        size='sm'
                        colorScheme='red'
                        onClick={() => handleDelete(book.id)}
                        aria-label={''}
                        isLoading={loadingDelete}
                      />
                    </Stack>
                  </Td>
                </Tr>
                ))}
            </Tbody>
          </Table>
          <EditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          bookToEdit={editingBook}
          />
      </TableContainer>)
      }
      </VStack>
        
  );
};

export default Books;
