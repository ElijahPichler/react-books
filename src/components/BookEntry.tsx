import React, { useState } from 'react';
import './BookEntry.css';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import {supabase} from '../supabaseClient'

interface Book {
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}

// Supabase is assigning an unique ID
const BookEntry = () => {
  const [bookData, setBookData] = useState<Book>({
    title: '',
    author: '',
    publishedDate: '',
    genre: '',
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = async () =>  {
    try {
        await supabase
        .from('bookData')
        .insert([
            {   title: bookData.title,
                author: bookData.author,
                publishedDate: bookData.publishedDate,
                genre: bookData.genre, },
        ])
        .select()
       ;

    } catch(error){
        console.error('Unexpected error:', error);
    }
    window.location.reload()
  };

  return (
    <VStack p={4}>
      <form onSubmit={handleSubmit}>
      <h1>Add a New Book!</h1>
        <FormControl>
          <FormLabel>Title:</FormLabel>
          <Input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Author:</FormLabel>
          <Input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
            <FormLabel>Published Date</FormLabel>
            <Input
                type="date"
                name="publishedDate"
                placeholder="Enter date (MM/DD/YYYY)"
                
                value={bookData.publishedDate}
                onChange={handleChange}
                required
            />
            
        </FormControl>

        <FormControl>
          <FormLabel>Genre:</FormLabel>
          <Input
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="green">
          Submit
        </Button>
      </form>
    </VStack>);
};

export default BookEntry;