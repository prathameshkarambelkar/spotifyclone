import { create } from "zustand";

const useStore = create((set)=> ({
  playlistId: null,
  setId: (id)=> set(state => ({playlistId: id}))
}))
export default useStore