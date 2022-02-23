/**
 * @generated SignedSource<<e3ce085b44eed8f03d984291389fbc7b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserFilter = {
  _id?: any | null;
  email?: string | null;
  name?: string | null;
};
export type pages_UsersQuery$variables = {
  filter?: UserFilter | null;
};
export type pages_UsersQuery$data = {
  readonly users: ReadonlyArray<{
    readonly hasProfile: boolean;
  }>;
};
export type pages_UsersQuery = {
  variables: pages_UsersQuery$variables;
  response: pages_UsersQuery$data;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'filter',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'filter',
            variableName: 'filter',
          },
        ],
        concreteType: 'User',
        kind: 'LinkedField',
        name: 'users',
        plural: true,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'hasProfile',
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'pages_UsersQuery',
      selections: v1 /*: any*/,
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'pages_UsersQuery',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: 'f13935a996fd15f664697a52c9377603',
      id: null,
      metadata: {},
      name: 'pages_UsersQuery',
      operationKind: 'query',
      text: 'query pages_UsersQuery(\n  $filter: UserFilter\n) {\n  users(filter: $filter) {\n    hasProfile\n  }\n}\n',
    },
  };
})();

(node as any).hash = '11e8c3c1634c425f1c42d5600a0640f4';

export default node;
