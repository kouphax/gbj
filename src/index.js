import { render } from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Workouts from './components/Workouts';
import Workout from './components/Workout';
import Exercise from './components/Exercise';

const rootElement = document.getElementById('root');

render(
  <>
    <CssBaseline />
    <HashRouter>
      <Routes>
        <Route path="/" element={<Workouts />}/>
        <Route path="/workout/:id" element={<Workout />}/>
        <Route path="/exercise/:id" element={<Exercise />}/>
      </Routes>
    </HashRouter>
  </>,
  rootElement,
);
