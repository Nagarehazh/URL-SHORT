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
        <span>URL original</span>
        <input
          type="text"
          name="original"
          id="original"
          placeholder="Ejemplo: google.com"
          required
        />
      </label>
      <label htmlFor="short">
        <span>Nombre URL acortada</span>
        <input
          type="text"
          name="short"
          id="short"
          placeholder="Ejemplo: gle"
          required
        />
      </label>
      <button type="submit">Acortar</button>

      <span className="success">
        {success && (
          <p>
            ¡Listo! Tu URL acortada es{' '}
            <a href={`/${success}`}>{`${success}`}</a>
          </p>
        )}
      </span>

      <span className="error">
        {error === 'missing' && (
          <p className="error">Por favor, llena todos los campos</p>
        )}
        {error === 'unavailable' && (
          <p className="error">Ese nombre ya está en uso, utiliza otro por favor</p>
        )}
      </span>
    </form>
  </main>
);
}

