import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RefdataContext } from '../data/context';

export default function Workouts() {
  const { refdata: { workouts } } = useContext(RefdataContext);
  const allCompleted = (JSON.parse(localStorage.getItem('completed')) || []);
  return <main>
    <header>
      <h1>Workouts</h1>
    </header>
    {
      Object.values(workouts)
        .map((e) => <Link to={`/workout/${e.id}`}>
            <article key={e.id} className="item">
              <h2 className={allCompleted.includes(e.id) ? 'done' : 'not-done'}>
                {e.title}
                {e.focus.map((f) => <span key={f} className="tag">{f}</span>)}
              </h2>
            </article>
        </Link>)
    }
  </main>;
}
