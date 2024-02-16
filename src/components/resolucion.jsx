"use client";
import { MathJax } from "better-react-mathjax";
import { ToastContainer, toast } from "react-toastify";

export default function Resolucion({ title, type, steps, recordar = true }) {
  const copyToClipboard = async () => {
    // Crear un elemento de texto temporal
    try {
      await navigator.clipboard.writeText(title);
      toast.success("Contenido copiado al portapapeles");
    } catch (err) {
      console.error("Error al copiar: ", err);
      toast.error("Error al copiar");
    }
  };
  return (
    <div className="mt-4 border-2 border-gray-300 p-4 rounded-xl">
      <ToastContainer />
      <MathJax className="text-xl mb-2">{`$ ${title} $`}</MathJax>
      {recordar && (
        <div className="flex justify-center items-center gap-4 mb-4">
          <p>{title}</p>
          <button
            onClick={copyToClipboard}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Copiar Texto
          </button>
        </div>
      )}
      <hr />
      <h2 className="mb-2">{recordar ? `tipo: ${type}` : "Pasos:"}</h2>
      <div className="flex flex-col gap-2">
        {steps?.map((step, index) => (
          <div key={index}>
            {recordar ? (
              <div key={index}>{step}</div>
            ) : (
              <MathJax>
                {`${
                  index < steps.length - 1 ? `${index + 1}) ` : `Resultado: `
                }`}{" "}
                {`$ ${step} $`}
              </MathJax>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
