'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
  } else {
    fetch('http://localhost:8000/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(setUser);
  }
}, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!user) return <p>Loading…</p>;

  return (
    <div className="p-8 flex justify-between items-center">
      <h1>Selamat datang, {user.name}</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}