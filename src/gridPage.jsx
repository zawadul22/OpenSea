import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Grid from './grid'
import NFTPagination from './pagination'
import { imageDb, database } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { set, ref as databaseRef, onValue, child, get, push } from "firebase/database"

const NFTCollection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  

  

  // onValue(databaseRef(database, '/metadata'), (snapshot) => {
  //   setObj(Object.values(snapshot.val()));
  // })
  // get(child(databaseRef(database), `/metadata`)).then((snapshot)=>{
  //   setObj(Object.values(snapshot.val()))
  // }).catch((error)=>{
  //   console.log(error)
  // })

  

  //console.log("Firebase objects ", obj)

  return (
    <>
      <Container className="mt-5">
        {/* {obj.map((item, index) => {
          console.log(item)
          <Grid page={currentPage} data={item.image}/>
        })} */}
        <Grid page={currentPage}/>


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