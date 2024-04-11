import * as React from "react"
const editBox = ({handleDropDown}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={16}
    height={16}
    baseProfile="full"
    viewBox="0 0 76 76"
    onClick={handleDropDown}
  >
    <path d="m54.682 20.105 1.213 1.213a3.86 3.86 0 0 1 0 5.458L53.772 28.9l-6.67-6.671 2.122-2.123a3.86 3.86 0 0 1 5.458 0ZM36.185 46.486l-6.671-6.67L45.888 23.44l6.671 6.67-16.374 16.375Zm-7.278-4.245 4.852 4.852-6.734 1.882 1.882-6.734ZM19 57V25h21.806l-4 4H23v24h30V32.691l4-4V57H19Z" />
  </svg>
)
export default editBox
