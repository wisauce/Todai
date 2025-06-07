"use client"

import type React from "react"

type Props = {
  text: string
}

export default function FormattedAIResponse({ text }: Props) {
  const lines = text.split("\n").filter((line) => line.trim() !== "")
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let elementKey = 0

  const getNextKey = () => `element-${elementKey++}`
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300" key={getNextKey()}>
          {currentList.map((item, idx) => (
            <li key={`list-item-${idx}`} className="mb-1">
              {formatInlineText(item)}
            </li>
          ))}
        </ul>,
      )
      currentList = []
    }
  }

  const formatInlineText = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = []
    const currentText = text
    let partKey = 0

    const boldRegex = /\*\*(.*?)\*\*/g
    let lastIndex = 0
    let match

    while ((match = boldRegex.exec(currentText)) !== null) {
      if (match.index > lastIndex) {
        const beforeText = currentText.slice(lastIndex, match.index)
        if (beforeText) {
          parts.push(formatItalicText(beforeText, partKey++))
        }
      }

      parts.push(
        <strong key={`bold-${partKey++}`} className="font-semibold">
          {formatItalicText(match[1], partKey++)}
        </strong>,
      )

      lastIndex = match.index + match[0].length
    }

    if (lastIndex < currentText.length) {
      const remainingText = currentText.slice(lastIndex)
      if (remainingText) {
        parts.push(formatItalicText(remainingText, partKey++))
      }
    }

    return parts.length > 0 ? parts : formatItalicText(currentText, 0)
  }

  const formatItalicText = (text: string, baseKey: number): React.ReactNode => {
    const parts: React.ReactNode[] = []
    const italicRegex = /\*(.*?)\*/g
    let lastIndex = 0
    let match
    let partKey = 0

    while ((match = italicRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index)
        if (beforeText) {
          parts.push(<span key={`${baseKey}-text-${partKey++}`}>{beforeText}</span>)
        }
      }

      parts.push(
        <em key={`${baseKey}-italic-${partKey++}`} className="italic">
          {match[1]}
        </em>,
      )

      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex)
      if (remainingText) {
        parts.push(<span key={`${baseKey}-text-${partKey++}`}>{remainingText}</span>)
      }
    }    return parts.length > 0 ? parts : text
  }

  lines.forEach((line) => {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith("###")) {
      flushList()
      const headerText = trimmedLine.replace(/^###\s*/, "")
      elements.push(
        <h3 className="text-lg font-semibold mt-4 mb-2 text-blue-600 dark:text-blue-400" key={getNextKey()}>
          {headerText}
        </h3>,
      )
    } else if (trimmedLine.startsWith("##")) {
      flushList()
      const headerText = trimmedLine.replace(/^##\s*/, "")
      elements.push(
        <h2 className="text-xl font-semibold mt-4 mb-2 text-blue-700 dark:text-blue-300" key={getNextKey()}>
          {headerText}
        </h2>,
      )
    } else if (trimmedLine.startsWith("#")) {
      flushList()
      const headerText = trimmedLine.replace(/^#\s*/, "")
      elements.push(
        <h1 className="text-2xl font-bold mt-4 mb-2 text-blue-800 dark:text-blue-200" key={getNextKey()}>
          {headerText}
        </h1>,
      )    } else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      const listItem = trimmedLine.replace(/^[-*]\s*/, "")
      currentList.push(listItem)
    } else if (trimmedLine.length > 0) {
      flushList()
      elements.push(
        <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed" key={getNextKey()}>
          {formatInlineText(trimmedLine)}
        </p>,
      )
    }
  })
  
  flushList()

  return <div className="prose max-w-none">{elements}</div>
}
