import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function ArtistDetail(props){

  const artist = props.location.state.artist
  const [isBusy, setBusy] = useState(true)
  const[album, setAlbum] = useState([])
  const matchHistory = useHistory()

  useEffect(()=>{
    const fetchAlbuns = async() => {
      // console.log("OIII")
      const data = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer BQAt-NKcok2Ex2B3TZnhYDCbjFgZqU-MJvmQUqr5QNt348DWPLxm9GoEaU8wSZQo3s_CroYmE2R6wl8s3BLR-Xg4z1KLvvyQbqpG8_MvzWXPEcRKwZkyY4CqEFdPZZK8zzDzGYXx-ojePA2J23o'
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
        {/* <Link to={{pathname:`/search`, state:{artist}}}>Back</Link> */}
        <a onClick={()=>{matchHistory.goBack()}}>Back</a>
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
            // console.log(item)
            return (
              <div key={item.id}>
                <li>{item.name}</li>
                <li>{item.release_date}</li>
                {typeof item.images !== 'undefined' && item.images.length > 0 ? <img src={item.images[0].url} alt=""></img>: <span>No Image!</span>}
              </div>
            )
          })}
        </ul>
      }
    </div>
  )
}