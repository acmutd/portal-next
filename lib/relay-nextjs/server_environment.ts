import { Environment, Network, Store, RecordSource } from 'relay-runtime';

export function createServerNetwork(sessionData?: string | undefined) {
  return Network.create(async (params, variables) => {
    const headers: any = { 'Content-Type': 'application/json' };
    if (sessionData) {
      headers.sessiondata = sessionData;
    }
    const response = await fetch('http://localhost:3000/api/graphql', {
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

export function createServerEnvironment(sessionData?: string | undefined) {
  return new Environment({
    network: createServerNetwork(sessionData),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
