import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

console.log('mid');
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};