import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  Chip, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefdataContext } from '../data/context';

export default function Workouts() {
  const { refdata: { workouts } } = useContext(RefdataContext);
  const allCompleted = (JSON.parse(localStorage.getItem('completed')) || []);
  const navigate = useNavigate();
  return <>
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Workouts
        </Typography>
      </Toolbar>
    </AppBar>
    <Toolbar />

    <List >
      {
        Object.values(workouts)
          .map((e) => (<ListItem key={e.id} disablePadding selected={allCompleted.includes(e.id)}>
            <ListItemButton onClick={() => navigate(`/workout/${e.id}`) }>
              <ListItemText
                primary={
                  <Typography variant="h6" component="p" sx={{ flexGrow: 1 }}>
                    {e.title}
                  </Typography>
                }
                secondary={
                  <Fragment>
                    {e.focus.map((f) => (<Chip key={f} size="small" label={f} sx={{ mr: 1 }}/>))}
                  </Fragment>
                }
              />
            </ListItemButton>
          </ListItem>))
      }
    </List>
  </>;
}
