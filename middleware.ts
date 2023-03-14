import { MiddlewareRequest, NextRequest } from "@netlify/next";
import { match } from "path-to-regexp";

// Custom pathname matcher
const matcher = (pathname: string, pathToMatch: string) =>
	match(pathToMatch, { decode: decodeURIComponent })(pathname);

export async function middleware(nextRequest: NextRequest) {
	console.log("In middleware!");

	const pathname = nextRequest.nextUrl.pathname;

	if (matcher(pathname, "/some-route/:id*")) {
		// Needs to be called inside route as it consumes the request.
		// Once consumed the request body cannot be used by code that runs after the middleware.
		const request = new MiddlewareRequest(nextRequest);
		const response = await request.next();
		//
		console.log("Matched /some-route/:id*");
		return response;
	}
}
