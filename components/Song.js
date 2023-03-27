export default function Song(props) {
  return (
    <div className="flex justify-between mx-2 text-[#929292] hover:text-white hover:bg-[#2b2d30] rounded-md my-2 cursor-pointer">
      <div className="flex items-center pl-3 space-x-4 py-1">
        <p>{props.index + 1}</p>
        <img
          className="h-10 w-10"
          src={props.item.track.album.images[0]?.url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-[20rem] truncate text-white">
            {props.item.track.name}
          </p>
          <p className="w-40">
            {props.item.track.artists.map((artist, index) => {
              return <span key={index}>{artist.name}</span>;
            })}
          </p>
        </div>
      </div>

      <p className="w-40 lg:w-96 truncate">{props.item.track.album.name}</p>

      <p>{props.item.added_at.split("T")[0]}</p>
      <p className="mr-6">
        {Math.floor(props.item.track.duration_ms / 1000 / 60)}:
        {Math.floor((props.item.track.duration_ms / 1000) % 60) < 10
          ? "0" + Math.floor((props.item.track.duration_ms / 1000) % 60)
          : Math.floor((props.item.track.duration_ms / 1000) % 60)}
      </p>
    </div>
  );
}
