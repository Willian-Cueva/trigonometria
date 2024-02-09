"use client";
import React, { useRef, useState } from "react";
import functionPlot from "function-plot";

export default function GraficasPage() {
  const [data, setData] = useState({});
  const [funcionTrig, setFuncionTrig] = useState("");

  const obtenerFuncionTrigonometrica = (funcion) => {
    switch (funcion) {
      case "seno":
        return "sin";
      case "coseno":
        return "cos";
      case "tangente":
        return "tan";
      case "cosecante":
        return "1/sin";
      case "secante":
        return "1/cos";
      case "cotangente":
        return "1/tan";
      default:
        return "";
    }
  };

  const obtenerFuncionTrigonometricaLocal = (funcion, num) => {
    switch (funcion) {
      case "seno":
        return Math.sin(num);
      case "coseno":
        return Math.cos(num);
      case "tangente":
        return Math.tan(num);
      case "cosecante":
        return 1 / Math.sin(num);
      case "secante":
        return 1 / Math.cos(num);
      case "cotangente":
        return 1 / Math.tan(num);
      default:
        return num;
    }
  };

  const presentarFuncion = () =>
    `${presentarAtributo(data.k)}${
      data.k ? "*" : ""
    }${obtenerFuncionTrigonometrica(
      presentarAtributo(data.funcionTrigonometrica)
    )}(${presentarAtributo(data.l)}${data.l ? "*" : ""}x${
      data.m ? "+" : ""
    }${presentarAtributo(data.m)})${data.c ? "+" : ""}${presentarAtributo(
      data.c
    )}`;

  const handleData = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: isNaN(e.target.value)
        ? e.target.value
        : e.target.value * 1,
    });
    setFuncionTrig(presentarFuncion());
    console.log(data);
  };

  const graficaRef = useRef(null);

  const calcularTablaTrigonometrica = (
    intervaloInicio,
    intervaloFin,
    salto
  ) => {
    const tabla = [];
    const K = data.k ? data.k : 1;
    const L = data.l ? data.l : 1;
    const M = data.m ? data.m : 0;
    const C = data.c ? data.c : 0;

    for (let x = intervaloInicio; x <= intervaloFin; x += salto) {
      const interFuncionTrigonometrica = (L * x) + M;
      const resFuncionTrigonometrica = obtenerFuncionTrigonometricaLocal(
        data.funcionTrigonometrica,
        interFuncionTrigonometrica
      );
      const y = K * resFuncionTrigonometrica + C;
      tabla.push({ x, y });
    }

    return tabla;
  };

  const presentarAtributo = (atri) => {
    return atri ? atri : ``;
  };

  const graficar = (e) => {
    e.preventDefault();
    if (presentarFuncion()) {
      const tabla = calcularTablaTrigonometrica(
        data.limiteIzquierdo,
        data.limiteDerecho,
        data.paso
      );
      console.log(tabla);

      setData({
        ...data,
        tabla,
      });
      const K = data.k ? data.k: 10;
      console.log(K, "<- K");

      functionPlot({
        target: graficaRef.current,
        grid: true,
        title: `y = ${presentarFuncion()}`,
        yAxis: { domain: [Math.abs(K)*(-1), Math.abs(K)] },
        xAxis: { domain: [data.limiteIzquierdo, data.limiteDerecho] },
        // disableZoom: data.k  data.k === 1,
        data: [
          {
            fn: presentarFuncion(),
          },
        ],
      });
    }
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <h2>Gráfica de funciones trigonométricas</h2>
      <p> y = K * funcionTrigonometrica(Lx + M) + C</p>
      <br />
      <p> y = {presentarFuncion()}</p>
      <form action="">
        <h3>K</h3>
        <input type="number" name="k" id="k" onChange={handleData} />
        <h3>Función trigonométrica</h3>
        <select
          name="funcionTrigonometrica"
          id="funcionTrigonometrica"
          className="block mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={handleData}
          required
        >
          <option value="">Vacío</option>
          <option value="seno">seno</option>
          <option value="coseno">coseno</option>
          <option value="tangente">tangente</option>
          <option value="cotangente">cotangente</option>
          <option value="cosecante">cosecante</option>
          <option value="secante">secante</option>
        </select>
        <h3>L</h3>
        <input type="number" name="l" id="l" onChange={handleData} />
        <h3>M</h3>
        <input type="number" name="m" id="m" onChange={handleData} />
        <h3>C</h3>
        <input type="number" name="c" id="c" onChange={handleData} />
        <div>
          <h2>Tabla de valores</h2>
          <h3>Limite Izquierdo</h3>
          <input
            type="number"
            name="limiteIzquierdo"
            id="limiteIzquierdo"
            onChange={handleData}
          />
          <h3>Limite Derecho</h3>
          <input
            type="number"
            name="limiteDerecho"
            id="limiteDerecho"
            onChange={handleData}
          />
          <h3>Paso</h3>
          <input type="number" name="paso" id="paso" onChange={handleData} />
          <button
            onClick={graficar}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Graficar
          </button>
        </div>
      </form>

      <div className="p-2">
        <div ref={graficaRef} className="m-2" />
      </div>

      <div>
        <div>
          <div>
            <h3>Tabla de valores</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-bold">X</div>
            <div className="font-bold">Y</div>
            {data.tabla?.map((el, i) => (
              <React.Fragment key={i}>
                <div className="border p-2">{el.x.toFixed(3)}</div>
                <div className="border p-2">{el.y.toFixed(3)}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
