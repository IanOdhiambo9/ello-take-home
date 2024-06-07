import * as React from 'react';
import { useQuery } from '@apollo/client';

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/delete';

import { Book } from '../../../models/books.interface';
import { Student } from "../../../models/students.interface";

import { studentsData } from "../../../utils/student-list";

import { GET_BOOKS } from '../../../state/queries/get-books-query';

import './catalog.css';

function BookCatalog() {
  // Gets a list of students from my utils ands adds a label property to each student
  // The label is required for the Autocomplete component indexing
  const studentsList: Student[] = studentsData.map((student) => { return { ...student, label: student.name } });

  // Set the first student in the list as the default student
  // Set the assigned books to an empty object and update as books are assigned
  // Set the available books to the list of books from the server
  // Set the search query to an empty string and update as the user types on the search bar
  const [student, setStudent] = React.useState<Student | null>(studentsList[0]);
  const [assignedBooks, setAssignedBooks] = React.useState<{ [key: string]: Book[] }>({});
  const [availableBooks, setAvailableBooks] = React.useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Fetches the books from the server (in state/db) and updates the available books state
  const { loading, error, data } = useQuery(GET_BOOKS, {
    onCompleted: (data) => {
      setAvailableBooks(data.books);
    }
  });

  // Some simple error handling for user XP
  // If the data is still loading, display a loading message
  // If there is an error, display an error message
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Assigns a book to the active student
  const handleAssignBook = (book: Book) => {
    if (!student) return;

    setAssignedBooks(prev => {
      const studentBooks = prev[student.name] || [];
      // avoid duplicates titles assigning to the same student
      if (studentBooks.find(b => (b.title === book.title && b.author === b.title))) return prev;
      return { ...prev, [student.name]: [...studentBooks, book] };
    });

    // Filter out the assigned book from the available books
    setAvailableBooks(prev => prev.filter(b => (b.title !== book.title && b.author !== book.author)));
  };

  // Removes a book from the active student's assigned books
  const handleRemoveBook = (book: Book) => {
    if (!student) return;

    setAssignedBooks(prev => {
      const studentBooks = prev[student.name] || [];
      return { ...prev, [student.name]: studentBooks.filter(b => b.title !== book.title || b.author !== book.author) };
    });

    setAvailableBooks(prev => [...prev, book]);
  };

  // Keeps track of available books and filters them based on the search query
  const filteredBooks = availableBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Renders the catalog section of the page
  return (
    <div className="book-catalog-section">
      <div className="container">
        <div className="catalog">
          <h1 className="mulish-500">Book Catalog</h1>
          <p className="mulish-300">
            A list of all the books in our catalog
            <span className='mulish-400' > ({availableBooks.length} books) </span>
          </p>

          <div className="search">
            <TextField
              id="outlined-basic"
              fullWidth
              label="Search for a book..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="book-list">
            <TableContainer component={Paper} sx={{ width: '100%', overflow: 'scroll', maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <span className='mulish-700'> Title </span>
                    </TableCell>
                    <TableCell>
                      <span className='mulish-700'> Author </span>
                    </TableCell>
                    {/* <TableCell>
                      <span className='mulish-700'> Reading Level </span>
                    </TableCell> */}
                    <TableCell>
                      <span className='mulish-700'> Actions </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBooks.map((row: Book) => (
                    <TableRow
                      key={`${row.title}-${row.author}`}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>{row.author}</TableCell>
                      {/* <TableCell>{row.readingLevel}</TableCell> */}
                      <TableCell>
                        <Button
                          variant="contained"
                          disabled={!student}
                          startIcon={<AddIcon />}
                          onClick={() => handleAssignBook(row)}
                        >
                          Assign Book
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className="reading-list">
          <h1 className="mulish-500">Reading list</h1>
          <p className="mulish-300" >
            A list of the books assigned to student:
            <span className='mulish-400' > {`${student?.name} (${assignedBooks[student!.name]?.length || 0}) books`} </span>

          </p>
          <Autocomplete
            disablePortal
            options={studentsList}
            value={student}
            onChange={(event, newStudent: Student | null) => {
              setStudent(newStudent);
            }}
            renderInput={(params) => <TextField {...params} label="My Students" />}
          />
          <ul>
            {assignedBooks[student?.name || '']?.map((book) => (
              <li key={book.title}>
                <Card>
                  <CardActionArea>
                    {/* <CardMedia
                      component="img"
                      height="140"
                      image={book.coverPhotoURL} 
                      alt="image"
                    /> */}
                    <CardContent>
                      <div className="action">
                        <IconButton aria-label="delete" color="error" onClick={() => handleRemoveBook(book)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                      <Typography gutterBottom variant="h5" component="div">
                        {book.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookCatalog;