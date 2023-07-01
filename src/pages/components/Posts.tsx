import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const Post: AppType = ({ Component, pageProps }) => {
  return (
    <div className="">
        



    </div>
  )
};

export default api.withTRPC(Post);
