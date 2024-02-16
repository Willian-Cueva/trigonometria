'use client'
import React, { useEffect, useState } from 'react';
import Resolucion from '@/components/resolucion';
import getApiUrl from '@/helpers/api';

async function fetchInversas() {
  try {
    const apiUrl = getApiUrl('general');
    const res = await fetch(apiUrl, {
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
