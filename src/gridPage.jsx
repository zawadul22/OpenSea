import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Grid from './grid'
import NFTPagination from './pagination'


const NFTCollection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Container className="mt-5">
        <Grid page={currentPage} />

      </Container>
      <NFTPagination
        total={8}
        current={currentPage}
        onChangePage={handlePageChange}
      />
      
    </>
  )
}

export default NFTCollection;