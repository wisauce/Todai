"use client"

import type React from "react"
import { useState, useEffect } from "react"
import FormattedAIResponse from "@/components/FormattedAIResponse"
import DeleteConfirmation from "@/components/DeleteConfirmation"
import DarkModeToggle from "@/components/DarkModeToggle"
import { PlusIcon, CalendarIcon, MenuIcon, XIcon } from "lucide-react"

interface DiaryEntry {
  id: string
  title: string
  input: string
  result: string
  timestamp: Date
}

export default function HomePage() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("diaryEntries")
    if (saved) {
      try {
        const loaded = JSON.parse(saved) as Omit<DiaryEntry, "timestamp"> & { timestamp: string }[]
        const parsed = loaded.map(e => ({ ...e, timestamp: new Date(e.timestamp) }))
        setEntries(parsed as DiaryEntry[])
      } catch (err) {
        console.error("Error parsing diary entries from localStorage:", err)
      }
    }
  }, [])

  const saveEntriesToLocalStorage = (entries: DiaryEntry[]) => {
    localStorage.setItem("diaryEntries", JSON.stringify(
      entries.map(e => ({ ...e, timestamp: e.timestamp.toISOString() }))
    ))
  }

  const formatDateTime = (date: Date) => date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const createNewEntry = () => {
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      title: `Diary ${formatDateTime(new Date())}`,
      input: "",
      result: "",
      timestamp: new Date()
    }
    setEntries(prev => {
      const updated = [newEntry, ...prev]
      saveEntriesToLocalStorage(updated)
      return updated
    })
    setCurrentEntryId(newEntry.id)
    setInput("")
    setResult("")
    setSidebarOpen(false)
  }

  const selectEntry = (id: string) => {
    const entry = entries.find(e => e.id === id)
    if (entry) {
      setCurrentEntryId(id)
      setInput(entry.input)
      setResult(entry.result)
      setSidebarOpen(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return alert("Please write something first.")
    setLoading(true)

    let activeId = currentEntryId
    let entry: DiaryEntry

    if (!activeId) {
      entry = {
        id: Date.now().toString(),
        title: `Diary ${formatDateTime(new Date())}`,
        input,
        result: "",
        timestamp: new Date()
      }
      setEntries(prev => {
        const updated = [entry, ...prev]
        saveEntriesToLocalStorage(updated)
        return updated
      })
      setCurrentEntryId(entry.id)
      activeId = entry.id
    } else {
      const found = entries.find(e => e.id === activeId)
      if (!found) return console.error("Entry not found.")
      entry = { ...found, input }
    }

    let aiResult = ""
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      })
      if (!res.ok) throw new Error("AI error")
      const data = await res.json()
      aiResult = data.result
      setResult(aiResult)
    } catch (err) {
      console.error(err)
      setResult("Error analyzing feelings.")
    }

    entry.result = aiResult

    setEntries(prev => {
      const updated = prev.map(e => e.id === activeId ? entry : e)
      saveEntriesToLocalStorage(updated)
      return updated
    })

    setLoading(false)
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setCurrentEntryId(id)
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = () => {
    if (currentEntryId) {
      setEntries(prev => {
        const updated = prev.filter(e => e.id !== currentEntryId)
        saveEntriesToLocalStorage(updated)
        return updated
      })
      setCurrentEntryId(null)
      setInput("")
      setResult("")
      setShowDeleteConfirmation(false)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
  }

  const currentEntry = entries.find(e => e.id === currentEntryId)
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Diary History</h2>
            <div className="flex items-center gap-2">
              <DarkModeToggle />
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={createNewEntry}
              className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
              <PlusIcon className="w-4 h-4" />
              New Entry
            </button>
          </div>          <div className="flex-1 overflow-y-auto">
            {entries.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No diary entries yet</p>
              </div>
            ) : (
              <div className="p-2">
                {entries.map(entry => (
                  <div
                    key={entry.id}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors cursor-pointer ${currentEntryId === entry.id ? "bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-700" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                    onClick={() => selectEntry(entry.id)}
                  >
                    <div className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">{entry.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDateTime(entry.timestamp)}</div>
                    {entry.input && <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">{entry.input.substring(0, 50)}...</div>}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(e, entry.id)
                      }}
                      className="mt-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-xs hover:bg-red-300 dark:hover:bg-red-900/30 rounded px-2 py-1 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>       {showDeleteConfirmation && (
            <DeleteConfirmation
              onDelete={confirmDelete}
              onCancel={cancelDelete}
          />
        )}

      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col lg:ml-0">
        <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <MenuIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Todai</h1>
          <DarkModeToggle />
        </div>

        <main className="flex-grow max-w-2xl mx-auto p-6 space-y-8 w-full">
          <div className="text-center mb-8 hidden lg:block">
            <div className="flex items-center justify-center gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Todai</h1>
              <DarkModeToggle />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Your AI-powered diary companion</p>
          </div>

          {currentEntry && (
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{currentEntry.title}</h2>
            </div>
          )}          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="diary-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  What happened today?
                </label>
                <textarea
                  id="diary-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); 
                        handleSubmit(e);
                      }
                    }}
                  placeholder="Share your thoughts and feelings..."
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg resize-none h-40 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 font-medium transition-all shadow-sm"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze my feelings"}
              </button>
            </form>
          </div>          {result && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">AI Response:</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <FormattedAIResponse text={result} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
