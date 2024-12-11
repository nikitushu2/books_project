import {useParams} from "react-router-dom";
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

export default function SinglePage() {
    const {id} = useParams();
    const { get, data} = useAxios('http://localhost:3000');
    const [book, setBook] = useState(null);

    useEffect(() => {
        get('books');
    }, [])

    useEffect(() => {
        if (data) {
            const foundBook = data.find(book => book.id === Number(id));
            setBook(foundBook);
            console.log(foundBook);
        }
    }, [data])

    if (book) {
    return (
        <>
        <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                  marginTop: '10px',
                  marginInline: 'auto',
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
                  {book.genres?.map((genre, i) => (
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
                  <Typography variant="subtitle1" gutterBottom>
                    Completed: {book.completed.toString()}
                  </Typography>
                  {book.start && <Typography variant="subtitle1" gutterBottom>
                    Started: {book.start}
                  </Typography>}
                  {book.end && <Typography variant="subtitle1" gutterBottom>
                    Finished: {book.end}
                  </Typography>}
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
                </CardActions>
              </Card>
        </>
    )}
}
