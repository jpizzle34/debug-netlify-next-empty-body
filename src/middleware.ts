import { MiddlewareRequest, NextRequest } from "@netlify/next";
import { match } from "path-to-regexp";

// Custom pathname matcher
const matcher = (pathname: string, pathToMatch: string) =>
	match(pathToMatch, { decode: decodeURIComponent })(pathname);

export async function middleware(nextRequest: NextRequest) {
	console.log("In middleware!");

	const pathname = nextRequest.nextUrl.pathname;

	if (matcher(pathname, "/some-route/:id*")) {
		const request = new MiddlewareRequest(nextRequest);
		const response = await request.next();
		console.log("Matched /some-route/:id*");
		return response;
	}
}
