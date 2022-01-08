import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
  return <h1 onClick={() => navigate(-1)} style={{ width: '100%' }}>❰❰</h1>;
}
