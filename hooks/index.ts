import { create } from 'zustand'

// Tipos basados en el schema de Prisma
interface Canvas {
  id: string
  fileId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface Docs {
  id: string
  fileId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface File {
  id: string
  name: string
  teamId: string
  canvas?: Canvas | null
  docs?: Docs | null
  createdAt: Date
  updatedAt: Date
}

interface FileStore {
  files: File[]
  activeFile: File | null
  setFiles: (files: File[]) => void
  setActiveFile: (file: File | null) => void
  addFile: (file: File) => void
  updateFile: (file: File) => void
  deleteFile: (fileId: string) => void
}

export const useFileStore = create<FileStore>()((set) => ({
  files: [],
  activeFile: null,
  setFiles: (files: File[]) => set(() => ({ files })),
  setActiveFile: (file: File | null) => set(() => ({ activeFile: file })),
  addFile: (file: File) => set((state) => ({ 
    files: [...state.files, file] 
  })),
  updateFile: (updatedFile: File) => set((state) => ({
    files: state.files.map(file => 
      file.id === updatedFile.id ? updatedFile : file
    )
  })),
  deleteFile: (fileId: string) => set((state) => ({
    files: state.files.filter(file => file.id !== fileId),
    activeFile: state.activeFile?.id === fileId ? null : state.activeFile
  }))
}))