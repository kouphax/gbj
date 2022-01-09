import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import Flexbox from 'flexbox-react';
import { RefdataContext } from '../data/context';
import BackButton from './BackButton';

export default function Workout() {
  const { id } = useParams();
  const { refdata: { exercises, workouts } } = useContext(RefdataContext);
  const navigate = useNavigate();
  const workout = workouts[id];
  const allCompleted = (JSON.parse(localStorage.getItem('completed')) || []);
  const completed = allCompleted.includes(id);

  return <main>
    <Flexbox element="header" flexDirection="row" width="100%">
      <Flexbox width="100px">
        <BackButton/>
      </Flexbox>
      <Flexbox flex="1">
        <h1 style={{ width: '100%' }}>{workout.title}</h1>
      </Flexbox>
      <Flexbox width="100px"></Flexbox>
    </Flexbox>
    {
      workout.exercises.map((e) => exercises[e]).map((e) => <Link to={`/exercise/${e.id}`}>
          <article key={e.id} className="item">
            <h2>
              {e.title}
              <span key={e.focus} className="tag">{e.focus}</span>
            </h2>
          </article>
        </Link>)
    }

    {
      !completed && <div className="button" onClick={() => {
        localStorage.setItem('completed', JSON.stringify([...allCompleted, id]));
        navigate('/');
      } }>Mark as Done</div>
    }

    {
      completed && <div className="button" onClick={() => {
        localStorage.setItem('completed', JSON.stringify(allCompleted.filter((w) => w !== id)));
        navigate('/');
      }}>Mark as Undone</div>
    }
  </main>;
}
