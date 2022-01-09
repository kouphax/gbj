import Flexbox from 'flexbox-react';
import PropTypes from 'prop-types';

const REP_RANGE = ['12-15', '10-12', '6-8', '4-6'];

export default function Set({ index, sets, setSets }) {
  return <Flexbox element="main" flexDirection="row" alignItems="stretch" className="set-row">
    {/* <Flexbox alignItems="top" flex="0.5"> */}
    {/*   <h2>Set {index + 1}</h2> */}
    {/* </Flexbox> */}
    <Flexbox flex="2">
      <div className="input-container">
        <div className="label">Reps ({REP_RANGE[index]}) (prev: {sets[index].reps.previous || 'n/a'}):</div>
        <input type="number" value={sets[index].reps.current || ''} onChange={(e) => {
          const newSets = [...sets];
          newSets[index].reps = {
            current: parseInt(e.target.value, 10),
            previous: sets[index].reps.previous,
          };
          setSets(newSets);
        }}/>
      </div>
    </Flexbox>
    <Flexbox flex="2">
      <div className="input-container">
        <div className="label">Weight (prev: {sets[index].weight.previous || 'n/a'}):</div>
        <input type="number" value={sets[index].weight.current || ''} onChange={(e) => {
          const newSets = [...sets];
          newSets[index].weight = {
            current: parseInt(e.target.value, 10),
            previous: sets[index].weight.previous,
          };
          setSets(newSets);
        }}/>
      </div>
    </Flexbox>
  </Flexbox>;
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
