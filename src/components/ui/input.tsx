"use client";

import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Input({ className = "", label, hint, error, id, ...props }: Props) {
  const inputId = id ?? React.useId();

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="text-sm font-medium text-zinc-900">
        {label}
      </label>
      <input
        id={inputId}
        className={[
          "mt-2 h-11 w-full rounded-xl border bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none transition",
          "border-zinc-200 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-200/40",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-200/40" : "",
          className,
        ].join(" ")}
        {...props}
      />
      {error ? (
        <div className="mt-2 text-xs text-red-600">{error}</div>
      ) : hint ? (
        <div className="mt-2 text-xs text-zinc-500">{hint}</div>
      ) : null}
    </div>
  );
}

