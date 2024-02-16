"use client";
import { useRef, useState, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import Resolucion from "@/components/resolucion";
import Teclado from "@/components/teclado";

export default function BuscarFunciones({ title }) {
  const [exp, setExp] = useState("");
  const [resolucion, setResolucion] = useState(null);
  // const expresion = useRef(null);

  const expresionChangeHandler = useCallback((e) => {
    setExp(e.target.value);
  }, []);

  // const handleTitleChange = () => {
  //   const title = expresion.current.value;
  //   setExp(title);
  // };

  const handleCalcular = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        // const title = expresion.current.value;
        const res = await fetch("http://localhost:3000/api/traer_title", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: exp }),
          // cache: "no-cache",
        });

        const data = await res.json();
        setResolucion(data.data);
      } catch (error) {
        console.error("Error api", error);
      }
    },
    [exp]
  );

  return (
    <div className="flex flex-col text-black">
      <h1 className="text-3xl font-bold">{title}</h1>
      <hr />
      <MathJax className="my-4">{`$ ${exp} $`}</MathJax>
      <input
        ref={expresion}
        type="text"
        name="expresion"
        id="exp"
        onChange={handleTitleChange}
        placeholder="Expresión"
      />
      <Teclado referencia={expresion} onChangeRef={handleTitleChange} />
      <button
        onClick={handleCalcular}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Calcular
      </button>
      <MathJax>
        {resolucion && (
          <Resolucion
            title={resolucion.title}
            type={resolucion.type}
            steps={resolucion.steps}
            recordar={false}
          />
        )}
      </MathJax>
    </div>
  );
}
