"use client";
import Image from "next/image";
import trianguloOblicuangulos from "../../../public/assets/images/que-es-un-triangulo-oblicuangulo-4.png";
import { ToastContainer, toast } from "react-toastify";

export default function OblicuangulosPage() {
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const toDegrees = (radians) => {
    return radians * (180 / Math.PI);
  };

  const todosLadosLlenos = (ladoA, ladoB, ladoC) => {
    return ladoA && ladoB && ladoC;
  };

  const todosAngulosLlenos = (anguloA, anguloB, anguloC) => {
    return anguloA && anguloB && anguloC;
  };

  const hallarAnguloLeyCoseno = (ladoX, ladoY, ladoZ) => {
    const res = Math.acos(
      (ladoX * ladoX - ladoY * ladoY - ladoZ * ladoZ) / -(2 * ladoY * ladoZ)
    );
    return toDegrees(res);
  };

  const hallarLadoLeyCoseno = (anguloX, ladoY, ladoZ) => {
    return Math.sqrt(
      ladoY * ladoY +
        ladoZ * ladoZ -
        2 * ladoY * ladoZ * Math.cos(toRadians(anguloX))
    );
  };

  const hallarAnguloLeySeno = (ladoY, anguloX, ladoX) => {
    const res = Math.asin(ladoY * (Math.sin(toRadians(anguloX)) / ladoX));
    return toDegrees(res);
  };

  const hallarLadoLeySeno = (ladoX, anguloY, anguloX) => {
    return (
      (ladoX * Math.sin(toRadians(anguloY))) / Math.sin(toRadians(anguloX))
    );
  };

  const existenAlmenos3DatosLlenos = (
    ladoA,
    ladoB,
    ladoC,
    anguloA,
    anguloB,
    anguloC
  ) => {
    let cont = 0;
    const listDatos = [ladoA, ladoB, ladoC, anguloA, anguloB, anguloC];
    listDatos.forEach((dato) => {
      if (dato) {
        cont++;
      }
    });
    return cont >= 3;
  };

  const existenAlmenos2AngulosLlenos = (anguloA, anguloB, anguloC) => {
    let cont = 0;
    const listAngulos = [anguloA, anguloB, anguloC];
    listAngulos.forEach((dato) => {
      if (dato) {
        cont++;
      }
    });
    return cont >= 2;
  };

  const estanTodosLosDatosLlenos = (
    ladoA,
    ladoB,
    ladoC,
    anguloA,
    anguloB,
    anguloC
  ) => {
    let chis = true;
    const listDatos = [ladoA, ladoB, ladoC, anguloA, anguloB, anguloC];

    for (const dato of listDatos) {
      if (!dato) {
        chis = false;
        break;
      }
    }

    return chis;
  };

  const obtenerElementoCircular = (arr, indice) => {
    indice++;
    const longitud = arr.length;

    // Ajustar el índice para que esté dentro de los límites del array
    const indiceAjustado = ((indice % longitud) + longitud) % longitud;

    return arr[indiceAjustado];
  };

  const calcular = (e) => {
    e.preventDefault();
    let ladoA = document.getElementById("ladoA").value*1;
    let ladoB = document.getElementById("ladoB").value*1;
    let ladoC = document.getElementById("ladoC").value*1;

    let anguloA = document.getElementById("anguloA").value*1;
    let anguloB = document.getElementById("anguloB").value*1;
    let anguloC = document.getElementById("anguloC").value*1;

    console.log(ladoA, ladoB, ladoC, anguloA, anguloB, anguloC);

    const grabarEnLadoCorrecto = (i, array) => {
      switch (i) {
        case 0:
          ladoA = array[i];
          break;
        case 1:
          ladoB = array[i];
          break;
        case 2:
          ladoC = array[i];
          break;
        default:
          return;
      }
    };

    const grabarEnAnguloCorrecto = (i, array) => {
      switch (i) {
        case 0:
          anguloA = array[i];
          break;
        case 1:
          anguloB = array[i];
          break;
        case 2:
          anguloC = array[i];
          break;
        default:
          return;
      }
    };

    let angulos = [anguloA, anguloB, anguloC];
    let lados = [ladoA, ladoB, ladoC];

    if (!ladoA && !ladoB && !ladoC && !anguloA && !anguloB && !anguloC) {
      return toast.warn("Debe llenar como mínimo 3 campos");
    } else if (
      existenAlmenos3DatosLlenos(ladoA, ladoB, ladoC, anguloA, anguloB, anguloC)
    ) {
      mainLoop:while (
        !estanTodosLosDatosLlenos(
          ladoA,
          ladoB,
          ladoC,
          anguloA,
          anguloB,
          anguloC
        )
      ) {
        console.log("vivo hasta aca");
        const rellenarAngulos = () => {
          if (!todosAngulosLlenos(anguloA, anguloB, anguloC)) {
            if (existenAlmenos2AngulosLlenos(anguloA, anguloB, anguloC)) {
              if (anguloA && anguloB) {
                anguloC = 180 - anguloA - anguloB;
                angulos[2] = anguloC;
              } else if (anguloB && anguloC) {
                anguloA = 180 - anguloB - anguloC;
                angulos[0] = anguloA;
              } else if (anguloA && anguloC) {
                anguloB = 180 - anguloA - anguloC;
                angulos[1] = anguloB;
              }
            }
          }
        };

        rellenarAngulos();

        if (todosLadosLlenos(ladoA, ladoB, ladoC)) {
          for (let i = 0; i < angulos.length; i++) {
            const anguloActual = angulos[i];
            const ladoActual = obtenerElementoCircular(lados, i + 2);
            const ladoSiguiente = obtenerElementoCircular(lados, i + 3);
            const ladoAnterior = obtenerElementoCircular(lados, i + 4);
            console.log(anguloActual, ladoActual, ladoSiguiente, ladoAnterior);
            if (!angulos[i]) {
              angulos[i] = hallarAnguloLeyCoseno(
                ladoActual,
                ladoSiguiente,
                ladoAnterior
              );
              grabarEnAnguloCorrecto(i, angulos);
              break;
              // rellenarAngulos();
            }
          }
          break mainLoop;
        }

        // iteracion de ley de cosenos para hallar los ángulos
        target_leycosenos: for (let i = 0; i < angulos.length; i++) {
          // console.log("angulo", angulos[i]);
          // console.log(
          //   "lados siguientes:",
          //   obtenerElementoCircular(lados, i),
          //   obtenerElementoCircular(lados, i + 1)
          // );
          const ladoIzq = obtenerElementoCircular(lados, i);
          const ladoDer = obtenerElementoCircular(lados, i + 1);
          if (ladoIzq && angulos[i] && ladoDer && !lados[i]) {
            lados[i] = hallarLadoLeyCoseno(angulos[i], ladoIzq, ladoDer);
            grabarEnLadoCorrecto(i, lados);
            break target_leycosenos;
          }
        }

        rellenarAngulos();

        for (let i = 0; i < angulos.length; i++) {
          if (lados[i] && angulos[i]) {
            for (let j = 0; j < lados.length; j++) {
              if (i === j) continue;
              if (!((lados[j] && angulos[j]) || (!lados[j] && !angulos[j]))) {
                if (lados[j]) {
                  if (!angulos[j]) {
                    // console.log("angulo", angulos[j]);
                    // console.log("lados siguientes:", lados[j], lados[i]);
                    angulos[j] = hallarAnguloLeySeno(
                      lados[j],
                      angulos[i],
                      lados[i]
                    );
                    grabarEnAnguloCorrecto(j, angulos);
                    rellenarAngulos();
                  }
                } else {
                  lados[j] = hallarLadoLeySeno(
                    lados[i],
                    angulos[j],
                    angulos[i]
                  );
                  grabarEnLadoCorrecto(j, lados);
                }
                // continue mainLoop;
              }
            }
          }
        }
      }
      // Presentar datos
      console.log("ladoA: " + ladoA);
      console.log("ladoB: " + ladoB);
      console.log("ladoC: " + ladoC);

      console.log("anguloA: " + anguloA);
      console.log("anguloB: " + anguloB);
      console.log("anguloC: " + anguloC);
    } else {
      return toast.warn("Debe llenar como mínimo 3 campos");
    }
  };

  console.log("HOla me estoy renderizando xd");
  return (
    <div>
      <ToastContainer />
      <h2>Triángulos Oblicuángulos</h2>
      <form>
        <Image
          src={trianguloOblicuangulos}
          alt="Oblicuangulos"
          width="auto"
          height={200}
        />
        <div className="flex">
          <div>
            <h3>Lado a</h3>
            <input type="number" id="ladoA" />
            <h3>Lado b</h3>
            <input type="number" id="ladoB" />
            <h3>Lado c</h3>
            <input type="number" id="ladoC" />
          </div>
          <div>
            <h3>Angulo A</h3>
            <input type="number" id="anguloA" />
            <h3>Angulo B</h3>
            <input type="number" id="anguloB" />
            <h3>Angulo C</h3>
            <input type="number" id="anguloC" />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={calcular}
        >
          Calcular
        </button>
      </form>
    </div>
  );
}
