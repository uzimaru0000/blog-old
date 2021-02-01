import * as React from 'react'

const Css = () => {
    return <style dangerouslySetInnerHTML={{ __html: `
        body {
          margin: 0;
          padding: 0;
        }
    `}} />
}

export const Svg = ({ title }: { title: string }) => <svg
    width="1200"
    height="630"
    viewBox="0 0 1200 630"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="1200" height="630" fill="white" />
    <rect
      x="100"
      y="86"
      width="992"
      height="392"
      rx="28"
      stroke="#199861"
      strokeWidth="8"
    />
    <text
      x="50%"
      y="279"
      fontSize="64px"
      fontFamily="'Noto Sans JP'"
      textAnchor="middle"
      fill="rgb(51, 51, 51)"
    >{title}</text>
    <text
      x="50%"
      y="342"
      fontSize="32px"
      fontFamily="'Noto Sans JP'"
      textAnchor="middle"
      fill="rgba(51, 51, 51, 0.75)"
    >にわとりになる日まで</text>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M816.641 590.986C798.369 590.986 778.334 577.41 778.334 552.359C778.334 533.927 791.59 514.533 816.641 514.533C833.791 514.533 854.787 527.308 854.787 552.359V590.986H816.641ZM813.436 529.92C813.436 527.676 811.512 524.31 807.345 524.31C803.819 524.31 801.575 527.195 801.575 529.92C801.575 532.645 803.178 536.171 807.666 536.171C812.153 536.171 813.436 532.164 813.436 529.92ZM816.481 575.76C803.338 575.76 793.08 565.662 793.08 552.519H799.652C799.652 561.815 807.826 569.348 816.481 569.348V575.76Z"
      fill="#333333"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M816.641 597.718C791.59 597.718 771.282 577.41 771.282 552.359C771.282 544.328 773.37 536.784 777.031 530.24L770 517.258L786.413 518.54C794.436 511.363 805.029 507 816.641 507C841.692 507 862 527.308 862 552.359C862 564.713 862 587.781 861.519 597.718H824.174V614.066H802.376V607.335H817.443V597.718H816.641ZM778.334 552.359C778.334 577.41 798.369 590.986 816.641 590.986H854.787V552.359C854.787 527.308 833.791 514.533 816.641 514.533C791.59 514.533 778.334 533.927 778.334 552.359Z"
      fill="#333333"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M816.641 597.718C791.59 597.718 771.282 577.41 771.282 552.359C771.282 544.328 773.37 536.784 777.031 530.24L770 517.258L786.413 518.54C794.436 511.363 805.029 507 816.641 507C841.692 507 862 527.308 862 552.359C862 564.713 862 587.781 861.519 597.718H824.174V614.066H802.376V607.335H817.443V597.718H816.641ZM778.334 552.359C778.334 577.41 798.369 590.986 816.641 590.986H854.787V552.359C854.787 527.308 833.791 514.533 816.641 514.533C791.59 514.533 778.334 533.927 778.334 552.359Z"
      fill="#199861"
    />
    <path
      d="M807.345 524.31C811.512 524.31 813.436 527.676 813.436 529.92C813.436 532.164 812.153 536.171 807.666 536.171C803.178 536.171 801.575 532.645 801.575 529.92C801.575 527.195 803.819 524.31 807.345 524.31Z"
      fill="#199861"
    />
    <path
      d="M793.08 552.519C793.08 565.662 803.338 575.76 816.481 575.76V569.348C807.826 569.348 799.652 561.815 799.652 552.519H793.08Z"
      fill="#199861"
    />
    <rect y="614" width="1200" height="16" fill="#199861" />
    <path
      d="M776.254 481.627L753.627 504.255L731 481.627H776.254Z"
      fill="#199861"
    />
  </svg>

export default ({ query }: { query: { [key: string]: string } }) => {
    return <html>
        <head>
        <meta charSet="utf-8" />
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet" />
        <Css />
        </head>
        <body>
            <Svg title={decodeURIComponent(query.title) || "Hello"} />
        </body>
    </html>
}
