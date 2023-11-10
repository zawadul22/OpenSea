import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Grid from './grid'
import NFTPagination from './pagination'

const NFTCollection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const [pages, setPages] = useState(0);


  useEffect(() => {
    fetch(`https://nftsv2-4d9c1-default-rtdb.firebaseio.com/metadata.json`)
      .then((res) => res.json())
      .then((data) => {
        
          let dataArray = Object.values(data);
          let length = dataArray.length;
          if (length % 8 === 0) {
            setPages((length / 8) + 1)
          }
          else {
            let temp = length / 8 | 0
            setPages(temp + 1)
          }
        
      })
  }, [])


  return (
    <>
      <Container className="mt-5">
        {/* {obj.map((item, index) => {
          console.log(item)
          <Grid page={currentPage} data={item.image}/>
        })} */}
        <Grid page={currentPage} />


      </Container>
      <NFTPagination
        total={pages}
        current={currentPage}
        onChangePage={handlePageChange}
      />

    </>
  )
}

export default NFTCollection;