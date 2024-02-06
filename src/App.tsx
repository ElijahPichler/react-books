import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import Books from "./components/Books";
import BookEntry from './components/BookEntry';
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout"
import useFetch from './components/useFetch';
// Setting up the Book's data types for useState
interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}

export const App = () => {
  // custom hook to fetch from Supabase
  const {books, isLoading, refetchBooks } = useFetch();



// Accounting for 3 unique routes ('/', '/allbooks' and '/addbook') and a wildcard route to direct back towards '/'
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" 
      element={  
      <Layout>
        <LandingPage />
      </Layout>
      } />
      <Route path="/allbooks" 
      element={  
      <Layout>
          <Books books={books} />
      </Layout>
      } />
      <Route path="/addbook" 
      element={  
        <Layout>
          <BookEntry />
        </Layout>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
  
  )
}

