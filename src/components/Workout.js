import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Chip, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import { RefdataContext } from '../data/context';

export default function Workout() {
  const { id } = useParams();
  const { refdata: { exercises, workouts } } = useContext(RefdataContext);
  const navigate = useNavigate();
  const workout = workouts[id];
  const allCompleted = (JSON.parse(localStorage.getItem('completed')) || []);
  const completed = allCompleted.includes(id);
  const exerciseDoneToday = (eid) => {
    const stored = JSON.parse(localStorage.getItem(`exercise-${eid}`));
    const today = new Date().toISOString().substring(0, 10);
    return stored && Object.keys(stored)
      .filter((k) => k.startsWith(today))
      .length > 0;
  };

  return <>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate('/')}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{
          flexGrow: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          { workout.title }
        </Typography>
        { completed
          ? <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              localStorage.setItem('completed', JSON.stringify(allCompleted.filter((w) => w !== id)));
              navigate('/');
            }}>
            <ClearIcon/>
          </IconButton>
          : <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              localStorage.setItem('completed', JSON.stringify([...allCompleted, id]));
              navigate('/');
            }}>
            <DoneIcon />
          </IconButton>}

      </Toolbar>
    </AppBar>
    <Toolbar />
    <List>
      {
        workout.exercises.map((e) => exercises[e]).map((e) => <>
          <ListItem disablePadding selected={exerciseDoneToday(e.id)}>
          <ListItemButton onClick={() => navigate(`/exercise/${e.id}`) }>
            <ListItemText primary={
                <Fragment>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {e.title}
                  </Typography>
                </Fragment>
              }
              secondary={<Fragment><Chip size="small" label={e.focus} sx={{ mr: 1 }}/></Fragment>}
            />
          </ListItemButton>
        </ListItem>
        </>)

      }
    </List>
  </>;
}
