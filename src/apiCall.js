const apiCall = (url) => {
    return fetch(`http://localhost:3000${url}`).then((res) => res.json());
};

export default apiCall;
