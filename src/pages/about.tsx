import Head from "next/head";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import AboutContent from "~/components/aboutcontent";

export default function Home() {
  return (
    <>
      <Head>
        <title>SkillShow</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main className="flex justify-center h-full">
        <div className="w-full h-full border-x text-black shadow-lg bg-white md:max-w-2xl rounded-sm">
          <AboutContent/>
      </div>
      </main>
      <Footer/>
    </>
  );
}
