export const onRequestGet = async (context: EventContext<{}, 'id', {}>) => {
  const { request, params } = context;
  const origin = request.headers.get('Origin') as string | null;
  try {
    const response = await fetch(`https://api.beatleader.xyz/player/${params.id}`);

    return new Response(response.body, {
      headers: {
        ...(origin?.startsWith('http://localhost')
          ? {
              'Access-Control-Allow-Origin': origin,
              'Access-Control-Allow-Methods': 'GET',
              Vary: 'Origin',
            }
          : {}),
      },
    });
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, {
      status: 500,
      ...(origin
        ? {
            headers: {
              'Access-Control-Allow-Origin': origin,
              'Access-Control-Allow-Methods': 'GET',
              Vary: 'Origin',
            },
          }
        : {}),
    });
  }
};
