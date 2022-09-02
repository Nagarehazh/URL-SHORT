import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';


export async function loader({ request, params }: LoaderArgs) {
  const url = new URL(request.url);
  const errorParam = url.searchParams.get('error');
  const successParam = url.searchParams.get('success');

  const data = {
      error: errorParam,
      success: successParam,
  };

  return json(data);
}

export default function Index() {
  const { error, success } = useLoaderData();

  return (
    
		<main>
    <form method="post" action="/url">
      <h1>URL Shortener</h1>
      
      <label htmlFor="original">
        <span>URL Original</span>
        <input
          type="text"
          name="original"
          id="original"
          placeholder="Example: google.com"
          required
        />
      </label>
      <label htmlFor="short">
        <span>Shortened URL Name</span>
        <input
          type="text"
          name="short"
          id="short"
          placeholder="Example: gle"
          required
        />
      </label>
      <button type="submit">Shorten</button>

      <span className="success">
        {success && (
          <p>
            Your shortened URL is{' '}
            <a href={`/${success}`}>{`${success}`}</a>
          </p>
        )}
      </span>

      <span className="error">
        {error === 'missing' && (
          <p className="error">Please fill in all the fields</p>
        )}
        {error === 'unavailable' && (
          <p className="error">That name is already in use, use another one please</p>
        )}
      </span>
    </form>
  </main>
);
}

