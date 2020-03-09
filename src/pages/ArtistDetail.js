import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ArtistDetail(props){

  const artist = props.location.state.artist
  const [isBusy, setBusy] = useState(true)
  const[album, setAlbum] = useState([])

  useEffect(()=>{
    const fetchAlbuns = async() => {
      // console.log("OIII")
      const data = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer BQCC__mbjr3HE0cN2fkwhfDKd9iAOCpeuSaA7vbIFxZZm8tWnmZS8kZkPUr_NXb1sKn9If_gDBq1bq5E3VQqA9fLoqhOQhVYwqv7jsceS--ApETT_mm3Ty78cWIEjHXPW9FYuc-AOIEUDI7iCo6XFfN0FfQWw9kaEuZylDFiTeu3jFwVa27pHilRZoBZJnam9aCXRQeYpa66qUOEm-YspbbxNFuYS_uUUnbX2Si5BDNIQ-2hsP9nkcJ4PUrr0VKX0NHQlMhepe6KAbY'
        }
      })
      await data.json().then(function(result){
        // console.log(result)
        setAlbum(result.items)
        setBusy(false)
      })   
      
    }
    fetchAlbuns()
  },[artist.id])
  
  return(
    <div>
      <button>
        <Link to={{pathname:`/search`, state:{artist}}}>Back</Link>
      </button>
      <h1>{artist.name}</h1>
      <img src={artist.images[0].url} alt=""></img>
      <h2>Followers: {artist.followers.total}</h2>
      <h2>Spotify: {artist.external_urls.spotify}</h2>
      <h2>Genres: {artist.genres}</h2>
      <h2>Popularity: {artist.popularity}</h2>
      <h2>Id: {artist.id}</h2>


      {
      isBusy ? <div>Loading</div>:
        <ul>
          {album.map(item=>{
            return (
              <div key={item.id}>
                <li>{item.name}</li>
                <li>{item.release_date}</li>
                {typeof artist.images !== 'undefined' && artist.images.length > 0 ? <img src={artist.images[0].url} alt=""></img>: <span>No Image!</span>}
              </div>
            )
          })}
        </ul>
      }
    </div>
  )
}