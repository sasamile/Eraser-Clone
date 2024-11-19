"use client"

import { createContext, useContext, useState } from "react"

interface FileContextType {
  filesCount: number
  setFilesCount: (count: number) => void
  refreshFiles: () => void
}

const FileContext = createContext<FileContextType | undefined>(undefined)

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [filesCount, setFilesCount] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshFiles = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <FileContext.Provider value={{ filesCount, setFilesCount, refreshFiles }}>
      {children}
    </FileContext.Provider>
  )
}

export const useFiles = () => {
  const context = useContext(FileContext)
  if (!context) throw new Error("useFiles must be used within FileProvider")
  return context
}