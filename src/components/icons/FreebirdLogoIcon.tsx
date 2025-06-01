
import type { SVGProps } from 'react';

export default function FreebirdLogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 19C9.16667 16.8333 14.4 13.6 17.5 16C20.6 18.4 23.8333 20.3333 27 21.5M6 12C9.16667 9.83333 14.4 6.6 17.5 9C20.6 11.4 23.8333 13.3333 27 14.5"
        stroke="currentColor" // Uses parent text color
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
