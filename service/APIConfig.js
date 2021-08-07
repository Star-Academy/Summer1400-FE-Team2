const API = {
  baseUrl: "http://130.185.120.192:5000/",
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

const GetData = (url) => {
  return fetch(API.baseUrl + API.routes[url], {
    method: "GET",
    headers: {
      Authorization: "Bearer ",
    },
  }).then((res) => res.json());
};

const PostData = async (url, body) => {
  const data = await fetch(API.baseUrl + API.routes[url], {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer ",
    },
    body: JSON.stringify(body),
  });

  const json = await data.json();

  if (data.status < 300) return json;
  throw json;
};

const CheckObj = (obj) => {
  let allFilled = true;
  Object.keys(obj).forEach(function (key) {
    if (obj[key] === "") {
      allFilled = false;
    }
  });
  return allFilled;
};
