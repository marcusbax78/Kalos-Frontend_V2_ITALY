import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={200}
    zoomAndPan="magnify"
    viewBox="0 0 224.87999 74.999997"
    height={100}
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <defs>
      <g />
    </defs>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(3.113152, 48.665)">
        <g>
          <path d="M 4.128906 0 L 7.898438 0 L 7.898438 -14.226562 L 13.375 -14.226562 L 25.449219 0 L 29.757812 0 L 16.472656 -16.292969 L 28.816406 -31.417969 L 24.507812 -31.417969 L 13.242188 -17.773438 L 7.898438 -17.773438 L 7.898438 -31.417969 L 4.128906 -31.417969 Z M 4.128906 0 " />
        </g>
      </g>
    </g>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(32.959207, 48.665)">
        <g>
          <path d="M 9.109375 0.539062 C 12.613281 0.539062 15.351562 -0.539062 17.503906 -2.332031 L 17.550781 -2.199219 C 18.222656 -0.402344 19.75 0.269531 21.453125 0.269531 C 22.351562 0.269531 23.292969 0.0898438 24.148438 -0.222656 L 24.148438 -3.140625 C 23.609375 -2.960938 23.023438 -2.828125 22.488281 -2.828125 C 21.542969 -2.828125 20.824219 -3.1875 20.824219 -4.488281 L 20.824219 -12.925781 C 20.824219 -18.941406 17.191406 -22.082031 11.445312 -22.082031 C 7.898438 -22.082031 4.9375 -21.230469 3.230469 -20.644531 L 3.230469 -17.144531 C 5.117188 -17.953125 7.765625 -18.761719 11.085938 -18.761719 C 15.035156 -18.761719 17.234375 -16.605469 17.234375 -13.375 L 17.234375 -12.613281 C 15.441406 -13.015625 13.152344 -13.285156 11.265625 -13.285156 C 6.644531 -13.285156 1.527344 -11.578125 1.527344 -6.015625 C 1.527344 -1.480469 5.296875 0.539062 9.109375 0.539062 Z M 9.875 -2.558594 C 7.496094 -2.558594 5.207031 -3.679688 5.207031 -6.195312 C 5.207031 -9.335938 8.617188 -10.277344 11.757812 -10.277344 C 13.511719 -10.277344 15.710938 -9.964844 17.234375 -9.648438 L 17.234375 -5.699219 C 15.351562 -3.679688 12.613281 -2.558594 9.875 -2.558594 Z M 9.875 -2.558594 " />
        </g>
      </g>
    </g>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(57.374633, 48.665)">
        <g>
          <path d="M 3.410156 0 L 7 0 L 7 -32.765625 L 3.410156 -32.765625 Z M 3.410156 0 " />
        </g>
      </g>
    </g>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(67.787092, 48.665)">
        <g>
          <path d="M 13.332031 0.539062 C 19.210938 0.539062 24.820312 -3.410156 24.820312 -10.773438 C 24.820312 -18.132812 19.210938 -22.082031 13.332031 -22.082031 C 7.496094 -22.082031 1.839844 -18.132812 1.839844 -10.773438 C 1.839844 -3.410156 7.496094 0.539062 13.332031 0.539062 Z M 13.332031 -2.871094 C 8.933594 -2.871094 5.429688 -5.789062 5.429688 -10.773438 C 5.429688 -15.753906 8.933594 -18.671875 13.332031 -18.671875 C 17.730469 -18.671875 21.230469 -15.753906 21.230469 -10.773438 C 21.230469 -5.789062 17.730469 -2.871094 13.332031 -2.871094 Z M 13.332031 -2.871094 " />
        </g>
      </g>
    </g>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(94.446576, 48.665)">
        <g>
          <path d="M 10.503906 0.539062 C 15.171875 0.539062 19.390625 -1.03125 19.390625 -5.519531 C 19.390625 -13.285156 5.699219 -11.3125 5.699219 -15.976562 C 5.699219 -18.089844 8.167969 -18.851562 10.503906 -18.851562 C 13.105469 -18.851562 16.113281 -18 17.910156 -16.832031 L 17.910156 -20.242188 C 15.890625 -21.320312 13.152344 -22.082031 10.277344 -22.082031 C 6.238281 -22.082031 2.066406 -20.332031 2.066406 -15.890625 C 2.066406 -8.167969 15.800781 -9.964844 15.800781 -5.429688 C 15.800781 -3.277344 13.375 -2.78125 10.324219 -2.78125 C 7.628906 -2.78125 4.355469 -3.589844 2.15625 -5.070312 L 2.15625 -1.570312 C 4.175781 -0.269531 7.449219 0.539062 10.503906 0.539062 Z M 10.503906 0.539062 " />
        </g>
      </g>
    </g>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(115.361254, 48.665)">
        <g />
      </g>
    </g>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(126.536696, 48.665)">
        <g>
          <path d="M 4.128906 0 L 14.453125 0 C 25.539062 0 31.058594 -6.644531 31.058594 -15.710938 C 31.058594 -24.777344 25.539062 -31.417969 14.453125 -31.417969 L 4.128906 -31.417969 Z M 7.898438 -3.589844 L 7.898438 -27.828125 L 14.453125 -27.828125 C 22.933594 -27.828125 27.246094 -23.25 27.246094 -15.710938 C 27.246094 -8.167969 22.933594 -3.589844 14.453125 -3.589844 Z M 7.898438 -3.589844 " />
        </g>
      </g>
    </g>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(159.659092, 48.665)">
        <g>
          <path d="M 13.777344 0.539062 C 16.605469 0.539062 19.433594 0 21.410156 -1.03125 L 21.410156 -4.535156 C 19.570312 -3.5 16.964844 -2.78125 14.316406 -2.78125 C 9.964844 -2.78125 5.878906 -4.667969 5.429688 -9.199219 L 22.578125 -9.199219 C 23.921875 -15.304688 20.871094 -22.082031 12.566406 -22.082031 C 7.449219 -22.082031 1.839844 -18.3125 1.839844 -10.773438 C 1.839844 -3.097656 7.40625 0.539062 13.777344 0.539062 Z M 5.429688 -12.34375 C 5.699219 -16.5625 9.109375 -18.761719 12.792969 -18.761719 C 18.265625 -18.761719 19.703125 -14.632812 19.390625 -12.34375 Z M 5.429688 -12.34375 " />
        </g>
      </g>
    </g>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(184.254033, 48.665)">
        <g>
          <path d="M 4.128906 0 L 7.898438 0 L 7.898438 -13.421875 L 24.101562 -13.421875 L 24.101562 -17.011719 L 7.898438 -17.011719 L 7.898438 -27.828125 L 25.402344 -27.828125 L 25.402344 -31.417969 L 4.128906 -31.417969 Z M 4.128906 0 " />
        </g>
      </g>
    </g>
    <g fill="#000000" fillOpacity={1}>
      <g transform="translate(211.362323, 48.665)">
        <g>
          <path d="M 5.207031 -26.121094 C 6.464844 -26.121094 7.539062 -26.886719 7.539062 -28.410156 C 7.539062 -29.890625 6.464844 -30.699219 5.207031 -30.699219 C 3.949219 -30.699219 2.871094 -29.890625 2.871094 -28.410156 C 2.871094 -26.886719 3.949219 -26.121094 5.207031 -26.121094 Z M 3.410156 0 L 7 0 L 7 -21.542969 L 3.410156 -21.542969 Z M 3.410156 0 " />
        </g>
      </g>
    </g>
  </svg>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
