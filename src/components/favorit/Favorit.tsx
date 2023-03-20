function Favorit({input_id,checkFavorit,favoritCount,onChange}:any) {
    // const count = FavProps.length
   
    return (
    <>
      
        <p>
            <input id={input_id} type="checkbox" onChange={(e)=> onChange(e)}  checked={checkFavorit}/>
            <label htmlFor={input_id}>
                좋아요 - ({favoritCount}) - ({JSON.stringify(checkFavorit)})
            </label>
        </p>
    </>
    )
}

export default Favorit