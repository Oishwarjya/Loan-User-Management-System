import React from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:8081";
export function get(url) {
    return axios.get(BASE_URL+url, {
        headers: {
          "Content-Type": "application/json"
      }});
}

export function post(url, body) {
    return axios.post(BASE_URL+url,body,{
        headers: {
          "Content-Type": "application/json"
      }});
}

export function del(url, body) {
    return axios.delete(BASE_URL+url, body, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}