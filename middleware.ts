// import { auth } from "@/lib/auth"
 
export { auth as middleware } from "@/lib/auth"

// export default auth((req) => {
//   // if (!req.auth && req.nextUrl.pathname !== "/login") {
//   //   const newUrl = new URL("/login", req.nextUrl.origin)
//   //   return Response.redirect(newUrl)
//   // }
// })
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/", "/products", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}