import React, { useState, useEffect } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { read, create } from '../../Network/Ajax';
import Select from 'react-select';

function AddSongToPlayList({ openModal, setOpenModal, formatDate }) {

    const [playListList, setPlayListList] = useState([])
    const [songsList, setSongsList] = useState([])

    const [PlayList, setPlayList] = useState();
    const [song, setSong] = useState();

    useEffect(() => {
        (() => {
            read(`playlists`)
                .then((res) => setPlayListList(res))
                .catch((err) => console.error(err))
        })();
    }, [])

    let playListOptions = playListList.map((playlist) => {
        return {
            value: playlist.playlistId, label: playlist.name
        }
    })

    const getSongsList = () => {
        read(`songs`)
            .then((res) => setSongsList(res))
            .catch((err) => console.error(err))
    }

    let songsOptions = songsList.map((song) => {
        return {
            value: song.songId, label: song.name
        }
    })

    const handleClose = () => setOpenModal(false);

    const sendSongToPlayList = () => {
        const newConneaction = {
            songId: song,
            playlistId: PlayList
        }
        create('playlists/songs', newConneaction)
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }

    return (
        <>
            <Modal
                show={openModal}
                onHide={handleClose}
                onEscapeKeyDown={handleClose}
                backdrop="static"
                keyboard={false}
                className="addNewModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New PlayList</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label >PlayLists:</label>
                    <Select options={playListOptions} onChange={(e) => { setPlayList(e.value); getSongsList(); }} />
                    <label >Songs:</label>
                    <Select options={songsOptions} onChange={(e) => setSong(e.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={sendSongToPlayList} >Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddSongToPlayList;
