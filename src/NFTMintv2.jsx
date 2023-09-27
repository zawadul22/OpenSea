import Form from 'react-bootstrap/Form';

const NFTMintv2 = () => {
    return (

        <div style={{ marginTop: '30px', marginLeft: '56px', marginRight: '50%' }}>
            <h1 style={{ marginBottom: '30px' }}> Create New Item</h1>
            <div style={{ fontSize: '10pt', color: '#5b5b5b' }}> <span style={{ color: 'red' }}>*</span> Required fields</div>
            <strong>Image, Video, Audio, or 3D Model </strong>
            <div style={{ fontSize: '10.5pt', color: '#707070', marginTop: '3pt' }}>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
            </div>
            <div>Image Drop</div>
            <h5 style={{ marginTop: '20pt' }}>Name *</h5>
            <Form>
                <Form.Group className='mt-3 mb-3' controlId='controlName'>
                    <Form.Control type='text' placeholder='Item Name' />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '25pt' }}>External Link</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                OpenSea will include a link to this URL on this item's detail page,
                so that users can click to learn more about it.
                You are welcome to link to your own webpage with more details.
            </p>
            <Form>
                <Form.Group className="mb-3" controlId='controlName'>
                    <Form.Control type='text' placeholder='https://yoursite.io/item/123' />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '20pt' }}>Description</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                The description will be included on the item's detail page underneath its image. Markdown syntax is supported.
            </p>
            <Form>
                <Form.Group className='mt-3 mb-3' controlId='controlName'>
                    <Form.Control as="textarea" rows={4} placeholder='Provide a detailed description of your item' />
                </Form.Group>
            </Form>

            <h5 style={{ marginTop: '20pt' }}>Collection</h5>
            <p style={{ fontSize: '10pt', color: '#5b5b5b', marginBottom: '12pt' }}>
                This is the collection where your item will appear.
            </p>

        </div>

    )
}

export default NFTMintv2;