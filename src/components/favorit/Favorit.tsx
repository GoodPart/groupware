function Favorit({auth, FavProps, favLength}:any) {
    // const count = FavProps.length
   
    console.log(auth)

    return (
    <>
      
        <p>
            <input id='like' type="checkbox" disabled={auth ? false : true} onChange={(e)=> {console.log('좋아요 토글', e.currentTarget.checked)}}/>
            <label htmlFor='like'>
                좋아요 - {favLength}
            </label>
        </p>
    </>
    )
}

export default Favorit