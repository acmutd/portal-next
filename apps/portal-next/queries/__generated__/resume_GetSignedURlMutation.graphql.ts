/**
 * @generated SignedSource<<14d1f443175741ed5fc386c952633f2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Action = 'DELETE' | 'DOWNLOAD' | 'UPLOAD' | '%future added value';
export type FileCategory = 'RESUME' | '%future added value';
export type SignedURLInput = {
  action?: Action | null;
  fileType?: FileCategory | null;
};
export type resume_GetSignedURlMutation$variables = {
  options: SignedURLInput;
};
export type resume_GetSignedURlMutation$data = {
  readonly transferFile: {
    readonly url: string | null;
  };
};
export type resume_GetSignedURlMutation = {
  variables: resume_GetSignedURlMutation$variables;
  response: resume_GetSignedURlMutation$data;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'options',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'options',
            variableName: 'options',
          },
        ],
        concreteType: 'SignedURL',
        kind: 'LinkedField',
        name: 'transferFile',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'url',
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
      name: 'resume_GetSignedURlMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'resume_GetSignedURlMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '70c40027c5b5adba9a43d55d7fcc6eca',
      id: null,
      metadata: {},
      name: 'resume_GetSignedURlMutation',
      operationKind: 'mutation',
      text: 'mutation resume_GetSignedURlMutation(\n  $options: SignedURLInput!\n) {\n  transferFile(options: $options) {\n    url\n  }\n}\n',
    },
  };
})();

(node as any).hash = '5c24bfe040a8726b73e1651493a5cd17';

export default node;
