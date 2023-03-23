import React, { useState } from "react";
import useSpotify from "../hooks/spotifycustom";
export default function Song(props) {
  const spotifyApi = useSpotify();

  const [currentsongid, setCurrentsongid] = useState();
  const [isplaying, setIsplaying] = useState();
  const playSong = async () => {
    setCurrentsongid(props.item.track.id);
    setIsplaying(true);
  };
  return (
    <div
      className="grid grid-cols-2 text-[#929292] hover:text-white hover:bg-[#2b2d30] rounded-md my-2 cursor-pointer"
      onClick={() => playSong()}
    >
      <div className="flex items-center pl-3 space-x-4 py-1">
        <p>{props.index + 1}</p>
        <img
          className="h-10 w-10"
          src={props.item.track.album.images[0]?.url}
          alt=""
        />
        <div className="">
          <p className="w-36 lg:w-[20rem] truncate text-white">
            {props.item.track.name}
          </p>
          <p className="w-40">
            {props.item.track.artists.map((artist, index) => {
              return (
                <span key={index} className=''>
                  {artist.name}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0 pr-10">
        <p className="hidden md:inline w-40 lg:w-96 truncate">
          {props.item.track.album.name}
        </p>
        <p>{props.item.added_at.split("T")[0]}</p>
        <p className="">
          {Math.floor((props.item.track.duration_ms / 1000 / 60) << 0)}:
          {Math.floor((props.item.track.duration_ms / 1000) % 60) < 10
            ? "0" + Math.floor((props.item.track.duration_ms / 1000) % 60)
            : Math.floor((props.item.track.duration_ms / 1000) % 60)}
        </p>
      </div>
    </div>
  );
}
