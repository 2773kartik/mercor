import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import Navbar from "~/components/navbar";
import Landing from "~/components/landing";
import Footer from "~/components/footer";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Home() {

  const user = useUser(); // clerk user
  const {data} = api.users.getAll.useQuery();
  const createUser = api.users.create.useMutation();
  const isUserCreatedRef = useRef(false);

  useEffect(() => {
    if(!!user.isSignedIn && data && !isUserCreatedRef.current) {
      const currentUserExists = data.some((userData) => userData.userId === user.user.id);
      if(!currentUserExists) {
        createUser.mutate({
          id:user.user.id,
          userId:user.user.id,
        });
        isUserCreatedRef.current = true;
      }
    }
  }, [user, data])

  return (
    <>
      <Head>
        <title>SkillShow</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {
        user?.isSignedIn ?
        <main className="flex justify-center h-full">
          <Landing/>
          {/* <div className="w-full h-screen border-x md:max-w-2xl bg-white rounded-md bg-clip-padding border border-gray-100">
            <div className="flex flex-col">
            </div>
          </div> */}
        </main>
        :
        null
      }
        <Footer/>
    </>
  );
}
