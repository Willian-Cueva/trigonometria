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
  const res = Math.asin((ladoY * Math.sin(toRadians(anguloX)) / ladoX));
  return toDegrees(res);
};

const hallarLadoLeySeno = (ladoX, anguloY, anguloX) => {
  return (ladoX * Math.sin(toRadians(anguloY))) / Math.sin(toRadians(anguloX));
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

const obtenerElementoCircular = (arr, i) => {
  if (i >= 3 && i <= 5) {
    return arr[i - 3];
  } else if (i >= 6 && i <= 8) {
    return arr[i - 6];
  } else if (i >= 9 && i <= 11) {
    return arr[i - 9];
  } else return arr[i];
};

export const calcular = (ladoA, ladoB, ladoC, anguloA, anguloB, anguloC) => {
  let procedimiento = [];

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

  const redondeo = (numero) => {
    if (Number.isInteger(numero)) {
      // El número no tiene decimales, no es necesario aplicar toFixed
      return numero;
    } else {
      // El número tiene decimales, redondear a 3 decimales
      return parseFloat(numero.toFixed(3));
    }
  };

  const angulos = [anguloA, anguloB, anguloC];
  const lados = [ladoA, ladoB, ladoC];

  const todosAngulosLlenos = (anguloA, anguloB, anguloC) => {
    const sumaAngulos = angulos.reduce((suma, angulo) => suma + angulo, 0);
    const aproximacion180 = 180;

    return !(Math.abs(sumaAngulos - aproximacion180) > 0.0001)
  };

  const grabarEnLadoCorrecto = (i, array) => {
    switch (i) {
      case 0:
        ladoA = array[0];
        break;
      case 1:
        ladoB = array[1];
        break;
      case 2:
        ladoC = array[2];
        break;
      default:
        return;
    }
  };

  if (!ladoA && !ladoB && !ladoC && !anguloA && !anguloB && !anguloC) {
    const msg = "Todos los datos estan vacios";
    return {
      msg,
    };
  } else if (
    existenAlmenos3DatosLlenos(ladoA, ladoB, ladoC, anguloA, anguloB, anguloC)
  ) {
    let sum = 0;
    const limit = 100;
    while (
      !estanTodosLosDatosLlenos(
        ladoA,
        ladoB,
        ladoC,
        anguloA,
        anguloB,
        anguloC
      ) &&
      sum++ <= limit
    ) {
      const rellenarAngulos = () => {
        if (!todosAngulosLlenos(anguloA, anguloB, anguloC)) {
          if (existenAlmenos2AngulosLlenos(anguloA, anguloB, anguloC)) {
            if (anguloA && anguloB) {
              anguloC = 180 - anguloA - anguloB;
              angulos[2] = anguloC;
              grabarEnAnguloCorrecto(2, angulos);
              procedimiento.push(
                `$"(Restar de 180 los demás ángulos): "C=180^circ-A^circ-B^circ$`
              );
              procedimiento.push(
                `$ C = 180 - ${redondeo(anguloA)} - ${redondeo(
                  anguloB
                )} = ${redondeo(anguloC)}$`
              );
            } else if (anguloB && anguloC) {
              anguloA = 180 - anguloB - anguloC;
              angulos[0] = anguloA;
              grabarEnAnguloCorrecto(0, angulos);
              procedimiento.push(
                `$"(Restar de 180 los demás ángulos): "A=180^circ-B^circ-C^circ$`
              );
              procedimiento.push(
                `$ A = 180 - ${redondeo(anguloB)} - ${redondeo(
                  anguloC
                )} = ${redondeo(anguloA)}$`
              );
            } else if (anguloA && anguloC) {
              anguloB = 180 - anguloA - anguloC;
              angulos[1] = anguloB;
              grabarEnAnguloCorrecto(1, angulos);
              procedimiento.push(
                `$"(Restar de 180 los demás ángulos): "B=180^circ-A^circ-C^circ$`
              );
              procedimiento.push(
                `$ B = 180 - ${redondeo(anguloA)} - ${redondeo(
                  anguloC
                )} = ${redondeo(anguloB)}$`
              );
            }
          }
        }
      };

      rellenarAngulos();

      const obterLetra = (i, esAngulo) => {
        switch (i) {
          case 0:
            return esAngulo ? "A" : "a";
          case 1:
            return esAngulo ? "B" : "b";
          case 2:
            return esAngulo ? "C" : "c";
          default:
            return null;
        }
      };
      // 0 1 2 3 4 5 6 7 8 9
      // 0 1 2 0 1 2 0 1 2 0
      const obtenerLetraCircular = (i, esAngulo) => {
        let letra = i;
        if (i >= 3 && i <= 5) letra = i - 3;
        if (i >= 6 && i <= 8) letra = i - 6;
        if (i >= 9 && i <= 11) letra = i - 9;
        return obterLetra(letra, esAngulo);
      };

      if (todosLadosLlenos(ladoA, ladoB, ladoC)) {
        for (let i = 0; i < angulos.length; i++) {
          const anguloActual = angulos[i];
          const ladoActual = obtenerElementoCircular(lados, i);
          const ladoSiguiente = obtenerElementoCircular(lados, i + 1);
          const ladoAnterior = obtenerElementoCircular(lados, i + 2);
          console.log("i -> ", i);
          console.log(lados);
          console.log(
            "angulo Actual",
            anguloActual,
            "\nLado Actual",
            ladoActual,
            "\nLado siguiente",
            ladoSiguiente,
            "\nLado anterior",
            ladoAnterior
          );
          if (!angulos[i]) {
            angulos[i] = hallarAnguloLeyCoseno(
              ladoActual,
              ladoSiguiente,
              ladoAnterior
            );
            grabarEnAnguloCorrecto(i, angulos);
            procedimiento.push(
              `$"(Ley Coseno para encontrar el ángulo): "${obtenerLetraCircular(
                i,
                true
              )} = \\cos^{-1}\\left(\\frac{(${obtenerLetraCircular(
                i,
                false
              )})^2 - (${obtenerLetraCircular(
                i + 1,
                false
              )})^2 - (${obtenerLetraCircular(
                i + 2,
                false
              )})^2}{-2${obtenerLetraCircular(
                i + 1,
                false
              )}${obtenerLetraCircular(i + 2, false)}}\\right)$`
            );

            procedimiento.push(
              `$ ${obterLetra(i, true)}"=cos^-1((${redondeo(
                obtenerElementoCircular(lados, i)
              )}^2-${redondeo(
                obtenerElementoCircular(lados, i + 1)
              )}^2-${redondeo(
                obtenerElementoCircular(lados, i + 2)
              )}^2)/(-2**${redondeo(ladoSiguiente)}**${redondeo(
                ladoAnterior
              )}))=${redondeo(angulos[i])}$`
            );
            console.log("procedimiento", procedimiento);
            break;
          }
        }
      }
      // rellenarAngulos();

      // iteracion de ley de cosenos para hallar los ángulos
      for (let i = 0; i < angulos.length; i++) {
        // console.log("angulo", angulos[i]);
        // console.log(
        // "lados siguientes:",
        //   obtenerElementoCircular(lados, i),
        //   obtenerElementoCircular(lados, i + 1)
        // );
        const ladoIzq = obtenerElementoCircular(lados, i + 1);
        const ladoDer = obtenerElementoCircular(lados, i + 2);
        if (ladoIzq && angulos[i] && ladoDer && !lados[i]) {
          lados[i] = hallarLadoLeyCoseno(angulos[i], ladoIzq, ladoDer);
          grabarEnLadoCorrecto(i, lados);
          procedimiento.push(
            `$"(Ley Coseno para encontrar Lado): "${obtenerLetraCircular(
              i,
              false
            )}= sqrt(${obtenerLetraCircular(
              i + 1,
              false
            )}^2 + ${obtenerLetraCircular(
              i + 2,
              false
            )}^2 - 2${obtenerLetraCircular(i + 1, false)}${obtenerLetraCircular(
              i + 2,
              false
            )} cos(${obtenerLetraCircular(i, true)}))$`
          );
          procedimiento.push(
            `$sqrt(${ladoIzq}^2+${ladoDer}^2-2**${ladoIzq}**${ladoDer}**cos(${
              angulos[i]
            }))=${redondeo(lados[i])}$`
          );
          break;
        }
      }

      rellenarAngulos();

      for (let i = 0; i < angulos.length; i++) {
        if (lados[i] && angulos[i]) {
          for (let j = 0; j < lados.length; j++) {
            if (i === j) continue;
            if (!((lados[j] && angulos[j]) || (!lados[j] && !angulos[j]))) {
              if (lados[j]) {
                // console.log("angulo", angulos[j]);
                // console.log("lados siguientes:", lados[j], lados[i]);
                angulos[j] = hallarAnguloLeySeno(
                  lados[j],
                  angulos[i],
                  lados[i]
                );
                grabarEnAnguloCorrecto(j, angulos);
                procedimiento.push(
                  `$"(Ley Seno para encontrar Ángulos): "${obterLetra(j, true)} = sen^-1((${obterLetra(
                    j,
                    false
                  )}*sen(${obterLetra(i, true)}))/${obterLetra(
                    i,
                    false
                  )})$`
                );
                procedimiento.push(
                  `$  ${obterLetra(
                    j,
                    true
                  )}"=sin^-1((${redondeo(lados[j])}^2**sin(${redondeo(
                    angulos[i]
                  )}))/${redondeo(lados[i])})=${redondeo(angulos[j])} $`
                );
                rellenarAngulos();
              } else {
                lados[j] = hallarLadoLeySeno(lados[i], angulos[j], angulos[i]);
                grabarEnLadoCorrecto(j, lados);
                procedimiento.push(
                  `$"(Ley Seno para encontrar Lado): " ${obterLetra(j, false)} = (${obterLetra(
                    i,
                    false
                  )}*sen(${obterLetra(j, true)}))/sin(${obterLetra(i, true)})$`
                );
                procedimiento.push(
                  `$${obterLetra(
                    j,
                    false
                  )}=(${redondeo(lados[i])}**sin(${redondeo(
                    angulos[j]
                  )}))/sin(${redondeo(angulos[i])})=${redondeo(lados[j])}$`
                );
              }
              // continue mainLoop;
            }
          }
        }
      }
    }

    console.log("sum", sum);

    if (sum >= limit) {
      const msg = "No se pueden formar triángulos con los datos ingresados";
      return { msg };
    }
    // Presentar datos
    // console.log("ladoA:" + ladoA);
    // console.log("ladoB:" + ladoB);
    // console.log("ladoC:" + ladoC);

    // console.log("anguloA:" + anguloA);
    // console.log("anguloB:" + anguloB);
    // console.log("anguloC:" + anguloC);

    // console.log("procedimiento:" + procedimiento);

    return {
      ladoA,
      ladoB,
      ladoC,
      anguloA,
      anguloB,
      anguloC,
      procedimiento,
    };
  } else {
    const msg = "Debe llenar como mínimo 3 campos";
    return msg;
  }
};
