import styled from '@emotion/styled';
import { Box, CircularProgress, Grid, Pagination, PaginationItem, useMediaQuery, } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'

const getImages = async () => {
  const requests = [];
  for (let i = 0; i < 100; i++) {
    requests.push(axios.get('https://source.unsplash.com/200x200/?nature,water,sky,sun,moon,earth,jupiter,america,pakistan,man,boy', {
      responseType: 'blob'
    }));
  }
  const responses = await Promise.all(requests);
  return responses;
}

const Container = styled(Box)(() => ({
  width: "min(95vw, 1200px)",
  margin: '0 auto',
  padding: '3rem .5rem',
  color: 'white'
}))

const Image = styled('img')(() => ({
  width: "100%",
  borderRadius: '5px',
}));

const MyPagination = styled(Pagination)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',

  [theme.breakpoints.down('md')]: {
    padding: "10px 0",
  }
}));

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery(`(max-width : 600px)`)
  const [imgs, setImgs] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setImgs([]);
        const responses = await getImages();
        for (const response of responses) {
          const { data } = response;
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setImgs(p => [...p, fileReader.result])
          }
          fileReader.readAsDataURL(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log('Something went wrong. Please try again!');
        setIsLoading(false);
      }
    })();
  }, [pageNo])


  const onChange = (_, pageNo) => {
    setPageNo(pageNo);
  }

  return (
    isLoading ? (
      <Box className="loader">
        <CircularProgress />
      </Box>
    ) : (
      <Container>
        <Grid container spacing={2}>
          {
            imgs.map((img, i) => (
              <Grid item key={i} xs={6} sm={4} md={3} lg={2}>
                <Image src={img} alt="Image not found!" />
              </Grid>
            ))
          }
        </Grid>
        <MyPagination
          count={10}
          variant="outlined"
          color="primary"
          size={isMobile ? 'small' : 'medium'}
          page={pageNo}
          renderItem={(item) => (
            <PaginationItem {...item} style={{ color: 'white', fontSize: '10px' }} />
          )}
          onChange={onChange}
        />
      </Container>
    )
  )
}

export default App