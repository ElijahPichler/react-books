import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useFetch from './useFetch';

const LandingPage: React.FC = () => {
  const {books, isLoading, refetchBooks } = useFetch();
  const [numOfBooks, setNumOfBooks] = useState<number>(books.length);
  
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
          <Button as={RouterLink} to="/addbook" colorScheme="teal" mt={4} mr={4}>
            Add More Books
          </Button>
          <Button as={RouterLink} to="/allbooks" colorScheme="teal" mt={4}>
            View All Books
          </Button>
        </Box>
      </VStack>
  );
};

export default LandingPage;
