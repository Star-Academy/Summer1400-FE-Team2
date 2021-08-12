const API = {
    baseUrl: "https://songs.code-star.ir/",
    routes: {
        getUser: "user/one/",
        postToken: "user/auth",
        postRegister: "user/register",
        postLogin: "user/login",
        postAlter: "user/alter",
        getAllSongs: "song/all",
        getOneSong: "song/one/",
        postFilterSongs: "song/page",
        postSearch: "song/find",
        getPlaylist: "playlist/one/",
        postAllPlaylists: "playlist/all",
        postCreatePlaylist: "playlist/create",
        postRemovePlaylist: "playlist/remove",
        postAddSong: "playlist/add-song",
        postRemoveSong: "playlist/remove-song",
    },
};

const GetData = (url, id = "") => {
    return fetch(API.baseUrl + API.routes[url] + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer ",
        },
    }).then((res) => res.json());
};

const PostData = async(url, body) => {
    const data = await fetch(API.baseUrl + API.routes[url], {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer "
        },
        body: JSON.stringify(body),
    });
    console.log(data);
    // if (data.status == 200 && data.statusText == "") {
    //     return "successful";
    // }
    const text_data = await data.text();
    if (data.status == 200 && text_data == "") {
        console.log('heeeeeeeeeeeeello');
        return "successfully";
    } else {
        // const json = await data.json();
        console.log(JSON.parse(text_data));
        if (data.status < 400) return JSON.parse(text_data);
        throw JSON.parse(text_data);
    }
};

const CheckObj = (obj) => {
    let allFilled = true;
    Object.keys(obj).forEach(function(key) {
        if (obj[key] === "") {
            allFilled = false;
        }
    });
    return allFilled;
};