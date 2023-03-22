import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Center() {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className="">
      {session ? (
        <button className="text-white" onClick={() => signOut()}>
          Logout
        </button>
      ) : (
        <button className="text-white" onClick={() => router.push("/signin")}>
          Login
        </button>
      )}
      {session ? <div>
        <p className="text-white" > {session.user.name} </p>
        <p className="text-white" > {session.user.email} </p>
        <p className="text-white" > {session.user.id} </p>
        <img src={session.user.image}></img>
      </div> : <></> }
    </div>
  );
}
