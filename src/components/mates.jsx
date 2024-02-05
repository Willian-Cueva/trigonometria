'use client'

import { MathJaxContext } from "better-react-mathjax"

export default function Mates({children}) {
  const config = {
    loader: { load: ["input/asciimath"] },
    asciimath: {
      displaystyle: true,
      delimiters: [
        ["$", "$"],
        ["`", "`"]
      ]
    }
};
  return (
    <MathJaxContext config={config}>
      {children}
    </MathJaxContext>
  )
}