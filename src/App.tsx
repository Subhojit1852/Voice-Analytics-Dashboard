import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Dashboard from './pages/Dashboard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0f1a',
      paper: '#11162a',
    },
    primary: {
      main: '#6366f1',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}
