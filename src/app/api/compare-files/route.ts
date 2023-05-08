import { NextResponse } from 'next/server';
import { HttpClient } from '@/models/http-client/HttpClient';

/**
 * Returns a "Hello World" response from the API.
 * @param {Request} request
 * @constructor
 */
export async function POST(request: Request) {
  // Todo add validation
  const body = await request.json(); // TODO Cast to model

  // Todo delete this test:
  try {
    const url = process.env.BACKEND_GET_FILE_VALUES_URL as string;
    const payload = {
      file: body.files[0],
    };

    const r = await HttpClient.setUrl(url)
      .setMethodPost()
      .setPayload(payload)
      .call<never>();

    console.log({ r });
  } catch (error) {
    console.error(error);
  }

  // Todo end test, delete above code

  const bodyJson = JSON.stringify(body);
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyJson,
    };

    const url = process.env.BACKEND_URL + '/compare/files'; // Todo replace
    console.log(JSON.stringify({ url, bodyJson }));

    const res = await fetch(url, options); // Todo move fetcher to model
    const resJson = await res.json(); // Todo cast to ApiModel
    return NextResponse.json(resJson.data); // Only return values
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error 🤮' });
  }
}
