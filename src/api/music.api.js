// src/api/music.api.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/api/music',
  withCredentials: true
})

export const getAllMusics   = ()    => api.get('/')
export const getAllAlbums   = ()    => api.get('/albums')
export const getAlbumById  = (id)  => api.get(`/albums/${id}`)
export const getMyMusics   = ()    => api.get('/my-music')  

export const uploadMusic   = (fd)  =>
  api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })

export const createAlbum   = (data) => api.post('/album', data)