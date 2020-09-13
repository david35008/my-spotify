import React, { useEffect, useState } from 'react';
import './OneAlbum.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Home/ListOfSongs';


function OneAlbum() {

    const { id } = useParams()
    const [album, setAlbums] = useState([])
    const [songList, setSongsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/album/${id}`);
                setAlbums(data[0])
                setSongsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [id]);

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    return (
        <div className='OneAlbum'>
            <div className='AlbumContainer'>
            <img src={album.cover_img} alt={album.name} height='300px' />
            <div className='OneAlbumDescription'>
            <div>Name: {album.name}</div>
            <div>Artist: {album.artist_ID}</div>
            <div>created_at: {new Date(album.created_at).toDateString()}</div>
            <div>upload_at{new Date(album.upload_at).toDateString()}</div>
            </div>
            </div>
            <ListOfSongs className='albumSongsList' songList={songList} getIdSong={getIdSong} />
        </div>
    )

}

export default OneAlbum;
