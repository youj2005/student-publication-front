const Title = () => {
  return (
    <>
        <h1 
        style={{fontFamily:'serif'}}className='text-center align-text-bottom display-2 mt-2 mb-0 lh-1'>The Lower Case</h1>
        <div style={{width:'90%', fontFamily:'serif'}} className='d-flex justify-content-between mx-auto'>
            <h6 className='h6 align-top mb-0 lh-1'> Month,year</h6>
            <h6 className='h6 text-center align-top mb-0 lh-1'> Volume #</h6>
        </div>
        <hr style={{color:'black', width:'90%', opacity: '100%'}}className='mx-auto m-1'></hr>
    </>
  )
}

export default Title