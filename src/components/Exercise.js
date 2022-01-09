import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Flexbox from 'flexbox-react';
import * as R from 'ramda';
import { RefdataContext } from '../data/context';
import BackButton from './BackButton';
import Set from './Set';

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
}

export default function Exercise() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { refdata: { exercises } } = useContext(RefdataContext);
  const [sets, setSets] = useState(createSetState(id));

  const [exercise, setExercise] = useState(exercises[id]);

  return <main>
    <Flexbox element="header" flexDirection="row">
      <Flexbox width="100px">
        <BackButton/>
      </Flexbox>
      <Flexbox flexGrow={1}>
        <h1 style={{ width: '100%' }}>{exercise.title}</h1>
      </Flexbox>
      <Flexbox width="100px">
        {
          exercise.alt && <h1 onClick={() => {
            setExercise(exercises[exercise.alt]);
            setSets(createSetState(exercise.alt));
          }} style={{ width: '100%' }}>&#10227;</h1>
        }
      </Flexbox>
    </Flexbox>
    {
      R.map(
        (i) => <Set key={`set-${i}`} index={i} sets={sets} setSets={setSets}/>,
        R.range(0, 4),
      )
    }
    <div className="button" onClick={() => {
      const stored = JSON.parse(localStorage.getItem(`exercise-${id}`)) || {};
      window.localStorage.setItem(`exercise-${id}`, JSON.stringify({
        ...stored,
        [new Date().toISOString()]: sets,
      }));
      navigate(-1);
    }}>Save
    </div>
    <div className="button button-secondary" onClick={() => navigate(-1)}>Cancel
    </div>
  </main>;
}
