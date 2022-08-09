import React from "react";
import { store } from './store/store';
const userId = () => store.getState().userSettings.id;


async function getLoginUser(body) {
    return fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}

async function setRegisterUser(body) {
    return fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

}

async function getAllVacations() {
    return fetch(`/api/vacation/`, {
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },

    }).then(res => res.json())
}
async function getUserVacationsFollower() {
    return fetch(`api/vacation/follow/${userId}`, {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'id': userId(),
            'Content-Type': 'application/json'
        }

    }).then(res => res.json())
}
async function getUserVacationsFollowerOnly() {
    return fetch(`api/vacation/follow/only/${userId}`, {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'id': userId(),
            'Content-Type': 'application/json'
        }

    }).then(res => res.json())
}

async function setFollowVacation(vid) {
    return fetch(`api/vacation/follow/${vid}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'id': userId(),
            'Content-Type': 'application/json'
        },


    }).then(res => res.json())
}

async function unFollowVacation(vid) {
    return fetch(`api/vacation/follow/${vid}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'id': userId(),
            'Content-Type': 'application/json'
        },


    }).then(res => res.json())
}


async function addNewVacation(body) {
    return fetch(`api/vacation/admin`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'id': userId()
        },
        body: body

    }).then(res => res.json())
}

async function updateVacation(vid, body) {
    return fetch(`http://localhost:3000/api/vacation/admin/${vid}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'id': userId()

        },
        body: body

    }).then(res => res.json())
}


async function removeVacation(vid) {
    return fetch(`api/vacation/admin/${vid}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'id': userId(),
            'Content-Type': 'application/json'
        }


    }).then(res => res.json())
}

async function getVacationFollowers() {
    return fetch(`api/report/admin`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'id': userId(),
            'Content-Type': 'application/json'
        }

    }).then(res => res.json())
}

function getToken() {
    return sessionStorage.getItem('token');
}
export {
    getLoginUser,
    setRegisterUser,
    getAllVacations,
    getToken,
    getUserVacationsFollower,
    getUserVacationsFollowerOnly,
    setFollowVacation,
    unFollowVacation,
    addNewVacation,
    updateVacation,
    removeVacation,
    getVacationFollowers

};

