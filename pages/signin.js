import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default function signin(props) {
  return (
    <div className="flex h-screen m-auto">
      <div className=" flex flex-col items-center justify-center m-auto">
        <Image width={300} height={300} src="/spotify_green.png" />

        {Object.values(props.providers).map((provider) => (
          <div key={provider.name} className="">
            <button
              className="bg-green-500 p-3 w-40 rounded-full"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login
            </button>
          </div>

        ))}
      </div>
    </div>
  );
}
