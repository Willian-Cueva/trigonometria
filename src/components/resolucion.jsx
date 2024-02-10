'use client'
import { MathJax } from 'better-react-mathjax'
import React from 'react'

export default function Resolucion({title,type,steps,recordar=true}) {
  return (
    <div className='mt-4 border-2 border-gray-300 p-4 rounded-xl'>
      <MathJax className='text-xl mb-2'>{`$ ${title} $`}</MathJax>
      <hr/>
      <h2 className='mb-2'>{recordar ? type : "Pasos:"}</h2>
      <div className='flex flex-col gap-2'>
        {steps?.map((step,index) => <MathJax key={index}>{`${index<steps.length-1 ? `${index+1}) ` : `resultado: `}`} {`$ ${step} $`}</MathJax>)}
      </div>
    </div>
  )
}
