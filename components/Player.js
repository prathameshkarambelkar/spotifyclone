import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/spotifycustom";
import useStore from "../store/store";

export default function Player() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const plId = useStore((state) => state.playlistId);
  const TrackId = useStore((state) => state.currentTrackId);
  const setTrackId = useStore((state) => state.setTrackId);
  const [currentTrackId, setCurrentTrackId] = useState();
  const [isPlaying, setIsPlaying] = useState();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body.item);
      });
    }
  }, [TrackId]);

  return (
    <div>
      {currentTrackId == null ? (
        <></>
      ) : (
        <div className="h-24 bg-gradient-to-b from-gray-900 to-black text-white grid grid-cols-3 text-sm md:text-base px-2 md:px-8">
          <div className="flex items-center space-x-4">
            <img
              className="hidden md:inline h-12 w-12"
              src={TrackId.track.album.images[0].url}
              alt=""
            />
            <div>
              <h3>{TrackId.track.name}</h3>
              <p className="text-sm text-gray-500">
                {TrackId.track.artists?.[0].name}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-evenly">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
              </svg>
            </div>

            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out text-[#18D860]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
              />
            </svg>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4 justify-end p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>

            <input type="range" min={0} max={100} className="w-14 md:w-36 " />
          </div>
        </div>
      )}
    </div>
  );
}
