import React, { ReactNode } from 'react';
import { Box, Flex, Spacer, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';


interface LayoutProps {
    children: ReactNode;
  }

// Layout will be used to wrap around each component to allow for naviagation throughout the use of the app
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box p={4} boxShadow="lg" borderRadius="md" bg="gray.100" minH="100vh" minW="100vw">
      <Flex align="center">
        <Heading as="h1" size="xl" color="teal.500">
          Book Library
        </Heading>
        <Spacer />
        <Flex>
         <Link as={RouterLink} to="/" fontSize="lg" color="teal.500" mr={4}>
            Home
          </Link>
          <Link as={RouterLink} to="/addbook" fontSize="lg" color="teal.500" mr={4}>
            Add New Book
          </Link>
          <Link as={RouterLink} to="/allbooks" fontSize="lg" color="teal.500" mr={4}>
            View All Books
          </Link>
        </Flex>
      </Flex>
      {children}
    </Box>
  );
};

export default Layout;
