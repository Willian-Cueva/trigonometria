"use client";
import Popup from "@/components/popup";
import { MathJax } from "better-react-mathjax";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import alpha from "@/assets/images/alpha.png";
import beta from "@/assets/images/beta.png";
import Image from "next/image";

const RazonesPage = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [chis, setChis] = useState(<></>);

  const handleTogglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const calcular = (e) => {
    e.preventDefault();

    let hipo = parseFloat(document.getElementById("hipo").value);
    let ca = parseFloat(document.getElementById("ca").value);
    let co = parseFloat(document.getElementById("co").value);

    hipo = hipo * 1;
    ca = ca * 1;
    co = co * 1;

    console.log(hipo, ca, co);

    if (!hipo && !ca && !co) {
      return toast.warn(
        "Datos vácios. Debe llenar al menos 2 campos con valores numéricos"
      );
    }

    let chisContent = <></>;

    if (hipo && ca && co) {
      if (hipo < ca || hipo < co) {
        return toast.warn(
          "El valor de la hipotenusa debe ser mayor o igual a la medida de los catetos"
        );
      }

      const seno = co / hipo;
      const cosecante = 1 / seno;

      const coseno = ca / hipo;
      const secante = 1 / coseno;

      const tangente = co / ca;
      const cotangente = ca / co;

      const senoGrados = (Math.asin(seno) * 180) / Math.PI;
      const cosenoGrados = (Math.acos(coseno) * 180) / Math.PI;
      const tangenteGrados = (Math.atan(tangente) * 180) / Math.PI;

      const cotangenteGrados = (Math.atan(1 / tangente) * 180) / Math.PI;
      const cosecanteGrados = (Math.asin(1 / cosecante) * 180) / Math.PI;
      const secanteGrados = (Math.acos(1 / secante) * 180) / Math.PI;

      console.log(
        senoGrados.toFixed(2),
        cosenoGrados.toFixed(2),
        tangenteGrados.toFixed(2),
        cotangenteGrados.toFixed(2),
        cosecanteGrados.toFixed(2),
        secanteGrados.toFixed(2)
      );

      chisContent = (
        <>
          <MathJax>{`$sen(\\alpha)=\\frac{\\text{Cateto Opuesto}}{\\text{Hipotenusa}}=\\frac{${co}}{${hipo}}=${seno.toFixed(
            2
          )}=${senoGrados.toFixed(2)}^{@}$`}</MathJax>
          <MathJax>{`$cos(\\alpha)=\\frac{\\text{Cateto Adyacente}}{\\text{Hipotenusa}}=\\frac{${ca}}{${hipo}}=${coseno.toFixed(
            2
          )}=${cosenoGrados.toFixed(2)}^{@}$`}</MathJax>
          <MathJax>{`$tg(\\alpha)=\\frac{\\text{Cateto Opuesto}}{\\text{Cateto Adyacente}}=\\frac{${co}}{${ca}}=${tangente.toFixed(
            2
          )}=${tangenteGrados.toFixed(2)}^{@}$`}</MathJax>

          <MathJax>{`$csc(\\alpha)=\\frac{\\text{Hipotenusa}}{\\text{Cateto Opuesto}}=\\frac{${hipo}}{${co}}=${cosecante.toFixed(
            2
          )}=${cosecanteGrados.toFixed(2)}^{@}$`}</MathJax>
          <MathJax>{`$sec(\\alpha)=\\frac{\\text{Hipotenusa}}{\\text{Cateto Adyacente}}=\\frac{${hipo}}{${ca}}=${secante.toFixed(
            2
          )}=${secanteGrados.toFixed(2)}^{@}$`}</MathJax>
          <MathJax>{`$ctg(\\alpha)=\\frac{\\text{Cateto Adyacente}}{\\text{Cateto Opuesto}}=\\frac{${ca}}{${co}}=${cotangente.toFixed(
            2
          )}=${cotangenteGrados.toFixed(2)}^{@}$`}</MathJax>
        </>
      );
    } else if (hipo && ca) {
      if (hipo < ca) {
        return toast.warn(
          "El valor de la hipotenusa debe ser mayor o igual a la medida del cateto adyacente"
        );
      }
      const coseno = ca / hipo;
      const secante = hipo / ca;
      chisContent = (
        <>
          <MathJax>{`$cos(\\alpha)=\\frac{\\text{Cateto Adyacente}}{\\text{Hipotenusa}}=\\frac{${ca}}{${hipo}}=${coseno.toFixed(
            2
          )}$`}</MathJax>
          <MathJax>{`$sec(\\alpha)=\\frac{\\text{Hipotenusa}}{\\text{Cateto Adyacente}}=\\frac{${hipo}}{${ca}}=${secante.toFixed(
            2
          )}$`}</MathJax>
        </>
      );
    } else if (hipo && co) {
      if (hipo < co) {
        return toast.warn(
          "El valor de la hipotenusa debe ser mayor o igual a la medida del cateto opuesto"
        );
      }
      const seno = co / hipo;
      const cosecante = hipo / co;
      chisContent = (
        <>
          <MathJax>{`$sen(\\alpha)=\\frac{\\text{Cateto Opuesto}}{\\text{Hipotenusa}}=\\frac{${co}}{${hipo}}=${seno.toFixed(
            2
          )}$`}</MathJax>
          <MathJax>{`$csc(\\alpha)=\\frac{\\text{Hipotenusa}}{\\text{Cateto Opuesto}}=\\frac{${hipo}}{${co}}=${cosecante.toFixed(
            2
          )}$`}</MathJax>
        </>
      );
    } else if (ca && co) {
      const tangente = co / ca;
      const cotangente = ca / co;
      chisContent = (
        <>
          <MathJax>{`$tg(\\alpha)=\\frac{\\text{Cateto Opuesto}}{\\text{Cateto Adyacente}}=\\frac{${co}}{${ca}}=${tangente.toFixed(
            2
          )}$`}</MathJax>
          <MathJax>{`$ctg(\\alpha)=\\frac{\\text{Cateto Adyacente}}{\\text{Cateto Opuesto}}=\\frac{${ca}}{${co}}=${cotangente.toFixed(
            2
          )}$`}</MathJax>
        </>
      );
    } else {
      return toast.warn("Debe llenar al menos 2 campos");
    }

    setChis(chisContent);
    handleTogglePopup();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-5">
        Razones Trigonométricas
      </h2>
      <form className="flex flex-col w-80">
        <input
          type="radio"
          id="triangulo"
          name="triangulo"
          value="ref1"
          className="hidden"
        />
        <input
          type="radio"
          id="alpha"
          name="triangulo"
          value="ref2"
          className="hidden"
        />
        <div className="flex justify-around">
          <label htmlFor="ref1">
            <Image src={beta} alt="beta" />
          </label>
          <label htmlFor="ref2">
            <Image src={alpha} alt="alpha" />
          </label>
        </div>

        <h4 className="text-lg font-medium">Hipotenusa</h4>
        <input
          type="number"
          id="hipo"
          name="hipo"
          placeholder="Ingrese la medida"
        />
        <h4 className="text-lg font-medium">Cateto Adyacente</h4>
        <input
          type="number"
          id="ca"
          name="cateto_adyacente"
          placeholder="Ingrese la medida"
        />
        <h4 className="text-lg font-medium">Cateto Opuesto</h4>
        <input
          type="number"
          id="co"
          name="cateto_opuesto"
          placeholder="Ingrese la medida"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={calcular}
        >
          Calcular
        </button>

        <ToastContainer theme="dark" />

        <Popup isOpen={isPopupOpen} onClose={handleTogglePopup}>
          <div className="flex flex-col gap-5">{chis}</div>
        </Popup>
      </form>
    </div>
  );
};

export default FuncionesPage;
