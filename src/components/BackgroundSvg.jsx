import React from "react";
import Svg, { Path } from "react-native-svg";
export default function BackgroundSvg() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      style={{ bottom: -42 }}
    >
      <Path
        fill="#40b649"
        fill-opacity="1"
        d="M0,224L60,197.3C120,171,240,117,360,133.3C480,149,600,235,720,250.7C840,267,960,213,1080,208C1200,203,1320,245,1380,266.7L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></Path>
    </Svg>
  );
}
