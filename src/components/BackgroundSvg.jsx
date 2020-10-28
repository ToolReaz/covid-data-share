import React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
export default function BackgroundSvg() {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 360 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0)">
        <Path d="M361 -1H-1V641H361V-1Z" fill="#EF233C" />
        <Path
          d="M442.894 -4.26132C360.088 -102.422 203.048 -106.15 92.1359 -12.5881C-18.7765 80.9743 -41.5613 236.397 41.2446 334.558C124.051 432.719 281.09 436.447 392.003 342.885C502.915 249.323 525.7 93.8999 442.894 -4.26132Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="360" height="640" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
