import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import './assets/style/home.scss'
import './assets/style/navigation.scss'
import './assets/style/remainingTask.scss'
import './assets/style/login.scss'
import './assets/style/task.scss'
import './assets/style/quicknote.scss'
import './assets/style/todo.scss'
import './assets/style/askAI.scss'
import './assets/style/notification.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
