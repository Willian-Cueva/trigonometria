"use client";
import Image from "next/image";
import trianguloOblicuangulos from "../../../public/assets/images/que-es-un-triangulo-oblicuangulo-4.png";
import { ToastContainer, toast } from "react-toastify";
import { calcular } from "@/helpers/triangulos_oblicuangulos";
import { useState } from "react";
import { MathJax } from "better-react-mathjax";

export default function OblicuangulosPage() {
  const [datosTriangulo, setDatosTriangulo] = useState(null);
  const calcularLocal = (e) => {
    e.preventDefault();
    let ladoA = document.getElementById("ladoA").value * 1;
    let ladoB = document.getElementById("ladoB").value * 1;
    let ladoC = document.getElementById("ladoC").value * 1;
    let anguloA = document.getElementById("anguloA").value * 1;
    let anguloB = document.getElementById("anguloB").value * 1;
    let anguloC = document.getElementById("anguloC").value * 1;

    try {
      const result = calcular(ladoA, ladoB, ladoC, anguloA, anguloB, anguloC);
      setDatosTriangulo(result);
      toast.success("Triángulo Oblicuángulo calculado exitosamente!");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const datosTrianguloSinProcedimiento = JSON.stringify(
    datosTriangulo,
    (key, value) => {
      // Excluir el atributo "procedimiento" del objeto
      return key === "procedimiento" ? undefined : value;
    },
    2
  ).replace(",", "\n");

  const borrarInputs = (e) => {
    e.preventDefault();
    setDatosTriangulo(null);
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
      if (
        input.type !== "button" &&
        input.type !== "submit" &&
        input.type !== "reset"
      ) {
        // Borra el valor del input
        input.value = "";
      }
    });
  };

  return (
    <div className="flex justify-center">
      <ToastContainer />
      <form className="flex flex-col gap-4 ">
        <h2 className="text-2xl font-bold">Triángulos Oblicuángulos</h2>
        <Image
          src={trianguloOblicuangulos}
          alt="Oblicuangulos"
          width="auto"
          height={180}
          className="mx-auto"
        />
        <div className="flex gap-4">
          <div className="flex flex-col">
            <h3>Lado a</h3>
            <input
              type="number"
              id="ladoA"
              value={datosTriangulo?.ladoA?.toFixed(3)}
            />
            <h3>Lado b</h3>
            <input
              type="number"
              id="ladoB"
              value={datosTriangulo?.ladoB?.toFixed(3)}
            />
            <h3>Lado c</h3>
            <input
              type="number"
              id="ladoC"
              value={datosTriangulo?.ladoC?.toFixed(3)}
            />
          </div>
          <div className="flex flex-col">
            <h3>Angulo A</h3>
            <input
              type="number"
              id="anguloA"
              value={datosTriangulo?.anguloA?.toFixed(3)}
            />
            <h3>Angulo B</h3>
            <input
              type="number"
              id="anguloB"
              value={datosTriangulo?.anguloB?.toFixed(3)}
            />
            <h3>Angulo C</h3>
            <input
              type="number"
              id="anguloC"
              value={datosTriangulo?.anguloC?.toFixed(3)}
            />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={calcularLocal}
        >
          Calcular
        </button>
        <button
          onClick={borrarInputs}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Limpiar
        </button>
      </form>
      <div className="flex flex-col ml-4">
        {datosTriangulo?.procedimiento && (
          <h3 className="mt-5 text-lg font-bold">Procedimiento</h3>
        )}
        <div className="flex flex-col">
          {datosTriangulo?.procedimiento?.map((procedimiento) => (
            <MathJax className="mb-5" key={procedimiento}>
              {procedimiento}
            </MathJax>
          ))}
        </div>
      </div>
    </div>
  );
}
