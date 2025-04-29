import { useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const spinGacha = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:8000/random');
      const data: { message: string } = await res.json();

      setTimeout(() => {
        setMessage(data.message);
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage('เกิดข้อผิดพลาด');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>💖 กาชาข้อความรัก 💖</h1>
      <div className={`gacha-box ${loading ? 'spin' : ''}`}>🎁</div>
      <button onClick={spinGacha} disabled={loading}>
        {loading ? 'กำลังหมุน...' : 'สุ่มข้อความ'}
      </button>
      {message && <div className="result">{message}</div>}
    </div>
  );
}

export default App;
