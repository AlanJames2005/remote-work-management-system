import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { WorkProvider } from './context/WorkContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WorkProvider>
        <App />
      </WorkProvider>
    </AuthProvider>
  </React.StrictMode>
)
