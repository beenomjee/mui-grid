import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
