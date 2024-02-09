import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useFetch from './useFetch';

// LandingPage will be used as the local home page and will present simple stats about the library
const LandingPage: React.FC = () => {
  const {books, isLoading, refetchBooks } = useFetch();
  const [numOfBooks, setNumOfBooks] = useState<number>(books.length);
  
  // Update number of books once The database changes
  useEffect(() => {
    setNumOfBooks(books.length)
  }, [books]);

  
  return (
      <VStack mt={8} spacing={4}>
        <Box p={8} bg="white" borderRadius="md" boxShadow="md" w="100%">
          <Heading as="h2" size="lg" mb={4}>
            Welcome to your Book Library!
          </Heading>
          <Text>
            You currently have {numOfBooks} {numOfBooks === 1 ? 'book' : 'books'}.
          </Text>
          <Button as={RouterLink} to="/addbook" colorScheme="green" mt={4} mr={4}>
            Add More Books
          </Button>
          <Button as={RouterLink} to="/allbooks" colorScheme="gray" mt={4}>
            View All Books
          </Button>
        </Box>
      </VStack>
  );
};

export default LandingPage;
