import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { read, create } from '../../Network/Ajax';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function AddSongToPlayList({ openModal, setOpenModal }) {

    const [playListList, setPlayListList] = useState([])
    const [songsList, setSongsList] = useState([])

    const [PlayList, setPlayList] = useState();
    const [song, setSong] = useState();


    const getPlaylistsList = () => {
        read(`/api/v1/playlists`)
            .then(setPlayListList)
            .catch(console.error)
    }

    const getSongsList = () => {
        read(`/api/v1/songs`)
            .then(setSongsList)
            .catch(console.error)
    }

    const handleClose = () => setOpenModal(false);

    const sendSongToPlayList = () => {
        const newConneaction = {
            songId: song,
            playlistId: PlayList
        }
        create('/api/v1/songsInPlaylists', newConneaction)
            .then(handleClose)
            .catch(console.error)
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
                    <DropdownButton id="dropdown-basic-button" title="Playlists" onToggle={getPlaylistsList} onSelect={setPlayList} >
                        {playListList.map((option) =>
                            <Dropdown.Item key={option.name} eventKey={option.id} >{option.name}</Dropdown.Item>
                        )}
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" title="Songs" onToggle={getSongsList} onSelect={setSong} >
                        {songsList.map((option) =>
                            <Dropdown.Item key={option.name} eventKey={option.id} >{option.name}</Dropdown.Item>
                        )}
                    </DropdownButton>
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
