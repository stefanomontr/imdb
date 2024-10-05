import './App.css'
import Header from "./components/Header.tsx";
import AdvancedSearch from "./components/AdvancedSearch.tsx";
import {SearchContextProvider} from "./components/SearchContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <SearchContextProvider>
        <AdvancedSearch/>
      </SearchContextProvider>
    </QueryClientProvider>
  );
}

export default App
