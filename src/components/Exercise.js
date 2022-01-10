import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as R from 'ramda';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { List, ListItem } from '@mui/material';
import Set from './Set';
import { RefdataContext } from '../data/context';

const generateSets = R.pipe(
  R.range(0, R.__),
  R.map(R.identity(() => ({
    weight: {
      current: null,
      previous: null,
    },
    reps: {
      current: null,
      previous: null,
    },
  }))),
);

function createSetState(id) {
  const stored = JSON.parse(localStorage.getItem(`exercise-${id}`));
  const value = generateSets(4);
  if (stored && Object.values(stored).length > 0) {
    const previous = Object.values(stored).at(-1);
    for (let i = 0; i < value.length; i += 1) {
      value[i].weight.previous = previous[i].weight.current;
      value[i].reps.previous = previous[i].reps.current;
    }
  }

  return value;
}ø;

export default function Exercise() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { refdata: { exercises } } = useContext(RefdataContext);
  const [sets, setSets] = useState(createSetState(id));

  const [exercise, setExercise] = useState(exercises[id]);
  return <>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{
          flexGrow: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          { exercise.title }
        </Typography>
        { exercise.alt && <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setExercise(exercises[exercise.alt]);
              setSets(createSetState(exercise.alt));
            }}>
            <ChangeCircleIcon/>
          </IconButton>}
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={() => {
            const stored = JSON.parse(localStorage.getItem(`exercise-${id}`)) || {};
            window.localStorage.setItem(`exercise-${id}`, JSON.stringify({
              ...stored,
              [new Date().toISOString()]: sets,
            }));
            navigate(-1);
          }}>
          <DoneIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Toolbar />
    <List>
      {
        R.map(
          (i) => (
            <ListItem>
              <Set key={`set-${i}`} index={i} sets={sets} setSets={setSets}/>
            </ListItem>),
          R.range(0, 4),
        )
      }
    </List>
  </>;
}
