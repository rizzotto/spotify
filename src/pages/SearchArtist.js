import React, { useEffect } from 'react'
import {useState} from 'react';
import { Link, useHistory } from "react-router-dom";


export default function SearchArtist(props){
  //let usgu = props.location.state

  const [items, setItems] = useState([])
  const matchHistory = useHistory()

  const fetchData = async() =>{
    //console.log(usgu)
    let artist = document.getElementById("inputArtist").value
    //usgu==null ? artist = document.getElementById("inputArtist").value :  artist = usgu.artist.id

    // const tokenData = await fetch('https://www.getpostman.com/oauth2/callback',{
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin:':'https://localhost:3001'
    //   },
    //   // body: 'grant_type=authorization_code&client_id=' + '744a264239bb474c999a5de25d49dad3' + '&client_secret=' + 'eb94c2cf67034bd892d413c1eeb9f5d0' + '&redirect_url=https://localhost:3001'
    //   body: {
    //     'client_id': '744a264239bb474c999a5de25d49dad3',
    //     'client_secret': 'eb94c2cf67034bd892d413c1eeb9f5d0',
    //     'grant_type': 'authorization_code',
    //     'redirect_url': 'https://localhost:3001'
    //   }
    // })
    // const token = await tokenData.json()
    // console.log(token)
    
    console.log('Oi' + artist)
    const rawResponse = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&market=US`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer BQDw08v6spH8rpOnKbxsHEagbeMcev7vbYXoTY4RF-iqHzuCAMUXemRcEN7smjpprgHGvFxFsOadWuCOhTFcfXJ3mhbvdBWiw9Rtw5GoHxHQL0KrYz938CQrYFQeZA1pvu-NCLttMC070rZ3gUU'
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
      <button>
        <a onClick={()=>{matchHistory.goBack()}}>Back</a>
      </button>
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
