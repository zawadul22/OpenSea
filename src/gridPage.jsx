import { useEffect, useState } from 'react';
import { Button, Container, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Select from 'react-select';
import Grid from './grid';
import NFTPagination from './pagination';
import NFTCarousel from './Carousel';
import nft from './assets/nft-image-2.png';
import './gridPage.css';
import NFTCarouselCard from './CardCarousel';

const NFTCollection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const [pages, setPages] = useState(0);
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
  ];

  const times = [
    { value: '1h', label: '1h' },
    { value: '6h', label: '6h' },
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' }
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

      <div className='filter'>
        <div>
          <ToggleButtonGroup
            type="radio"
            name="options1"
            defaultValue={1}
          >
            <ToggleButton id="tbg-radio-1" variant='light' value={1} >
              Trending
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" variant='light' value={2} >
              Top
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div style={{ display: 'flex' }}>
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

      <div className='filter2'>
        <div className='button-group-1'>
          <ToggleButtonGroup
            type="radio"
            name="options3"
            defaultValue={1}
          >
            <ToggleButton id="tbg-radio-7" variant='light' value={1} >
              Trending
            </ToggleButton>
            <ToggleButton id="tbg-radio-8" variant='light' value={2} >
              Top
            </ToggleButton>
          </ToggleButtonGroup>

          <Button className='view-all-button2' variant='light' >View All</Button>
        </div>

        <div className='select-group1'>
          <Select
            id='single-select1'
            className='basic-single2'
            classNamePrefix='select2'
            defaultValue={times[0]}
            isDisabled={false}
            isClearable={false}
            isLoading={false}
            isRtl={false}
            isSearchable={false}
            isMulti={false}
            name='chains'
            options={times}
          />

          <Select
            id='single-select2'
            className='basic-single2'
            classNamePrefix='select3'
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
        </div>
      </div>

      {/* <div className='table-container'>
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
      </div> */}

      <NFTCarouselCard />


    </>
  )
}

export default NFTCollection;