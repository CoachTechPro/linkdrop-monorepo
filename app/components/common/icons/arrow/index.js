import React from 'react'

const SvgArrow = props => (
  <svg className={props.classNames} width={15} height={17} fill='none' {...props}>
    <path
      d='M6.188 17h1.75V4.219h.125L12.875 9l1.188-1.156-7-7-7 7L1.28 9l4.782-4.781h.125V17z'
      fill='#000'
    />
  </svg>
)

export default SvgArrow
