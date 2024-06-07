import './App.css'

import Header from './elements/layout/header/header';
import Hero from './features/home/hero/hero';
import BookCatalog from './features/home/books-catalog/catalog';

// APP Entry Point Component
// I have used the following components in the App component:
function App() {
  return (
    <>
      {/* Has just the ello logo */}
      <Header></Header>

      {/* Why not have a hero, I just think it looks good :^) */}
      <Hero></Hero>

      {/* Majority of the assignment is contained in this component 
          It contains the search bar, the book catalog, an input to 
          select a student and a button to add a book to the student's
          list of checkoeut books
      */}
      <BookCatalog></BookCatalog>
    </>
  )
}

export default App
