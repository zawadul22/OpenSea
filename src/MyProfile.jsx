import { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import NFTPagination from './pagination'
import ProfileGrid from './MyProfileGrid'
import { Context } from './connectWallet'


const Profile = () => {

    const ctx = useContext(Context);
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
        <center><h2>Your NFTs</h2></center>
        
            {ctx.isConnected ? (
                <>
                    <Container className="mt-5">
                        <ProfileGrid page={currentPage} />

                    </Container>
                    <NFTPagination
                        total={pages}
                        current={currentPage}
                        onChangePage={handlePageChange}
                    />
                </>
            ) : (
                <Container className='mt-5'>
                    <h1>Your Wallet is not connected</h1>
                </Container>
            )}


        </>
    )
}

export default Profile;