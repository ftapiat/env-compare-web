import { NextResponse } from 'next/server';

/**
 * Returns a "Hello World" response from the API.
 * @param {Request} request
 * @constructor
 */
export async function POST(request: Request) {
  // Todo add validation
  const body = await request.json(); // TODO Cast to model

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(
      process.env.BACKEND_COMPARE_FILES_URL as string,
      options
    ); // Todo move fetcher to model
    console.log({ res });
    const resJson = await res.json(); // Todo cast to ApiModel
    return NextResponse.json(resJson.data); // Only return values
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error 🤮' });
  }
}
