import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  Box,
  Checkbox,
  Chip,
  FilledInput,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { RefdataContext } from '../data/context';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Exercises() {
  const { refdata: { exercises } } = useContext(RefdataContext);
  const navigate = useNavigate();
  const focuses = [...new Set(Object.values(exercises).map((e) => e.focus))].sort((a, b) => a.localeCompare(b));
  const [selected, setSelected] = useState(focuses);
  const [filteredExercises, setFilteredExercises] = useState(Object
    .values(exercises)
    .sort((a, b) => a.title.localeCompare(b.title)));

  return <>
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Exercises
        </Typography>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate('/')}>
          <GroupWorkIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Toolbar />
    <FormControl sx={{ width: '100%' }}>
      <Select
        multiple
        value={selected}
        onChange={(event) => {
          const { target: { value } } = event;
          setSelected(value);
          setFilteredExercises(Object.values(exercises)
            .sort((a, b) => a.title.localeCompare(b.title))
            .filter((e) => value.includes(e.focus)));
        }}
        input={<FilledInput sx={{ pb: 2 }}/>}
        renderValue={(s) => (
          <Box sx={{
            display: 'flex', flexWrap: 'wrap', gap: 0.5,
          }}>
            {s.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {focuses.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selected.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
        ))}
      </Select>
    </FormControl>
    <List >
      {
        filteredExercises
          .map((e) => (<ListItem key={e.id} disablePadding>
            <ListItemButton onClick={() => navigate(`/exercise/${e.id}`) }>
              <ListItemText
                primary={
                  <Typography variant="h6" component="p" sx={{ flexGrow: 1 }}>
                    {e.title}
                  </Typography>
                }
                secondary={
                  <Fragment>
                    <Chip key={e.focus} size="small" label={e.focus} sx={{ mr: 1 }}/>
                  </Fragment>
                }
              />
            </ListItemButton>
          </ListItem>))
      }
    </List>
  </>;
}
