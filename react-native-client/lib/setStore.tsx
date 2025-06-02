
import { create } from 'zustand'

type SetStore = {
  selectedSongs: Array<SONGCLIENT> | null,
  setSongs: (songs : Array<SONGCLIENT>) => void
}

export const useSetStore = create<SetStore>((set) => ({
  selectedSongs: null,
  setSongs: (songs) => set({ selectedSongs: songs})
}))

type SongStore = {
  selectedSong: SONGCLIENT | null,
  setSong: (song: SONGCLIENT) => void
}

export const useSongStore = create<SongStore>((set) => ({
  selectedSong: null,
  setSong: (song) => set({ selectedSong: song })
}))


type SetViewStore = {
  selectedSet: SETCLIENT | null,
  setSet: (set: SETCLIENT) => void
}

export const useSetViewStore = create<SetViewStore>((set) => ({
  selectedSet: null,
  setSet: (item) => set({ selectedSet: item })
}))