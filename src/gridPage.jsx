import { useEffect, useState } from 'react'
import { Button, Container, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import Select from 'react-select';
import Grid from './grid'
import NFTPagination from './pagination'
import NFTCarousel from './Carousel'
import nft from './assets/nft-image-2.png';
import './gridPage.css'
import NFTCarouselCard from './CardCarousel';

const NFTCollection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const [pages, setPages] = useState(0);
  //const chains = ["Arbitrum", "Arbitrum Nova", "Avalanche", "Base", "Ethereum", "Klaytn", "Optimism", "Polygon", "Zora"];
  const chains = [
    { value: 'All Chains', label: 'All Chains' },
    { value: 'Arbitrum', label: 'Arbitrum' },
    { value: 'Arbitrum Nova', label: 'Arbitrum Nova' },
    { value: 'Avalanche', label: 'Avalanche' },
    { value: 'Base', label: 'Base' },
    { value: 'Ethereum', label: 'Ethereum' },
    { value: 'Klaytn', label: 'Klaytn' },
    { value: 'Optimism', label: 'Optimism' },
    { value: 'Polygon', label: 'Polygon' },
    { value: 'Zora', label: 'Zora' }
  ]


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
      {/* <Container className="mt-5"> */}
      {/* {obj.map((item, index) => {
          console.log(item)
          <Grid page={currentPage} data={item.image}/>
        })} not needed*/}
      {/* <Grid page={currentPage} /> */}


      {/* </Container> */}
      {/* <NFTPagination
        total={pages}
        current={currentPage}
        onChangePage={handlePageChange}
      /> */}

      <NFTCarousel />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '25pt', marginRight: '25pt', marginBottom: '25pt' }}>
        {/* <div style={{
          backgroundColor: 'grey',
          fontSize: '14pt',
          padding: '8pt',
          borderRadius: '5pt',
          overflow: 'hidden'
        }}
        >
          jjj
        </div> */}
        <div>
          <ToggleButtonGroup

            type="radio"
            name="options1"
            defaultValue={1}
          // style={{ padding: '10pt' }}
          >
            <ToggleButton id="tbg-radio-1" variant='light' value={1} >
              Trending
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" variant='light' value={2} >
              Top
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <ToggleButtonGroup
            type="radio"
            name="options2"
            defaultValue={1}
            style={{ color: 'black' }}
          >
            <ToggleButton id="tbg-radio-3" value={1} variant='light' >
              1h
            </ToggleButton>
            <ToggleButton id="tbg-radio-4" value={2} variant='light' >
              6h
            </ToggleButton>
            <ToggleButton id="tbg-radio-5" value={3} variant='light' >
              24h
            </ToggleButton>
            <ToggleButton id="tbg-radio-6" value={4} variant='light' >
              7d
            </ToggleButton>
          </ToggleButtonGroup>

          {/* <Form.Select aria-label='select network' style={{ boxShadow: '0 0 0 0rem', border: '1pt solid #BDBDBD', marginLeft: '10pt' }}>

          

            <option>All Chains</option>
            <option value="Arbitrum">Arbitrum</option>
            <option value="Arbitrum Nova">Arbitrum Nova</option>
            <option value="Avalanche">Avalanche</option>
            <option value="Base">Base</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Klaytn">Klaytn</option>
            <option value="Optimism">Optimism</option>
            <option value="Polygon">Polygon</option>
            <option value="Zora">Zora</option>
          </Form.Select> */}

          <Select
            className='basic-single'
            classNamePrefix='select'
            defaultValue={chains[0]}
            isDisabled={false}
            isClearable={false}
            isLoading={false}
            isRtl={false}
            isSearchable={false}
            isMulti={false}
            name='chains'
            options={chains}
          />

          <Button className='view-all-button' variant='light' >View All</Button>

        </div>
      </div>

      <div style={{ display: 'flex', marginLeft: '25pt', marginRight: '25pt', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div >
              <span style={{ marginLeft: '10pt', fontWeight: 'bold' }}>Rank</span>
              <span style={{ marginLeft: '30pt', fontWeight: 'bold' }}>Collection</span>
            </div>

            <div >
              <span style={{ fontWeight: 'bold' }}>Floor Price</span>
              <span style={{ marginLeft: '90pt', marginRight: '15pt', fontWeight: 'bold' }}>Volume</span>
            </div>

          </div>
          <hr style={{ margin: '5pt' }} />
        </div>

        <div style={{ width: '45%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div >
              <span style={{ marginLeft: '10pt', fontWeight: 'bold' }}>Rank</span>
              <span style={{ marginLeft: '30pt', fontWeight: 'bold' }}>Collection</span>
            </div>

            <div >
              <span style={{ fontWeight: 'bold' }}>Floor Price</span>
              <span style={{ marginLeft: '90pt', marginRight: '15pt', fontWeight: 'bold' }}>Volume</span>
            </div>

          </div>
          <hr style={{ margin: '5pt' }} />
        </div>

      </div>

      <div style={{ display: 'flex', marginLeft: '25pt', marginRight: '25pt', marginTop: '5pt', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div style={{ alignContent: 'center' }} >
              <span style={{ marginLeft: '17pt' }}>1</span>
              <span style={{ marginLeft: '40pt' }}>
                <img src={nft} style={{ height: '70px', width: "70px", borderRadius: '5pt' }} />
              </span>
              <span style={{ marginLeft: '30pt' }}>Bored Fox</span>
            </div>

            <div >
              <span style={{ marginRight: '15pt' }}>0.01 DD</span>
              <span style={{ marginLeft: '90pt', marginRight: '15pt' }}>12 DD</span>
            </div>

          </div>

        </div>

        <div style={{ width: '45%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div >
              <span style={{ marginLeft: '10pt' }}>Rank</span>
              <span style={{ marginLeft: '30pt' }}>Collection</span>
            </div>

            <div >
              <span>Floor</span>
              <span style={{ marginLeft: '90pt', marginRight: '15pt' }}>Volume</span>
            </div>

          </div>

        </div>

      </div>

      <NFTCarouselCard />
    </>
  )
}

export default NFTCollection;