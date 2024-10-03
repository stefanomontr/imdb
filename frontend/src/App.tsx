import './App.css'
import Header from "./components/Header.tsx";
import AdvancedSearch from "./components/AdvancedSearch.tsx";
import {SearchContextProvider} from "./components/SearchContext.tsx";

function App() {

  return (
    <>
      <Header />
      <SearchContextProvider>
        <AdvancedSearch/>
      </SearchContextProvider>
    </>
  );
}

export default App
