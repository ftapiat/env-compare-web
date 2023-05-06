/**
 * Returns a "Hello World" response from the API.
 * @param {Request} request
 * @constructor
 */
export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}
