"use client";

import { useState } from "react";
import FormattedAIResponse from "@/components/FormattedAIResponse";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ input }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/30">
      <div className="flex-grow max-w-2xl mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Todai
          </h1>
          <p className="text-gray-600 mt-2">Your AI-powered diary companion</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="">
              <label
                htmlFor="diary-input"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                What happened today?
              </label>
              <textarea
                id="diary-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share your thought and feelings..."
                className="w-full p-4 border border-gray-200 rounded-lg resize-none h-40 mt-5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
        </div>

        {result && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-3">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              AI Response:
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <FormattedAIResponse text={result} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
