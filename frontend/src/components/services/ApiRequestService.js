import React from 'react';
import axios from 'axios';

const BASE_URL = "https://localhost:8080";
export function get(url) {
    return axios.get(BASE_URL+url);
}

export function post(url, body) {
    return axios({
        url: BASE_URL+url,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: body
    });
}