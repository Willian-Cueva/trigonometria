"use client";

import Teclado from "@/components/teclado";
import { MathJax } from "better-react-mathjax";
import { useMemo, useRef, useState } from "react";
import { ToastContainer,toast } from "react-toastify";

export default function GrabarPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("inversa");
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState("");

  const titleRef = useRef(null);
  const stepRef = useRef(null);

  const handleTitleChange = () => {
    const title = titleRef.current.value;
    setTitle(title);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleStepChange = (e) => {
    setStep(e.target.value);
  };

  const handleStepsClick = (e) => {
    e.preventDefault();
    setSteps([...steps, step]);
    stepRef.current.value = "";
    setStep("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      type,
      steps
    }

    const res = fetch("http://localhost:3000/api/general", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json()).catch((err) => console.log(err));

    if (res) {
      console.log("ejercicio guardado");
      toast.success("ejercicio guardado")
    }else{
      console.log("ejercicio no guardado");
    }
  };

  console.log(title, type, steps);
  let titleMemo = useMemo(() => <MathJax>{`$${title}$`}</MathJax>, [title]);

  const stepsMemo = useMemo(() => steps.map((step, index) => <MathJax key={index}>{`$${step}$`}</MathJax>), [steps]);

  let stepMemo = useMemo(() => <MathJax>{`$${step}$`}</MathJax>, [step]);

  return (
    <div>
      <ToastContainer/>
      <form>
        <h2 className="text-3xl">Grabadora de ejercicios</h2>
        <h3>Ejercicio</h3>
        {titleMemo}
        <input
          type="text"
          placeholder="Escriba su ejercicio"
          ref={titleRef}
          onChange={handleTitleChange}
        />
        <Teclado referencia={titleRef} onChangeRef={handleTitleChange}/>
        <h3>Tipo de ejercicio</h3>
        <input
          type="radio"
          id="inversa"
          name="type"
          value="inversa"
          onChange={handleTypeChange}
          defaultChecked
        />
        <label htmlFor="inversa">Función Inversa</label>
        <br />
        <input
          type="radio"
          id="identidad"
          name="type"
          value="identidad"
          onChange={handleTypeChange}
        />
        <label htmlFor="identidad">Identidad Trigonométrica</label>
        <h3>Pasos</h3>
        {stepsMemo}
        {stepMemo}
        <input
          ref={stepRef}
          type="text"
          placeholder="Escriba los pasos"
          onChange={handleStepChange}
        />
        <br />
        <button className="mr-2 bg-blue-600 text-white p-2 rounded-lg" onClick={handleStepsClick}>Añadir paso</button>
        <button className="bg-green-600 text-white p-2 rounded-lg" type="submit" onClick={handleSubmit}>
          Grabar
        </button>
      </form>
    </div>
  );
}
