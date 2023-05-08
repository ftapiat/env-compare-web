'use client';

import { FormEvent, useState } from 'react';

type FormTarget = EventTarget & {
  file_1_content: { value: string };
  file_2_content: { value: string };
};

/**
 * Home page
 * @constructor
 */
export default function Home() {
  const [diffResult, setDiffResult] = useState<any>(null); // Todo type

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as FormTarget;
    setDiffResult(null);

    const data = {
      files: [
        {
          name: 'file 1',
          content: target.file_1_content.value,
        },
        {
          name: 'file 2',
          content: target.file_2_content.value,
        },
      ],
    };

    const JsonData = JSON.stringify(data);

    const endpoint = '/api/compare-files';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JsonData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setDiffResult(result); // Asumes that the response is OK, TODO Handle errors
  };

  const getJsxValueDifferences = (fileValueDifferences: any) => {
    const indexes = fileValueDifferences.index_differences;
    const content = fileValueDifferences.string;

    const arrayContent: JSX.Element[] = [...content].map(
      (char: string, i: number) => {
        const className = indexes.includes(i) ? 'bg-red-400' : '';
        // Todo fix performance, reduce the number of spans
        return (
          <span key={i} className={className}>
            {char}
          </span>
        );
      }
    );

    return <>{arrayContent}</>;
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Todo make into a component  */}
        {/* Todo add filename inputs */}
        <textarea
          name="file_1_content"
          id="file_1_content"
          className="bg-gray-200 mr-2"
        ></textarea>
        <textarea
          name="file_2_content"
          id="file_2_content"
          className="bg-gray-200"
        ></textarea>
        <br />
        <button className="p-2 bg-gray-400">Enviar</button>
        {diffResult && (
          <>
            <hr />
            <p>Resultado:</p>
            <output name="result" htmlFor="file_1_content file_2_content">
              <table>
                <thead>
                  <tr>
                    <th>Difference</th>
                    <th>{diffResult.values.file_1.file_name}</th>
                    <th>{diffResult.values.file_2.file_name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Keys</td>
                    {/* Todo Simplify */}
                    <td>
                      {diffResult.differences.key_differences.file_1.map(
                        (keyName: string, i: number) => (
                          <p key={i}>{keyName}</p>
                        )
                      )}
                    </td>
                    <td>
                      {diffResult.differences.key_differences.file_2.map(
                        (keyName: string, i: number) => (
                          <p key={i}>{keyName}</p>
                        )
                      )}
                    </td>
                  </tr>
                  {diffResult.differences.value_differences.map(
                    (differences: any, i: number) => (
                      <tr key={i}>
                        <td>{differences.key}</td>
                        <td>{getJsxValueDifferences(differences.file_1)}</td>
                        <td>{getJsxValueDifferences(differences.file_2)}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </output>
          </>
        )}
      </form>
    </div>
  );
}
