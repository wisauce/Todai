"use client";

import React, { JSX } from "react";

type Props = {
  text: string;
};

export default function FormattedAIResponse({ text }: Props) {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul className="list-disc pl-6 mb-4" key={elements.length}>
          {currentList.map((item, idx) => (
            <li
              key={idx}
              className="mb-1"
              dangerouslySetInnerHTML={{ __html: formatInline(item) }}
            />
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInline = (line: string): string => {
    return line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  lines.forEach((line, idx) => {
    line = line.trim();

    if (line.startsWith("###")) {
      flushList();
      elements.push(
        <h3 className="text-lg font-semibold mt-4 mb-2 text-blue-600" key={idx}>
          {line.replace(/^###\s*/, "")}
        </h3>
      );
    } else if (line.startsWith("-")) {
      currentList.push(line.replace(/^- /, ""));
    } else if (line === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p
          className="mb-3 text-gray-700"
          key={idx}
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
  });

  flushList();

  return <div className="prose max-w-none">{elements}</div>;
}
