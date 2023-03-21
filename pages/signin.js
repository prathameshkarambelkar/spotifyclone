import { getProviders, signIn } from "next-auth/react";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default function signin(props) {
  return(
    <div>
    
        {Object.values(props.providers).map((provider)=>(
            <div key={provider.name}>
                <button onClick={() => signIn(provider.id, {callbackUrl: '/'})}>Login with {provider.name}</button>
            </div>
        ))}
    </div>
    )
}
