import React from "react";

export default function Teclado({ referencia, onChangeRef }) {
  const handleClickTan = (e) => {
    e.preventDefault();
    referencia.current.value += e.target.name;
    referencia.current.focus();
    onChangeRef();
  };
  return (
    <div className="teclado flex flex-wrap gap-2">
      <button onClick={handleClickTan} name="sin">
        sin
      </button>
      <button onClick={handleClickTan} name="cos">
        cos
      </button>
      <button onClick={handleClickTan} name="tan">
        tan
      </button>
      <button onClick={handleClickTan} name="cot">
        cot
      </button>
      <button onClick={handleClickTan} name="csc">
        csc
      </button>
      <button onClick={handleClickTan} name="sec">
        sec
      </button>
      <button onClick={handleClickTan} name="^-1">
        x<sup>-1</sup>
      </button>
      <button onClick={handleClickTan} name="^(n">
        x<sup>n</sup>
      </button>
      <button onClick={handleClickTan} name="f(x)">
        f(x)
      </button>
      <button onClick={handleClickTan} name="log">
        log
      </button>
      <button onClick={handleClickTan} name="sqrt(">
        √
      </button>
      <button onClick={handleClickTan} name="root(3)(">
        <math>
          <mroot>
            <mi>x</mi>
            <mn>3</mn>
          </mroot>
        </math>
      </button>
    </div>
  );
}
