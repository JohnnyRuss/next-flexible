import React, { MouseEventHandler } from "react";
import Image from "next/image";

interface ButtonType {
  title: string;
  type: "submit" | "button";
  leftIcon?: string | null;
  rightIcon?: string | null;
  isSubmitting: boolean;
  handleClick?: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonType> = ({
  type,
  title,
  handleClick,
  isSubmitting,
  leftIcon,
  rightIcon,
  bgColor,
  textColor,
}) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:w-full ${
        textColor || "text-white"
      } ${
        isSubmitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
      }`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}

      {title}

      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
