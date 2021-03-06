const API_ROOT = `http://localhost:5000/api/v1`;
// const token = localStorage.getItem("token");
// trefle api
const trefleToken = `aVBFUDBJTEdnbWs5WlBCMTdKcDdCZz09`;
const trefelRoot = `https://trefle.io/api/v1/plants/search?token=${trefleToken}&q=`;
//proxy
const proxy = `https://cors-anywhere.herokuapp.com`;

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: localStorage.getItem("token"),
  };
};

const login = (username, password) => {
  return fetch(`${API_ROOT}/auth/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers(),
  }).then((res) => res.json());
};

const getUserInfo = () => {
  return fetch(`${API_ROOT}/profile`, {
    headers: headers(),
  }).then((res) => res.json());
};

const patchCurrentUser = (value) => {
  return fetch(`${API_ROOT}/profile`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({
      user: {
        bio: value,
      },
    }),
  }).then((res) => res.json());
};

const getCanvas = () => {
  return fetch(`${API_ROOT}/canvas/`, { headers: headers() }).then((res) =>
    res.json()
  );
};

const postCanvas = (image) => {
  // console.log({
  //   canvas: {
  //     image: image,
  //   },
  // });
  return fetch(`${API_ROOT}/canvas/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      canvas: {
        image: image,
      },
    }),
  });
};

const editCanvasNote = (value, id) => {
  return fetch(`${API_ROOT}/canvas/${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({
      canvas: {
        canvas_notes: value,
      },
    }),
  });
};

const deleteCanvas = (id) => {
  return fetch(`${API_ROOT}/canvas/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
};

const searchPlants = (searchvalue) => {
  return fetch(`${proxy}/${trefelRoot}&q=${searchvalue}`).then((res) =>
    res.json()
  );
};

const postPlants = (values) => {
  return fetch(`${API_ROOT}/plantcards`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      plantcard: values,
    }),
  });
};

const getPlants = () => {
  return fetch(`${API_ROOT}/plantcards`, {
    headers: headers(),
  }).then((res) => res.json());
};

const getPlantNotes = (id) => {
  return fetch(`${API_ROOT}/plantcollections/${id}`, {
    headers: headers(),
  }).then((res) => res.json());
};

const patchPlantNote = (value, id) => {
  return fetch(`${API_ROOT}/plantcollections/${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({
      plantcollection: {
        plantnote: value,
      },
    }),
  });
};

const deletePlant = (plantid) => {
  return fetch(`${API_ROOT}/plantcollections/${plantid}`, {
    method: "DELETE",
    headers: headers(),
  });
};

export default {
  auth: {
    login: login,
    getCurrentUser: getCurrentUser,
    patchCurrentUser,
    getUserInfo,
  },
  canvas: {
    getCanvas,
    postCanvas,
    editCanvasNote,
    deleteCanvas,
  },
  plants: {
    searchPlants,
    postPlants,
    getPlants,
    deletePlant,
    getPlantNotes,
    patchPlantNote,
  },
};
