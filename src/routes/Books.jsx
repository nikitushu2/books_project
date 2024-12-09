import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';

function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { alert, get, data} = useAxios('http://localhost:3000');
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, []);

  useEffect(() => {
    if (data) {
      const filteredBooks = data.filter((book) =>
        book.name.toLowerCase().includes(term.toLowerCase())
      );
      setBooks(filteredBooks);
      setIsLoading(false);
    }
  }, [term, data]);

  // TODO: Replace axios with useAxios hook
  async function getBooks() {
    // gets books
    try {
      await get('books');
      setBooks(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
        <TextField id="outlined-basic" label="Search" variant="outlined" value={term} onChange={(event) => setTerm(event.target.value)} sx={{marginBottom: '10px'}}/>
        <div>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {books.map((book) => 
            (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/public/fallback.png'
                  }}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
        </>
      )}
    </Box>
  );
}

export default Books;
