import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            © 2025 Todai. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Helping you understand your emotions through AI
          </p>
        </div>
      </div>
    </footer>
  );
}
