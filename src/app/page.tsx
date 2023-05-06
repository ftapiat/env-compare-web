"use client";

import { FormEvent } from "react";

type FormTarget = EventTarget & {
  text: { value: string };
};

/**
 * Home page
 * @constructor
 */
export default function Home() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as FormTarget;

    const data = {
      first: target.text.value,
    };

    console.log({ data });
    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/form";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    alert(`Is this your full name: ${result.data}`);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="text"
          id="text"
          cols={30}
          rows={10}
          className="bg-gray-100"
        ></textarea>
        <br />
        <button className="p-2 bg-gray-400">Enviar</button>
      </form>
    </div>
  );
}
