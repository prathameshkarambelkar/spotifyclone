import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify Clone</title>
      </Head>
      <div>
        <button>
          
          <Link href={"http://localhost:3000/api/auth/login"}>
            Log into Spotify
          </Link>
        </button>
      </div>
    </div>
  );
}
