import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

export default function Home(props) {
  const {data:session} = useSession();
  const router = useRouter()

  useEffect(()=>{
    if(session === null){
      router.push('/signin')
    }
  },[session])

  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
        
      </main>
    </div>
  );
}
