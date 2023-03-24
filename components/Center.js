import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSpotify from "../hooks/spotifycustom";
import Song from "./Song";
import useStore from "../store/store";
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
export default function Center() {
  const plId = useStore((state) => state.playlistId);
  const currentTrackId = useStore((state) => state.currentTrackId);
  const setTrackId = useStore((state) => state.setTrackId);
  const { data: session, status } = useSession();

  const router = useRouter();
  if (session === null) {
    router.push("/signin");
  }
  const handleToggle = () => {
    setActive(!isActive);
  };
  const spotifyApi = useSpotify();

  const [color, setColor] = useState(null);
  const [isActive, setActive] = useState("false");

  const [viewplaylistdata, setviewplaylistdata] = useState();
  const [videplaylistId, setviewplaylistId] = useState();

  const [loading, setloading] = useState(false);

  useEffect(() => {
    try {
      if (session) {
        spotifyApi.getPlaylist(plId).then((data) => {
          setviewplaylistdata(data.body);
        });
        setloading(false);
      }
    } catch (err) {
      setloading(true);
      console.log(err);
    }
  }, [plId]);

  useEffect(() => {
    setColor(colors[1]);
  }, []);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide select-none relative">
      {session ? (
        <></>
      ) : (
        <button onClick={() => router.push("/signin")}>login</button>
      )}
      {session ? (
        <>
          <header className="absolute top-5 right-8" onClick={handleToggle}>
            <div className="flex items-center bg-[#2e2e2e] space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full pr-2">
              <img
                className="rounded-full w-10 p-1 h-10"
                src={session?.user.image}
                alt="user image"
              />
              <h2 className="text-white">{session?.user.name}</h2>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </header>
          <div
            className={
              `h-10 w-52 rounded-sm bg-[#2e2e2e] text-white absolute right-8 top-[4.3rem] flex-col` +
              " " +
              `${isActive ? "hidden" : "flex"}`
            }
          >
            <div
              className="flex items-center justify-between cursor-pointer px-3 py-2"
              onClick={signOut}
            >
              <p className="hover:bg-[#2b2d30]">Log out</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {viewplaylistdata == null ? (
        <h2 className="text-white">Loading</h2>
      ) : (
        <>
          <section
            className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white pl-5 pb-5 border-[.5px]`}
          >
            <img
              className="h-44 w-44 shadow-2xl"
              src={viewplaylistdata.images[0]?.url}
              alt="album image"
            />
            <div>
              <p>Playlist</p>
              <h2 className="text-2xl">{viewplaylistdata.name}</h2>
              <h1 className="text-sm font-thin text-gray-300">
                {viewplaylistdata.description}
              </h1>
            </div>
          </section>
          <div>
            {viewplaylistdata.tracks.items.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    setTrackId(viewplaylistdata.tracks.items[index])
                  }
                >
                  <Song item={item} index={index} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
