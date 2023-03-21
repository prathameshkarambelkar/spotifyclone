import { SP } from "next/dist/shared/lib/utils";
import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-modify",
  "user-follow-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  "user-read-private",
].join(",");


const params = {scopes: scopes}

const queryParamsString = new URLSearchParams(params)
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi
export {LOGIN_URL}