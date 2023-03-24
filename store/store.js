import { create } from "zustand";

const useStore = create((set)=> ({
  playlistId: null,
  currentTrackId: null,
  setId: (id)=> set(state => ({playlistId: id})),
  setTrackId: (id)=> set(state =>({currentTrackId: id}) )
}))
export default useStore