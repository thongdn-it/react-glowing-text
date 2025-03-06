import { AnimationProps, motion } from "framer-motion";
import React, { CSSProperties, MouseEvent, useRef, useState } from "react";

interface GlowingTextProps {
  text: string;
  animationProps?: AnimationProps | undefined;
  style?: CSSProperties | undefined;
  textStyle?: CSSProperties | undefined;
  borderColorStyle?: string | undefined;
  motionBorderColorStyle?: string | undefined;
  textStrokeWidth?: string | undefined;
  radialGradientSize?: string | undefined;
}

const GlowingText: React.FC<GlowingTextProps> = (props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  const textStrokeWidth = props.textStrokeWidth ?? "3px";

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!textRef.current) return;

    const rect = textRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "black",
        ...props.style,
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.span
        ref={textRef}
        style={{
          position: "relative",
          textTransform: "uppercase",
          color: "black",
          WebkitTextStroke: `${textStrokeWidth} transparent`,
          background:
            props.borderColorStyle ??
            "linear-gradient(180deg, #6f7374, #0f1518)",
          WebkitBackgroundClip: "text",
          ...props.textStyle,
        }}
        {...props.animationProps}
      >
        {props.text}
        <motion.div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            maskImage: `radial-gradient(${
              props.radialGradientSize ?? "60px"
            } at ${position.x}px ${position.y}px,
                        rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)`,
            WebkitMaskImage: `radial-gradient(${
              props.radialGradientSize ?? "60px"
            } at ${position.x}px ${position.y}px,
                            rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)`,
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              WebkitTextStroke: `${textStrokeWidth} transparent`,
              background:
                props.motionBorderColorStyle ??
                "linear-gradient(45deg, red, yellow)",
              WebkitBackgroundClip: "text",
            }}
          >
            {props.text}
          </span>
        </motion.div>
      </motion.span>
    </div>
  );
};

export default GlowingText;
