import React, { useEffect } from 'react'
import {useState} from 'react';
import { Link } from "react-router-dom";


export default function SearchArtist(props){
  //let usgu = props.location.state

  const [items, setItems] = useState([])

  const fetchData = async() =>{
    //console.log(usgu)
    let artist = document.getElementById("inputArtist").value
    //usgu==null ? artist = document.getElementById("inputArtist").value :  artist = usgu.artist.id
    
    console.log('Oi' + artist)
    const rawResponse = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&market=US`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer BQCC__mbjr3HE0cN2fkwhfDKd9iAOCpeuSaA7vbIFxZZm8tWnmZS8kZkPUr_NXb1sKn9If_gDBq1bq5E3VQqA9fLoqhOQhVYwqv7jsceS--ApETT_mm3Ty78cWIEjHXPW9FYuc-AOIEUDI7iCo6XFfN0FfQWw9kaEuZylDFiTeu3jFwVa27pHilRZoBZJnam9aCXRQeYpa66qUOEm-YspbbxNFuYS_uUUnbX2Si5BDNIQ-2hsP9nkcJ4PUrr0VKX0NHQlMhepe6KAbY'
      },
    });
    const content = await rawResponse.json();
    setItems(content.artists.items)
    // usgu = null
  }
  //Quando voltar, fazer renderizar
  useEffect(()=>{
    // usgu && fetchData() 
  },[])

  return(
    <div>
      {/* <button></button> */}
      <input id="inputArtist" placeholder="search for an artist"></input>
      <button onClick={()=>{fetchData()}}>Search</button>
      <ul>
        {items.map(artist=>{
          return (
            <div key={artist.id} >
              <li><Link to={{pathname:`/search/${artist.id}`, state:{artist}}} >{artist.name}</Link></li>
              {typeof artist.images !== 'undefined' && artist.images.length > 0 ? <img src={artist.images[0].url} alt=""></img>: <span>No Image!</span>}
            </div>
          )
        })}
      </ul>
    </div>
  )
}
