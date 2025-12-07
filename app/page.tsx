'use client'

import { APP_CONFIG } from '@/config/app'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{APP_CONFIG.name}</h1>
      <p className="text-lg text-center mb-2">{APP_CONFIG.description}</p>
      <p className="text-sm text-gray-500 mb-6">
        Version: {APP_CONFIG.version}
      </p>
    </main>
  )
}
