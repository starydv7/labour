"use client";

import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className = "", variant = "primary", ...props }: Props) {
  const base =
    "inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto";
  const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-500",
    secondary: "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

