import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Rect, G, Path, Defs, ClipPath, Image } from "react-native-svg";
export default function BackgroundSvg() {
  /*
  return (
    <Svg
      style={{
      }}
      viewBox="0 0 360 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G>
        <Path d="M361 -1H-1V641H361V-1Z" fill="#EF233C" />
        <Path
          d="M442.894 -4.26132C360.088 -102.422 203.048 -106.15 92.1359 -12.5881C-18.7765 80.9743 -41.5613 236.397 41.2446 334.558C124.051 432.719 281.09 436.447 392.003 342.885C502.915 249.323 525.7 93.8999 442.894 -4.26132Z"
          fill="white"
        />
      </G>
    </Svg>
  );
  */

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      style={{ bottom: -42 }}
    >
      <Path
        fill="#EF233C"
        fill-opacity="1"
        d="M0,224L60,197.3C120,171,240,117,360,133.3C480,149,600,235,720,250.7C840,267,960,213,1080,208C1200,203,1320,245,1380,266.7L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></Path>
    </Svg>
  );
}
