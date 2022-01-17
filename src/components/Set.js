import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@mui/material';

const REP_RANGE = ['12-15', '10-12', '6-8', '4-6'];

export default function Set({ index, sets, setSets }) {
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h6">Set {index + 1}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography component="div" sx={{ mb: 1 }}>Reps ({REP_RANGE[index]}):</Typography>
      <TextField label={`prev: ${sets[index].reps.previous || 'n/a'}`}
                 variant="outlined"
                 novalidate
                 inputMode="numeric"
                 inputProps={{ inputMode: 'numeric' }}
                 value={sets[index].reps.current || ''}
                 onChange={(e) => {
                   const newSets = [...sets];
                   newSets[index].reps = {
                     current: e.target.value,
                     previous: sets[index].reps.previous,
                   };
                   setSets(newSets);
                 }}/>
    </Grid>
    <Grid item xs={6}>
      <Typography component="div" sx={{ mb: 1 }}>Weight:</Typography>
      <TextField label={`prev: ${sets[index].weight.previous || 'n/a'}`}
                 variant="outlined"
                 inputProps={{ inputMode: 'numeric' }}
                 novalidate
                 value={sets[index].weight.current || ''}
                 onChange={(e) => {
                   const newSets = [...sets];
                   newSets[index].weight = {
                     current: e.target.value,
                     previous: sets[index].weight.previous,
                   };
                   setSets(newSets);
                 }}/>

    </Grid>
  </Grid>;
}

Set.propTypes = {
  index: PropTypes.number.isRequired,
  sets: PropTypes.arrayOf(
    PropTypes.shape({
      reps: PropTypes.shape({
        current: PropTypes.number,
        previous: PropTypes.number,
      }),
      weight: PropTypes.shape({
        current: PropTypes.number,
        previous: PropTypes.number,
      }),
    }),
  ).isRequired,
  setSets: PropTypes.func.isRequired,
};
