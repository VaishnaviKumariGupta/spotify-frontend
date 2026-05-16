// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider }   from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext'
import ProtectedRoute     from './components/ProtectedRoute'

import WelcomePage    from './pages/WelcomePage'
import LoginPage      from './pages/LoginPage'
import RegisterPage   from './pages/RegisterPage'

// User pages
import HomePage       from './pages/user/HomePage'
import SongsPage      from './pages/user/SongsPage'
import AlbumsPage     from './pages/user/AlbumsPage'
import AlbumDetailPage from './pages/user/AlbumDetailPage'

// Artist pages
import ArtistDashboard  from './pages/artist/ArtistDashboard'
import UploadMusicPage  from './pages/artist/UploadMusicPage'
import CreateAlbumPage  from './pages/artist/CreateAlbumPage'
import MySongsPage      from './pages/artist/MySongsPage'
import MyAlbumsPage     from './pages/artist/MyAlbumsPage'

import './styles/common.css'

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/"         element={<WelcomePage />} />
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* User Routes */}
            <Route path="/home" element={
              <ProtectedRoute allowedRole="user"><HomePage /></ProtectedRoute>
            }/>
            <Route path="/songs" element={
              <ProtectedRoute allowedRole="user"><SongsPage /></ProtectedRoute>
            }/>
            <Route path="/albums" element={
              <ProtectedRoute allowedRole="user"><AlbumsPage /></ProtectedRoute>
            }/>
            <Route path="/album/:albumId" element={
              <ProtectedRoute allowedRole="user"><AlbumDetailPage /></ProtectedRoute>
            }/>

            {/* Artist Routes */}
            <Route path="/artist" element={
              <ProtectedRoute allowedRole="artist"><ArtistDashboard /></ProtectedRoute>
            }/>
            <Route path="/artist/upload" element={
              <ProtectedRoute allowedRole="artist"><UploadMusicPage /></ProtectedRoute>
            }/>
            <Route path="/artist/create-album" element={
              <ProtectedRoute allowedRole="artist"><CreateAlbumPage /></ProtectedRoute>
            }/>
            <Route path="/artist/my-songs" element={
              <ProtectedRoute allowedRole="artist"><MySongsPage /></ProtectedRoute>
            }/>
            <Route path="/artist/my-albums" element={
              <ProtectedRoute allowedRole="artist"><MyAlbumsPage /></ProtectedRoute>
            }/>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
  )
}