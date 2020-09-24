import Cookies from 'js-cookie';

export function GetYTId(songId) {
    let videoId = songId.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }
    return videoId
}

export const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 450, itemsToShow: 2 },
    { width: 700, itemsToShow: 3 },
    { width: 1000, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
]

export function removeTokents() {
    Cookies.remove('name')
    Cookies.remove('token')
    Cookies.remove('isAdmin')
}
