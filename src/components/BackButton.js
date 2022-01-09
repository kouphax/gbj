import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
  return <h1 onClick={(e) => {
    e.preventDefault();
    navigate(-1);
  }} style={{ width: '100%' }}>❰❰</h1>;
}
