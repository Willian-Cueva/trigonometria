'use client'
import React, { useEffect, useState } from 'react';
import Resolucion from '@/components/resolucion';

async function fetchInversas() {
  try {
    const res = await fetch('http://localhost:3000/api/general', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching inversas:', error);
    return null;
  }
}

export default function RecordarEjercicios() {
  const [inversas, setInversas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchInversas();
      if (data) {
        setInversas(data.data || []); // Ajusta según la estructura de tu respuesta
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {inversas.map(({ title, type, steps, _id }) => (
        <Resolucion key={_id} title={title} type={type} steps={steps} />
      ))}
    </div>
  );
}
