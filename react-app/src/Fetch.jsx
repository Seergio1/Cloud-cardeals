import React from 'react'
import { json } from 'react-router-dom';





export async function FetchSpec({ path, method, requestBody }) {
  let data = []
  const apiGet = await fetch(`https://cloud-project-production.up.railway.app${path}`, {
    method: method,
    body: JSON.stringify(requestBody),
    headers: {
      // Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((json) => data = json)
    .catch((error) => console.error('Error signin/signup:', error));
  return data;
}




export async function FetchSpecPOST({ path, method, requestBody }) {
  let data = []
  const apiGet = await fetch(`https://cloud-project-production.up.railway.app${path}`, {
    method: method,
    body: JSON.stringify(requestBody),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((json) => data = json)
    .catch((error) => console.error('Error POST:', error));
  // console.log(data);
  return data;
}

export async function FetchSpecGET({ path, method }) {
  let data = []
  // console.log(localStorage.getItem("token"));
  const apiGet = await fetch(`https://cloud-project-production.up.railway.app${path}`, {
    method: method,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((json) => data = json)
    .catch((error) => console.error('Error GET:', error));
  return data;
}

export async function FetchSpec2({ path, method }) {
  let data = []
  const apiGet = await fetch(`https://cloud-project-production.up.railway.app${path}`, {
    method: method,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((json) => data = json)
    .catch((error) => console.error('Error PUT or DELETE:', error));
  // console.log(data);
  return data;
}

export async function FetchSpecUpdate({ path, method, requestBody }) {
  let data = []
  const apiGet = await fetch(`https://cloud-project-production.up.railway.app${path}`, {
    method: method,
    body: JSON.stringify(requestBody),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((json) => data = json)
    .catch((error) => console.error('Error POST:', error));
  // console.log(data);
  return data;
}

