import React, { useEffect, useState } from 'react';
import './ListOfPlaylists.css';
import { read } from '../Network/Ajax';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';
import NotFound from '../Services/NotFound';

function OnePlaylist() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [playList, setPlaylist] = useState();
    const [songList, setSongsList] = useState([]);

    useEffect(() => {
        read(`playlists/byId/${id}`)
            .then((res) => {
                setPlaylist(res[0]);
                setSongsList(res);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setLoading(false);
            })
    }, [id]);

    return (
        playList ?
            <div className='OnePlayList'>
                <div className='OnePlayListContainer'>
                    <img src={playList.playlist_cover} alt={playList.playlist_name} height='300px' />
                    <div className='OnePlayListDescription'>
                        <div>Name: {playList.playlist_name}</div>
                        <div>created_at: {new Date(playList.created_at).toDateString()}</div>
                        <div>upload_at{new Date(playList.upload_at).toDateString()}</div>
                    </div>
                </div>
                <ListOfSongs query={{ path: "playlist", id: playList.playlist_ID }} className='PlayListSongsList' songList={songList} />
            </div>
            :
            !loading ?
                <NotFound />
                : <div></div>
    )

}

export default OnePlaylist;