import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}

const useFetch = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  // Fetching data from Supabase
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: bookData, error } = await supabase.from('bookData').select('*');
      if (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      } else {
        setBooks(bookData || []);
      }
    } catch (error) {
        console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { books, isLoading, refetchBooks: fetchData };
};

export default useFetch;