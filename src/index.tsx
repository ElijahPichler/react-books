import { ChakraProvider } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import {supabase} from './supabaseClient'
import { Provider as SupabaseProvider } from 'react-supabase';


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)


root.render(
  <React.StrictMode>
    <SupabaseProvider value={supabase}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </SupabaseProvider>
  </React.StrictMode>
);

