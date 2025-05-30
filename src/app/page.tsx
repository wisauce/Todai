'use client'

import { useState } from 'react'
import FormattedAIResponse from '@/components/FormattedAIResponse'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ input }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">AI Diary Analyzer</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What happened today?"
          className="w-full p-3 border rounded-md resize-none h-40"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze my feelings'}
        </button>
      </form>

      {result && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">AI Response:</h2>
          <FormattedAIResponse text={result} />
        </div>
      )}
    </main>
  )
}
