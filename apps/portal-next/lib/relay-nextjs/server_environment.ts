import { Environment, Network, Store, RecordSource } from 'relay-runtime';

export function createServerNetwork(cookieData?: string | undefined) {
  return Network.create(async (params, variables) => {
    const headers: any = { 'Content-Type': 'application/json' };
    if (cookieData) {
      headers.cookie = cookieData;
    }
    const url = new URL('/api/graphql', process.env.NEXTAUTH_URL as string);
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    return response.json();
  });
}

export function createServerEnvironment(cookieData?: string | undefined) {
  return new Environment({
    network: createServerNetwork(cookieData),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
