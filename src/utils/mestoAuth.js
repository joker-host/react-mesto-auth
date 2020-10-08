import { newBaseUrl } from './constants'

export const register = (email, password) => {
    return fetch(`${newBaseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
<<<<<<< HEAD
        body: JSON.stringify({email, password})
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
=======
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        })
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
}

export const authorize = (email, password) => {
    return fetch(`${newBaseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
<<<<<<< HEAD
        body: JSON.stringify({email, password})
    })
    .then((response => response.json()))
    .then((data) => {
        console.log(data)
        if(data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
        } else {
            return;
        }
    })
    .catch((err) => {
        console.log(err);
    })
=======
        body: JSON.stringify({ email, password })
    })
        .then((response => response.json()))
        .then((data) => {
            localStorage.setItem('jwt', data.token);
            return data;
        })
        .catch((err) => {
            console.log(err);
        })
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
}

export const getContent = (token) => {
    return fetch(`${newBaseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
<<<<<<< HEAD
            "Authorization" : `Bearer ${token}`
        }
    })
    .then((res) => {
        return res.json();
    })
    .then(data => data)
    .catch((err) => {
        console.log(err);
    })
=======
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => {
            return res.json();
        })
        .then(data => data)
        .catch((err) => {
            console.log(err);
        })
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
}