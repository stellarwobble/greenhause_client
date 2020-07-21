const API_ROOT = `http://localhost:5000/api/v1`;
const token = localStorage.getItem("token");
// trefle api
const trefleToken = `aVBFUDBJTEdnbWs5WlBCMTdKcDdCZz09`;
const trefelRoot = `https://trefle.io/api/v1/plants/search?token=${trefleToken}&q=`;
//proxy
const proxy = `https://cors-anywhere.herokuapp.com`;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: token,
};

const login = (username, password) => {
  return fetch(`${API_ROOT}/auth/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers,
  }).then((res) => res.json());
};

const getCanvas = () => {
  return fetch(`${API_ROOT}/canvas/`, { headers: headers }).then((res) =>
    res.json()
  );
};

const postCanvas = (image) => {
  return fetch(`${API_ROOT}/canvas/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      canvas: {
        canvas: image,
        user_id: localStorage.getItem("id"),
      },
    }),
  });
};

const searchPlants = (searchvalue) => {
  return fetch(`${proxy}/${trefelRoot}&q=${searchvalue}`).then((res) =>
    res.json()
  );
};

export default {
  auth: {
    login: login,
    getCurrentUser: getCurrentUser,
  },
  canvas: {
    getCanvas,
    postCanvas,
  },
  plants: {
    searchPlants,
  },
};
