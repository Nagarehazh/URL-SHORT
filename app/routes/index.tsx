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
    <div>
      <h1>Acorta tu URL</h1>
      <form method="post" action="/url">
        <input type="text" name="original" id="original" placeholder="Escribe tu url que deseas acortar"/>
        <label>
          {error === 'missing' && (<p className='error'>Por favor, llena todos los campos</p>)}
          {error === 'unavailable' && (<p className='error'>Ese nombre ya está en uso</p>)}
        </label>
        <input type="text" name="short" id="short" placeholder="Escribe solo el nombre que deseas tener como nuevo link"/>
        <button type="submit">Acortar</button>
      </form>
      {success && (<p>Tu link ha sido acortado con éxito y es{' '}
      <a href={`/${success}`}>{`${success}`}</a>
      </p>)}
    </div>
  );
}

