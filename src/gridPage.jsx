import { useEffect, useState } from 'react';
import { Button, Container, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Select from 'react-select';
import Grid from './grid';
import NFTPagination from './pagination';
import NFTCarousel from './Carousel';
import nft from './assets/nft-image-2.png';
import './gridPage.css';
import NFTCarouselCard from './CardCarousel';
import Table from 'react-bootstrap/Table';


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

      <div className='table-container'>
        <Table size='lg' style={{ marginRight: '25pt' }}>
          <thead >
            <tr>
              <td style={{ textAlign: 'center', fontSize: '11pt' }}>Rank</td>
              <td style={{ fontSize: '11pt' }}>Collection</td>
              <td style={{ textAlign: 'center', fontSize: '11pt' }}>Floor Price</td>
              <td style={{ textAlign: 'center', fontSize: '11pt' }}>Volume</td>
            </tr>
          </thead>
          {Array.from({ length: 5 })
            .map((_, index) => (
              <tr className='table-data'>
                <th style={{ textAlign: 'center', fontWeight: '550', padding : '2pt' }}>{index + 1}</th>
                <th style={{ fontWeight: '550' }}><img src={nft} style={{ height: '75px', width: '75px', padding: '0pt', borderRadius: '6pt' }} />&nbsp;&nbsp; Bored Fox </th>
                <th style={{ textAlign: 'center', fontWeight: '550' }}>5 DD</th>
                <th style={{ textAlign: 'center', fontWeight: '550' }}>9 DD</th>
              </tr>
            ))}

        </Table>
        <Table size='lg' style={{ marginLeft: '25pt' }}>
          <thead>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '11pt' }}>Rank</td>
              <td style={{ fontSize: '11pt' }}>Collection</td>
              <td style={{ textAlign: 'center', fontSize: '11pt' }}>Floor Price</td>
              <td style={{ textAlign: 'center', fontSize: '11pt' }}>Volume</td>
            </tr>
          </thead>
          {Array.from({ length: 5 })
            .map((_, index) => (
              <tr className='table-data'>
                <th style={{ textAlign: 'center', fontWeight: '550' }}>{index + 6}</th>
                <th style={{ fontWeight: '550' }}><img src={nft} style={{ height: '75px', width: '75px', padding: '0pt', borderRadius: '6pt' }} />&nbsp;&nbsp; Bored Fox </th>
                <th style={{ textAlign: 'center', fontWeight: '550' }}>5 DD</th>
                <th style={{ textAlign: 'center', fontWeight: '550' }}>9 DD</th>
              </tr>
            ))}
        </Table>
      </div>
      <br/>
      <br/>
      <NFTCarouselCard title='Notable Collections'/>


    </>
  )
}

export default NFTCollection;