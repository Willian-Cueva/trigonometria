"use client";

import { MathJax } from "better-react-mathjax";
import { useRef, useState } from "react";

export default function GrabarPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("inversa");
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState("");

  const stepRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
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
    }else{
      console.log("ejercicio no guardado");
    }
  };

  console.log(title, type, steps);

  return (
    <div>
      <form>
        <h2 className="text-3xl">Grabadora de ejercicios</h2>
        <h3>Ejercicio</h3>
        <input
          type="text"
          placeholder="Escriba su ejercicio"
          onChange={handleTitleChange}
        />
        <MathJax>{`$${title}$`}</MathJax>
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
        {steps.map((step, index) => (
          <MathJax key={index}>{`$${step}$`}</MathJax>
        ))}
        <MathJax>{`$${step}$`}</MathJax>
        <input
          ref={stepRef}
          type="text"
          placeholder="Escriba los pasos"
          onChange={handleStepChange}
        />
        <button onClick={handleStepsClick}>Añadir paso</button>
        <button type="submit" onClick={handleSubmit}>
          Grabar
        </button>
      </form>
    </div>
  );
}
