/**
 * @generated SignedSource<<23be9858ba52c64d6936d92971dd3bfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type pages_MeQuery$variables = {};
export type pages_MeQuery$data = {
  readonly me: {
    readonly hasProfile: boolean;
  };
};
export type pages_MeQuery = {
  variables: pages_MeQuery$variables;
  response: pages_MeQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasProfile",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pages_MeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pages_MeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "01d38bf70342d5cc8d4c34a6da5772a9",
    "id": null,
    "metadata": {},
    "name": "pages_MeQuery",
    "operationKind": "query",
    "text": "query pages_MeQuery {\n  me {\n    hasProfile\n  }\n}\n"
  }
};
})();

(node as any).hash = "bb533304922943f46fba473ee382d103";

export default node;
