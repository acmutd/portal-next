import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  access_token?: Maybe<Scalars['String']['output']>;
  expires_at?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  id_token?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  providerAccountId: Scalars['String']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  session_state?: Maybe<Scalars['String']['output']>;
  token_type?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type AccountCreateManyUserInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  expires_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_token?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  providerAccountId: Scalars['String']['input'];
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  session_state?: InputMaybe<Scalars['String']['input']>;
  token_type?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type AccountCreateManyUserInputEnvelope = {
  data: Array<AccountCreateManyUserInput>;
};

export type AccountCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AccountCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<AccountCreateWithoutUserInput>>;
  createMany?: InputMaybe<AccountCreateManyUserInputEnvelope>;
};

export type AccountCreateOrConnectWithoutUserInput = {
  create: AccountCreateWithoutUserInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateWithoutUserInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  expires_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_token?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  providerAccountId: Scalars['String']['input'];
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  session_state?: InputMaybe<Scalars['String']['input']>;
  token_type?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type AccountListRelationFilter = {
  every?: InputMaybe<AccountWhereInput>;
  none?: InputMaybe<AccountWhereInput>;
  some?: InputMaybe<AccountWhereInput>;
};

export type AccountOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AccountOrderByWithRelationInput = {
  access_token?: InputMaybe<SortOrder>;
  expires_at?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  id_token?: InputMaybe<SortOrder>;
  provider?: InputMaybe<SortOrder>;
  providerAccountId?: InputMaybe<SortOrder>;
  refresh_token?: InputMaybe<SortOrder>;
  scope?: InputMaybe<SortOrder>;
  session_state?: InputMaybe<SortOrder>;
  token_type?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type AccountProviderProviderAccountIdCompoundUniqueInput = {
  provider: Scalars['String']['input'];
  providerAccountId: Scalars['String']['input'];
};

export enum AccountScalarFieldEnum {
  AccessToken = 'access_token',
  ExpiresAt = 'expires_at',
  Id = 'id',
  IdToken = 'id_token',
  Provider = 'provider',
  ProviderAccountId = 'providerAccountId',
  RefreshToken = 'refresh_token',
  Scope = 'scope',
  SessionState = 'session_state',
  TokenType = 'token_type',
  Type = 'type',
  UserId = 'userId'
}

export type AccountScalarWhereInput = {
  AND?: InputMaybe<Array<AccountScalarWhereInput>>;
  NOT?: InputMaybe<Array<AccountScalarWhereInput>>;
  OR?: InputMaybe<Array<AccountScalarWhereInput>>;
  access_token?: InputMaybe<StringNullableFilter>;
  expires_at?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  id_token?: InputMaybe<StringNullableFilter>;
  provider?: InputMaybe<StringFilter>;
  providerAccountId?: InputMaybe<StringFilter>;
  refresh_token?: InputMaybe<StringNullableFilter>;
  scope?: InputMaybe<StringNullableFilter>;
  session_state?: InputMaybe<StringNullableFilter>;
  token_type?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type AccountUpdateManyMutationInput = {
  access_token?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  expires_at?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id_token?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  provider?: InputMaybe<StringFieldUpdateOperationsInput>;
  providerAccountId?: InputMaybe<StringFieldUpdateOperationsInput>;
  refresh_token?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scope?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  session_state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  token_type?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AccountUpdateManyWithWhereWithoutUserInput = {
  data: AccountUpdateManyMutationInput;
  where: AccountScalarWhereInput;
};

export type AccountUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AccountCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<AccountCreateWithoutUserInput>>;
  createMany?: InputMaybe<AccountCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<AccountWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AccountScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  set?: InputMaybe<Array<AccountWhereUniqueInput>>;
  update?: InputMaybe<Array<AccountUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<AccountUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<AccountUpsertWithWhereUniqueWithoutUserInput>>;
};

export type AccountUpdateWithWhereUniqueWithoutUserInput = {
  data: AccountUpdateWithoutUserInput;
  where: AccountWhereUniqueInput;
};

export type AccountUpdateWithoutUserInput = {
  access_token?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  expires_at?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id_token?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  provider?: InputMaybe<StringFieldUpdateOperationsInput>;
  providerAccountId?: InputMaybe<StringFieldUpdateOperationsInput>;
  refresh_token?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scope?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  session_state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  token_type?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AccountUpsertWithWhereUniqueWithoutUserInput = {
  create: AccountCreateWithoutUserInput;
  update: AccountUpdateWithoutUserInput;
  where: AccountWhereUniqueInput;
};

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  access_token?: InputMaybe<StringNullableFilter>;
  expires_at?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  id_token?: InputMaybe<StringNullableFilter>;
  provider?: InputMaybe<StringFilter>;
  providerAccountId?: InputMaybe<StringFilter>;
  refresh_token?: InputMaybe<StringNullableFilter>;
  scope?: InputMaybe<StringNullableFilter>;
  session_state?: InputMaybe<StringNullableFilter>;
  token_type?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type AccountWhereUniqueInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  access_token?: InputMaybe<StringNullableFilter>;
  expires_at?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_token?: InputMaybe<StringNullableFilter>;
  provider?: InputMaybe<StringFilter>;
  providerAccountId?: InputMaybe<StringFilter>;
  provider_providerAccountId?: InputMaybe<AccountProviderProviderAccountIdCompoundUniqueInput>;
  refresh_token?: InputMaybe<StringNullableFilter>;
  scope?: InputMaybe<StringNullableFilter>;
  session_state?: InputMaybe<StringNullableFilter>;
  token_type?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

/** Indicate whether the SignedURL will be for uploading, downloading, or deleting. */
export enum Action {
  Delete = 'DELETE',
  Download = 'DOWNLOAD',
  Upload = 'UPLOAD'
}

export type AddUserToDivisionInput = {
  divisionId: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
};

export type Application = {
  __typename?: 'Application';
  _count?: Maybe<ApplicationCount>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  division: Division;
  divisionId: Scalars['String']['output'];
  expireDate: Scalars['DateTimeISO']['output'];
  externalResourceUrl: Scalars['String']['output'];
  fillApplications: Array<FilledApplication>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  questions: Array<Scalars['String']['output']>;
};


export type ApplicationFillApplicationsArgs = {
  cursor?: InputMaybe<FilledApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<FilledApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FilledApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FilledApplicationWhereInput>;
};

export type ApplicationCount = {
  __typename?: 'ApplicationCount';
  fillApplications: Scalars['Int']['output'];
};


export type ApplicationCountFillApplicationsArgs = {
  where?: InputMaybe<FilledApplicationWhereInput>;
};

export type ApplicationCreateInput = {
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  division: DivisionCreateNestedOneWithoutApplicationsInput;
  expireDate: Scalars['DateTimeISO']['input'];
  externalResourceUrl: Scalars['String']['input'];
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutAppInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  questions?: InputMaybe<ApplicationCreatequestionsInput>;
};

export type ApplicationCreateManyDivisionInput = {
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  expireDate: Scalars['DateTimeISO']['input'];
  externalResourceUrl: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  questions?: InputMaybe<ApplicationCreatequestionsInput>;
};

export type ApplicationCreateManyDivisionInputEnvelope = {
  data: Array<ApplicationCreateManyDivisionInput>;
};

export type ApplicationCreateNestedManyWithoutDivisionInput = {
  connect?: InputMaybe<Array<ApplicationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ApplicationCreateOrConnectWithoutDivisionInput>>;
  create?: InputMaybe<Array<ApplicationCreateWithoutDivisionInput>>;
  createMany?: InputMaybe<ApplicationCreateManyDivisionInputEnvelope>;
};

export type ApplicationCreateNestedOneWithoutFillApplicationsInput = {
  connect?: InputMaybe<ApplicationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ApplicationCreateOrConnectWithoutFillApplicationsInput>;
  create?: InputMaybe<ApplicationCreateWithoutFillApplicationsInput>;
};

export type ApplicationCreateOrConnectWithoutDivisionInput = {
  create: ApplicationCreateWithoutDivisionInput;
  where: ApplicationWhereUniqueInput;
};

export type ApplicationCreateOrConnectWithoutFillApplicationsInput = {
  create: ApplicationCreateWithoutFillApplicationsInput;
  where: ApplicationWhereUniqueInput;
};

export type ApplicationCreateWithoutDivisionInput = {
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  expireDate: Scalars['DateTimeISO']['input'];
  externalResourceUrl: Scalars['String']['input'];
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutAppInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  questions?: InputMaybe<ApplicationCreatequestionsInput>;
};

export type ApplicationCreateWithoutFillApplicationsInput = {
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  division: DivisionCreateNestedOneWithoutApplicationsInput;
  expireDate: Scalars['DateTimeISO']['input'];
  externalResourceUrl: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  questions?: InputMaybe<ApplicationCreatequestionsInput>;
};

export type ApplicationCreatequestionsInput = {
  set: Array<Scalars['String']['input']>;
};

export type ApplicationListRelationFilter = {
  every?: InputMaybe<ApplicationWhereInput>;
  none?: InputMaybe<ApplicationWhereInput>;
  some?: InputMaybe<ApplicationWhereInput>;
};

export type ApplicationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ApplicationOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  division?: InputMaybe<DivisionOrderByWithRelationInput>;
  divisionId?: InputMaybe<SortOrder>;
  expireDate?: InputMaybe<SortOrder>;
  externalResourceUrl?: InputMaybe<SortOrder>;
  fillApplications?: InputMaybe<FilledApplicationOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  questions?: InputMaybe<SortOrder>;
};

export type ApplicationRelationFilter = {
  is?: InputMaybe<ApplicationWhereInput>;
  isNot?: InputMaybe<ApplicationWhereInput>;
};

export enum ApplicationScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  DivisionId = 'divisionId',
  ExpireDate = 'expireDate',
  ExternalResourceUrl = 'externalResourceUrl',
  Id = 'id',
  Name = 'name',
  Questions = 'questions'
}

export type ApplicationScalarWhereInput = {
  AND?: InputMaybe<Array<ApplicationScalarWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationScalarWhereInput>>;
  OR?: InputMaybe<Array<ApplicationScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  divisionId?: InputMaybe<StringFilter>;
  expireDate?: InputMaybe<DateTimeFilter>;
  externalResourceUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  questions?: InputMaybe<StringNullableListFilter>;
};

export type ApplicationUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  expireDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  externalResourceUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questions?: InputMaybe<ApplicationUpdatequestionsInput>;
};

export type ApplicationUpdateManyWithWhereWithoutDivisionInput = {
  data: ApplicationUpdateManyMutationInput;
  where: ApplicationScalarWhereInput;
};

export type ApplicationUpdateManyWithoutDivisionNestedInput = {
  connect?: InputMaybe<Array<ApplicationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ApplicationCreateOrConnectWithoutDivisionInput>>;
  create?: InputMaybe<Array<ApplicationCreateWithoutDivisionInput>>;
  createMany?: InputMaybe<ApplicationCreateManyDivisionInputEnvelope>;
  delete?: InputMaybe<Array<ApplicationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ApplicationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ApplicationWhereUniqueInput>>;
  set?: InputMaybe<Array<ApplicationWhereUniqueInput>>;
  update?: InputMaybe<Array<ApplicationUpdateWithWhereUniqueWithoutDivisionInput>>;
  updateMany?: InputMaybe<Array<ApplicationUpdateManyWithWhereWithoutDivisionInput>>;
  upsert?: InputMaybe<Array<ApplicationUpsertWithWhereUniqueWithoutDivisionInput>>;
};

export type ApplicationUpdateOneRequiredWithoutFillApplicationsNestedInput = {
  connect?: InputMaybe<ApplicationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ApplicationCreateOrConnectWithoutFillApplicationsInput>;
  create?: InputMaybe<ApplicationCreateWithoutFillApplicationsInput>;
  update?: InputMaybe<ApplicationUpdateToOneWithWhereWithoutFillApplicationsInput>;
  upsert?: InputMaybe<ApplicationUpsertWithoutFillApplicationsInput>;
};

export type ApplicationUpdateToOneWithWhereWithoutFillApplicationsInput = {
  data: ApplicationUpdateWithoutFillApplicationsInput;
  where?: InputMaybe<ApplicationWhereInput>;
};

export type ApplicationUpdateWithWhereUniqueWithoutDivisionInput = {
  data: ApplicationUpdateWithoutDivisionInput;
  where: ApplicationWhereUniqueInput;
};

export type ApplicationUpdateWithoutDivisionInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  expireDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  externalResourceUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  fillApplications?: InputMaybe<FilledApplicationUpdateManyWithoutAppNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questions?: InputMaybe<ApplicationUpdatequestionsInput>;
};

export type ApplicationUpdateWithoutFillApplicationsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  division?: InputMaybe<DivisionUpdateOneRequiredWithoutApplicationsNestedInput>;
  expireDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  externalResourceUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questions?: InputMaybe<ApplicationUpdatequestionsInput>;
};

export type ApplicationUpdatequestionsInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApplicationUpsertWithWhereUniqueWithoutDivisionInput = {
  create: ApplicationCreateWithoutDivisionInput;
  update: ApplicationUpdateWithoutDivisionInput;
  where: ApplicationWhereUniqueInput;
};

export type ApplicationUpsertWithoutFillApplicationsInput = {
  create: ApplicationCreateWithoutFillApplicationsInput;
  update: ApplicationUpdateWithoutFillApplicationsInput;
  where?: InputMaybe<ApplicationWhereInput>;
};

export type ApplicationWhereInput = {
  AND?: InputMaybe<Array<ApplicationWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationWhereInput>>;
  OR?: InputMaybe<Array<ApplicationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  division?: InputMaybe<DivisionRelationFilter>;
  divisionId?: InputMaybe<StringFilter>;
  expireDate?: InputMaybe<DateTimeFilter>;
  externalResourceUrl?: InputMaybe<StringFilter>;
  fillApplications?: InputMaybe<FilledApplicationListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  questions?: InputMaybe<StringNullableListFilter>;
};

export type ApplicationWhereUniqueInput = {
  AND?: InputMaybe<Array<ApplicationWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationWhereInput>>;
  OR?: InputMaybe<Array<ApplicationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  division?: InputMaybe<DivisionRelationFilter>;
  divisionId?: InputMaybe<StringFilter>;
  expireDate?: InputMaybe<DateTimeFilter>;
  externalResourceUrl?: InputMaybe<StringFilter>;
  fillApplications?: InputMaybe<FilledApplicationListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StringFilter>;
  questions?: InputMaybe<StringNullableListFilter>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTimeISO']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  in?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  lt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  lte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  in?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  isSet?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  lte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
};

export type Director = {
  __typename?: 'Director';
  _count?: Maybe<DirectorCount>;
  divisionIds: Array<Scalars['String']['output']>;
  dummy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  officerId: Scalars['String']['output'];
};

export type DirectorCount = {
  __typename?: 'DirectorCount';
  divisions: Scalars['Int']['output'];
};


export type DirectorCountDivisionsArgs = {
  where?: InputMaybe<DivisionWhereInput>;
};

export type DirectorCreateNestedManyWithoutDivisionsInput = {
  connect?: InputMaybe<Array<DirectorWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DirectorCreateOrConnectWithoutDivisionsInput>>;
  create?: InputMaybe<Array<DirectorCreateWithoutDivisionsInput>>;
};

export type DirectorCreateNestedOneWithoutOfficerInput = {
  connect?: InputMaybe<DirectorWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DirectorCreateOrConnectWithoutOfficerInput>;
  create?: InputMaybe<DirectorCreateWithoutOfficerInput>;
};

export type DirectorCreateOrConnectWithoutDivisionsInput = {
  create: DirectorCreateWithoutDivisionsInput;
  where: DirectorWhereUniqueInput;
};

export type DirectorCreateOrConnectWithoutOfficerInput = {
  create: DirectorCreateWithoutOfficerInput;
  where: DirectorWhereUniqueInput;
};

export type DirectorCreateWithoutDivisionsInput = {
  dummy?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  officer?: InputMaybe<OfficerCreateNestedOneWithoutDirectorInput>;
};

export type DirectorCreateWithoutOfficerInput = {
  divisions?: InputMaybe<DivisionCreateNestedManyWithoutDirectorsInput>;
  dummy?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type DirectorListRelationFilter = {
  every?: InputMaybe<DirectorWhereInput>;
  none?: InputMaybe<DirectorWhereInput>;
  some?: InputMaybe<DirectorWhereInput>;
};

export type DirectorNullableRelationFilter = {
  is?: InputMaybe<DirectorWhereInput>;
  isNot?: InputMaybe<DirectorWhereInput>;
};

export type DirectorOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DirectorOrderByWithRelationInput = {
  divisionIds?: InputMaybe<SortOrder>;
  divisions?: InputMaybe<DivisionOrderByRelationAggregateInput>;
  dummy?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  officer?: InputMaybe<OfficerOrderByWithRelationInput>;
  officerId?: InputMaybe<SortOrder>;
};

export type DirectorScalarWhereInput = {
  AND?: InputMaybe<Array<DirectorScalarWhereInput>>;
  NOT?: InputMaybe<Array<DirectorScalarWhereInput>>;
  OR?: InputMaybe<Array<DirectorScalarWhereInput>>;
  divisionIds?: InputMaybe<StringNullableListFilter>;
  dummy?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  officerId?: InputMaybe<StringFilter>;
};

export type DirectorUpdateManyMutationInput = {
  dummy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DirectorUpdateManyWithWhereWithoutDivisionsInput = {
  data: DirectorUpdateManyMutationInput;
  where: DirectorScalarWhereInput;
};

export type DirectorUpdateManyWithoutDivisionsNestedInput = {
  connect?: InputMaybe<Array<DirectorWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DirectorCreateOrConnectWithoutDivisionsInput>>;
  create?: InputMaybe<Array<DirectorCreateWithoutDivisionsInput>>;
  delete?: InputMaybe<Array<DirectorWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DirectorScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DirectorWhereUniqueInput>>;
  set?: InputMaybe<Array<DirectorWhereUniqueInput>>;
  update?: InputMaybe<Array<DirectorUpdateWithWhereUniqueWithoutDivisionsInput>>;
  updateMany?: InputMaybe<Array<DirectorUpdateManyWithWhereWithoutDivisionsInput>>;
  upsert?: InputMaybe<Array<DirectorUpsertWithWhereUniqueWithoutDivisionsInput>>;
};

export type DirectorUpdateOneWithoutOfficerNestedInput = {
  connect?: InputMaybe<DirectorWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DirectorCreateOrConnectWithoutOfficerInput>;
  create?: InputMaybe<DirectorCreateWithoutOfficerInput>;
  delete?: InputMaybe<DirectorWhereInput>;
  disconnect?: InputMaybe<DirectorWhereInput>;
  update?: InputMaybe<DirectorUpdateToOneWithWhereWithoutOfficerInput>;
  upsert?: InputMaybe<DirectorUpsertWithoutOfficerInput>;
};

export type DirectorUpdateToOneWithWhereWithoutOfficerInput = {
  data: DirectorUpdateWithoutOfficerInput;
  where?: InputMaybe<DirectorWhereInput>;
};

export type DirectorUpdateWithWhereUniqueWithoutDivisionsInput = {
  data: DirectorUpdateWithoutDivisionsInput;
  where: DirectorWhereUniqueInput;
};

export type DirectorUpdateWithoutDivisionsInput = {
  dummy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  officer?: InputMaybe<OfficerUpdateOneWithoutDirectorNestedInput>;
};

export type DirectorUpdateWithoutOfficerInput = {
  divisions?: InputMaybe<DivisionUpdateManyWithoutDirectorsNestedInput>;
  dummy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DirectorUpsertWithWhereUniqueWithoutDivisionsInput = {
  create: DirectorCreateWithoutDivisionsInput;
  update: DirectorUpdateWithoutDivisionsInput;
  where: DirectorWhereUniqueInput;
};

export type DirectorUpsertWithoutOfficerInput = {
  create: DirectorCreateWithoutOfficerInput;
  update: DirectorUpdateWithoutOfficerInput;
  where?: InputMaybe<DirectorWhereInput>;
};

export type DirectorWhereInput = {
  AND?: InputMaybe<Array<DirectorWhereInput>>;
  NOT?: InputMaybe<Array<DirectorWhereInput>>;
  OR?: InputMaybe<Array<DirectorWhereInput>>;
  divisionIds?: InputMaybe<StringNullableListFilter>;
  divisions?: InputMaybe<DivisionListRelationFilter>;
  dummy?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  officer?: InputMaybe<OfficerNullableRelationFilter>;
  officerId?: InputMaybe<StringFilter>;
};

export type DirectorWhereUniqueInput = {
  AND?: InputMaybe<Array<DirectorWhereInput>>;
  NOT?: InputMaybe<Array<DirectorWhereInput>>;
  OR?: InputMaybe<Array<DirectorWhereInput>>;
  divisionIds?: InputMaybe<StringNullableListFilter>;
  divisions?: InputMaybe<DivisionListRelationFilter>;
  dummy?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  officer?: InputMaybe<OfficerNullableRelationFilter>;
  officerId?: InputMaybe<Scalars['String']['input']>;
};

export type Division = {
  __typename?: 'Division';
  _count?: Maybe<DivisionCount>;
  deptName: Scalars['String']['output'];
  directorIds: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  officerIds: Array<Scalars['String']['output']>;
};

export type DivisionCount = {
  __typename?: 'DivisionCount';
  applications: Scalars['Int']['output'];
  directors: Scalars['Int']['output'];
  officers: Scalars['Int']['output'];
};


export type DivisionCountApplicationsArgs = {
  where?: InputMaybe<ApplicationWhereInput>;
};


export type DivisionCountDirectorsArgs = {
  where?: InputMaybe<DirectorWhereInput>;
};


export type DivisionCountOfficersArgs = {
  where?: InputMaybe<OfficerWhereInput>;
};

export type DivisionCreateNestedManyWithoutDirectorsInput = {
  connect?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DivisionCreateOrConnectWithoutDirectorsInput>>;
  create?: InputMaybe<Array<DivisionCreateWithoutDirectorsInput>>;
};

export type DivisionCreateNestedManyWithoutOfficersInput = {
  connect?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DivisionCreateOrConnectWithoutOfficersInput>>;
  create?: InputMaybe<Array<DivisionCreateWithoutOfficersInput>>;
};

export type DivisionCreateNestedOneWithoutApplicationsInput = {
  connect?: InputMaybe<DivisionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DivisionCreateOrConnectWithoutApplicationsInput>;
  create?: InputMaybe<DivisionCreateWithoutApplicationsInput>;
};

export type DivisionCreateOrConnectWithoutApplicationsInput = {
  create: DivisionCreateWithoutApplicationsInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionCreateOrConnectWithoutDirectorsInput = {
  create: DivisionCreateWithoutDirectorsInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionCreateOrConnectWithoutOfficersInput = {
  create: DivisionCreateWithoutOfficersInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionCreateWithoutApplicationsInput = {
  deptName: Scalars['String']['input'];
  directors?: InputMaybe<DirectorCreateNestedManyWithoutDivisionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  officers?: InputMaybe<OfficerCreateNestedManyWithoutDivisionsInput>;
};

export type DivisionCreateWithoutDirectorsInput = {
  applications?: InputMaybe<ApplicationCreateNestedManyWithoutDivisionInput>;
  deptName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  officers?: InputMaybe<OfficerCreateNestedManyWithoutDivisionsInput>;
};

export type DivisionCreateWithoutOfficersInput = {
  applications?: InputMaybe<ApplicationCreateNestedManyWithoutDivisionInput>;
  deptName: Scalars['String']['input'];
  directors?: InputMaybe<DirectorCreateNestedManyWithoutDivisionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type DivisionListRelationFilter = {
  every?: InputMaybe<DivisionWhereInput>;
  none?: InputMaybe<DivisionWhereInput>;
  some?: InputMaybe<DivisionWhereInput>;
};

export type DivisionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DivisionOrderByWithRelationInput = {
  applications?: InputMaybe<ApplicationOrderByRelationAggregateInput>;
  deptName?: InputMaybe<SortOrder>;
  directorIds?: InputMaybe<SortOrder>;
  directors?: InputMaybe<DirectorOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  officerIds?: InputMaybe<SortOrder>;
  officers?: InputMaybe<OfficerOrderByRelationAggregateInput>;
};

export type DivisionRelationFilter = {
  is?: InputMaybe<DivisionWhereInput>;
  isNot?: InputMaybe<DivisionWhereInput>;
};

export enum DivisionScalarFieldEnum {
  DeptName = 'deptName',
  DirectorIds = 'directorIds',
  Id = 'id',
  OfficerIds = 'officerIds'
}

export type DivisionScalarWhereInput = {
  AND?: InputMaybe<Array<DivisionScalarWhereInput>>;
  NOT?: InputMaybe<Array<DivisionScalarWhereInput>>;
  OR?: InputMaybe<Array<DivisionScalarWhereInput>>;
  deptName?: InputMaybe<StringFilter>;
  directorIds?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  officerIds?: InputMaybe<StringNullableListFilter>;
};

export type DivisionUpdateManyMutationInput = {
  deptName?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type DivisionUpdateManyWithWhereWithoutDirectorsInput = {
  data: DivisionUpdateManyMutationInput;
  where: DivisionScalarWhereInput;
};

export type DivisionUpdateManyWithWhereWithoutOfficersInput = {
  data: DivisionUpdateManyMutationInput;
  where: DivisionScalarWhereInput;
};

export type DivisionUpdateManyWithoutDirectorsNestedInput = {
  connect?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DivisionCreateOrConnectWithoutDirectorsInput>>;
  create?: InputMaybe<Array<DivisionCreateWithoutDirectorsInput>>;
  delete?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DivisionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  set?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  update?: InputMaybe<Array<DivisionUpdateWithWhereUniqueWithoutDirectorsInput>>;
  updateMany?: InputMaybe<Array<DivisionUpdateManyWithWhereWithoutDirectorsInput>>;
  upsert?: InputMaybe<Array<DivisionUpsertWithWhereUniqueWithoutDirectorsInput>>;
};

export type DivisionUpdateManyWithoutOfficersNestedInput = {
  connect?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DivisionCreateOrConnectWithoutOfficersInput>>;
  create?: InputMaybe<Array<DivisionCreateWithoutOfficersInput>>;
  delete?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DivisionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  set?: InputMaybe<Array<DivisionWhereUniqueInput>>;
  update?: InputMaybe<Array<DivisionUpdateWithWhereUniqueWithoutOfficersInput>>;
  updateMany?: InputMaybe<Array<DivisionUpdateManyWithWhereWithoutOfficersInput>>;
  upsert?: InputMaybe<Array<DivisionUpsertWithWhereUniqueWithoutOfficersInput>>;
};

export type DivisionUpdateOneRequiredWithoutApplicationsNestedInput = {
  connect?: InputMaybe<DivisionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DivisionCreateOrConnectWithoutApplicationsInput>;
  create?: InputMaybe<DivisionCreateWithoutApplicationsInput>;
  update?: InputMaybe<DivisionUpdateToOneWithWhereWithoutApplicationsInput>;
  upsert?: InputMaybe<DivisionUpsertWithoutApplicationsInput>;
};

export type DivisionUpdateToOneWithWhereWithoutApplicationsInput = {
  data: DivisionUpdateWithoutApplicationsInput;
  where?: InputMaybe<DivisionWhereInput>;
};

export type DivisionUpdateWithWhereUniqueWithoutDirectorsInput = {
  data: DivisionUpdateWithoutDirectorsInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionUpdateWithWhereUniqueWithoutOfficersInput = {
  data: DivisionUpdateWithoutOfficersInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionUpdateWithoutApplicationsInput = {
  deptName?: InputMaybe<StringFieldUpdateOperationsInput>;
  directors?: InputMaybe<DirectorUpdateManyWithoutDivisionsNestedInput>;
  officers?: InputMaybe<OfficerUpdateManyWithoutDivisionsNestedInput>;
};

export type DivisionUpdateWithoutDirectorsInput = {
  applications?: InputMaybe<ApplicationUpdateManyWithoutDivisionNestedInput>;
  deptName?: InputMaybe<StringFieldUpdateOperationsInput>;
  officers?: InputMaybe<OfficerUpdateManyWithoutDivisionsNestedInput>;
};

export type DivisionUpdateWithoutOfficersInput = {
  applications?: InputMaybe<ApplicationUpdateManyWithoutDivisionNestedInput>;
  deptName?: InputMaybe<StringFieldUpdateOperationsInput>;
  directors?: InputMaybe<DirectorUpdateManyWithoutDivisionsNestedInput>;
};

export type DivisionUpsertWithWhereUniqueWithoutDirectorsInput = {
  create: DivisionCreateWithoutDirectorsInput;
  update: DivisionUpdateWithoutDirectorsInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionUpsertWithWhereUniqueWithoutOfficersInput = {
  create: DivisionCreateWithoutOfficersInput;
  update: DivisionUpdateWithoutOfficersInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionUpsertWithoutApplicationsInput = {
  create: DivisionCreateWithoutApplicationsInput;
  update: DivisionUpdateWithoutApplicationsInput;
  where?: InputMaybe<DivisionWhereInput>;
};

export type DivisionWhereInput = {
  AND?: InputMaybe<Array<DivisionWhereInput>>;
  NOT?: InputMaybe<Array<DivisionWhereInput>>;
  OR?: InputMaybe<Array<DivisionWhereInput>>;
  applications?: InputMaybe<ApplicationListRelationFilter>;
  deptName?: InputMaybe<StringFilter>;
  directorIds?: InputMaybe<StringNullableListFilter>;
  directors?: InputMaybe<DirectorListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  officerIds?: InputMaybe<StringNullableListFilter>;
  officers?: InputMaybe<OfficerListRelationFilter>;
};

export type DivisionWhereUniqueInput = {
  AND?: InputMaybe<Array<DivisionWhereInput>>;
  NOT?: InputMaybe<Array<DivisionWhereInput>>;
  OR?: InputMaybe<Array<DivisionWhereInput>>;
  applications?: InputMaybe<ApplicationListRelationFilter>;
  deptName?: InputMaybe<StringFilter>;
  directorIds?: InputMaybe<StringNullableListFilter>;
  directors?: InputMaybe<DirectorListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  officerIds?: InputMaybe<StringNullableListFilter>;
  officers?: InputMaybe<OfficerListRelationFilter>;
};

export type Event = {
  __typename?: 'Event';
  _count?: Maybe<EventCount>;
  description: Scalars['String']['output'];
  end: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  isPublic: Scalars['Boolean']['output'];
  location: Scalars['String']['output'];
  start: Scalars['DateTimeISO']['output'];
  summary: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type EventCheckin = {
  __typename?: 'EventCheckin';
  eventId: Scalars['String']['output'];
  profileId: Scalars['String']['output'];
};

export type EventCheckinInput = {
  eventId: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
};

export type EventCount = {
  __typename?: 'EventCount';
  profiles: Scalars['Int']['output'];
};


export type EventCountProfilesArgs = {
  where?: InputMaybe<EventReservationWhereInput>;
};

export type EventCreateInput = {
  description: Scalars['String']['input'];
  end: Scalars['DateTimeISO']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isPublic: Scalars['Boolean']['input'];
  location: Scalars['String']['input'];
  profiles?: InputMaybe<EventReservationCreateNestedManyWithoutEventInput>;
  start: Scalars['DateTimeISO']['input'];
  summary: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type EventCreateNestedOneWithoutProfilesInput = {
  connect?: InputMaybe<EventWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EventCreateOrConnectWithoutProfilesInput>;
  create?: InputMaybe<EventCreateWithoutProfilesInput>;
};

export type EventCreateOrConnectWithoutProfilesInput = {
  create: EventCreateWithoutProfilesInput;
  where: EventWhereUniqueInput;
};

export type EventCreateWithoutProfilesInput = {
  description: Scalars['String']['input'];
  end: Scalars['DateTimeISO']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isPublic: Scalars['Boolean']['input'];
  location: Scalars['String']['input'];
  start: Scalars['DateTimeISO']['input'];
  summary: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type EventOrderByWithRelationInput = {
  description?: InputMaybe<SortOrder>;
  end?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isPublic?: InputMaybe<SortOrder>;
  location?: InputMaybe<SortOrder>;
  profiles?: InputMaybe<EventReservationOrderByRelationAggregateInput>;
  start?: InputMaybe<SortOrder>;
  summary?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type EventRelationFilter = {
  is?: InputMaybe<EventWhereInput>;
  isNot?: InputMaybe<EventWhereInput>;
};

export type EventReservation = {
  __typename?: 'EventReservation';
  eventId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  profileId: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type EventReservationCreateManyEventInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  profileId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type EventReservationCreateManyEventInputEnvelope = {
  data: Array<EventReservationCreateManyEventInput>;
};

export type EventReservationCreateManyProfileInput = {
  eventId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};

export type EventReservationCreateManyProfileInputEnvelope = {
  data: Array<EventReservationCreateManyProfileInput>;
};

export type EventReservationCreateNestedManyWithoutEventInput = {
  connect?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EventReservationCreateOrConnectWithoutEventInput>>;
  create?: InputMaybe<Array<EventReservationCreateWithoutEventInput>>;
  createMany?: InputMaybe<EventReservationCreateManyEventInputEnvelope>;
};

export type EventReservationCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EventReservationCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<EventReservationCreateWithoutProfileInput>>;
  createMany?: InputMaybe<EventReservationCreateManyProfileInputEnvelope>;
};

export type EventReservationCreateOrConnectWithoutEventInput = {
  create: EventReservationCreateWithoutEventInput;
  where: EventReservationWhereUniqueInput;
};

export type EventReservationCreateOrConnectWithoutProfileInput = {
  create: EventReservationCreateWithoutProfileInput;
  where: EventReservationWhereUniqueInput;
};

export type EventReservationCreateWithoutEventInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  profile: ProfileCreateNestedOneWithoutEventsInput;
  status: Scalars['String']['input'];
};

export type EventReservationCreateWithoutProfileInput = {
  event: EventCreateNestedOneWithoutProfilesInput;
  id?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};

export type EventReservationListRelationFilter = {
  every?: InputMaybe<EventReservationWhereInput>;
  none?: InputMaybe<EventReservationWhereInput>;
  some?: InputMaybe<EventReservationWhereInput>;
};

export type EventReservationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type EventReservationOrderByWithRelationInput = {
  event?: InputMaybe<EventOrderByWithRelationInput>;
  eventId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
};

export type EventReservationProfileIdEventIdCompoundUniqueInput = {
  eventId: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
};

export enum EventReservationScalarFieldEnum {
  EventId = 'eventId',
  Id = 'id',
  ProfileId = 'profileId',
  Status = 'status'
}

export type EventReservationScalarWhereInput = {
  AND?: InputMaybe<Array<EventReservationScalarWhereInput>>;
  NOT?: InputMaybe<Array<EventReservationScalarWhereInput>>;
  OR?: InputMaybe<Array<EventReservationScalarWhereInput>>;
  eventId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  profileId?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type EventReservationUpdateManyMutationInput = {
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type EventReservationUpdateManyWithWhereWithoutEventInput = {
  data: EventReservationUpdateManyMutationInput;
  where: EventReservationScalarWhereInput;
};

export type EventReservationUpdateManyWithWhereWithoutProfileInput = {
  data: EventReservationUpdateManyMutationInput;
  where: EventReservationScalarWhereInput;
};

export type EventReservationUpdateManyWithoutEventNestedInput = {
  connect?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EventReservationCreateOrConnectWithoutEventInput>>;
  create?: InputMaybe<Array<EventReservationCreateWithoutEventInput>>;
  createMany?: InputMaybe<EventReservationCreateManyEventInputEnvelope>;
  delete?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EventReservationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  set?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  update?: InputMaybe<Array<EventReservationUpdateWithWhereUniqueWithoutEventInput>>;
  updateMany?: InputMaybe<Array<EventReservationUpdateManyWithWhereWithoutEventInput>>;
  upsert?: InputMaybe<Array<EventReservationUpsertWithWhereUniqueWithoutEventInput>>;
};

export type EventReservationUpdateManyWithoutProfileNestedInput = {
  connect?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EventReservationCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<EventReservationCreateWithoutProfileInput>>;
  createMany?: InputMaybe<EventReservationCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EventReservationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  set?: InputMaybe<Array<EventReservationWhereUniqueInput>>;
  update?: InputMaybe<Array<EventReservationUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<EventReservationUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<EventReservationUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type EventReservationUpdateWithWhereUniqueWithoutEventInput = {
  data: EventReservationUpdateWithoutEventInput;
  where: EventReservationWhereUniqueInput;
};

export type EventReservationUpdateWithWhereUniqueWithoutProfileInput = {
  data: EventReservationUpdateWithoutProfileInput;
  where: EventReservationWhereUniqueInput;
};

export type EventReservationUpdateWithoutEventInput = {
  profile?: InputMaybe<ProfileUpdateOneRequiredWithoutEventsNestedInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type EventReservationUpdateWithoutProfileInput = {
  event?: InputMaybe<EventUpdateOneRequiredWithoutProfilesNestedInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type EventReservationUpsertWithWhereUniqueWithoutEventInput = {
  create: EventReservationCreateWithoutEventInput;
  update: EventReservationUpdateWithoutEventInput;
  where: EventReservationWhereUniqueInput;
};

export type EventReservationUpsertWithWhereUniqueWithoutProfileInput = {
  create: EventReservationCreateWithoutProfileInput;
  update: EventReservationUpdateWithoutProfileInput;
  where: EventReservationWhereUniqueInput;
};

export type EventReservationWhereInput = {
  AND?: InputMaybe<Array<EventReservationWhereInput>>;
  NOT?: InputMaybe<Array<EventReservationWhereInput>>;
  OR?: InputMaybe<Array<EventReservationWhereInput>>;
  event?: InputMaybe<EventRelationFilter>;
  eventId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type EventReservationWhereUniqueInput = {
  AND?: InputMaybe<Array<EventReservationWhereInput>>;
  NOT?: InputMaybe<Array<EventReservationWhereInput>>;
  OR?: InputMaybe<Array<EventReservationWhereInput>>;
  event?: InputMaybe<EventRelationFilter>;
  eventId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<StringFilter>;
  profileId_eventId?: InputMaybe<EventReservationProfileIdEventIdCompoundUniqueInput>;
  status?: InputMaybe<StringFilter>;
};

export enum EventScalarFieldEnum {
  Description = 'description',
  End = 'end',
  Id = 'id',
  IsPublic = 'isPublic',
  Location = 'location',
  Start = 'start',
  Summary = 'summary',
  Url = 'url'
}

export type EventUpdateInput = {
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  end?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  isPublic?: InputMaybe<BoolFieldUpdateOperationsInput>;
  location?: InputMaybe<StringFieldUpdateOperationsInput>;
  profiles?: InputMaybe<EventReservationUpdateManyWithoutEventNestedInput>;
  start?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  summary?: InputMaybe<StringFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type EventUpdateOneRequiredWithoutProfilesNestedInput = {
  connect?: InputMaybe<EventWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EventCreateOrConnectWithoutProfilesInput>;
  create?: InputMaybe<EventCreateWithoutProfilesInput>;
  update?: InputMaybe<EventUpdateToOneWithWhereWithoutProfilesInput>;
  upsert?: InputMaybe<EventUpsertWithoutProfilesInput>;
};

export type EventUpdateToOneWithWhereWithoutProfilesInput = {
  data: EventUpdateWithoutProfilesInput;
  where?: InputMaybe<EventWhereInput>;
};

export type EventUpdateWithoutProfilesInput = {
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  end?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  isPublic?: InputMaybe<BoolFieldUpdateOperationsInput>;
  location?: InputMaybe<StringFieldUpdateOperationsInput>;
  start?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  summary?: InputMaybe<StringFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type EventUpsertWithoutProfilesInput = {
  create: EventCreateWithoutProfilesInput;
  update: EventUpdateWithoutProfilesInput;
  where?: InputMaybe<EventWhereInput>;
};

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  NOT?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  description?: InputMaybe<StringFilter>;
  end?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isPublic?: InputMaybe<BoolFilter>;
  location?: InputMaybe<StringFilter>;
  profiles?: InputMaybe<EventReservationListRelationFilter>;
  start?: InputMaybe<DateTimeFilter>;
  summary?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type EventWhereUniqueInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  NOT?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  description?: InputMaybe<StringFilter>;
  end?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<BoolFilter>;
  location?: InputMaybe<StringFilter>;
  profiles?: InputMaybe<EventReservationListRelationFilter>;
  start?: InputMaybe<DateTimeFilter>;
  summary?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

/** Types of files or documents that may be uploaded to Google Cloud. */
export enum FileCategory {
  Resume = 'RESUME'
}

export type FilledApplication = {
  __typename?: 'FilledApplication';
  app: Application;
  appId: Scalars['String']['output'];
  first: Scalars['String']['output'];
  id: Scalars['String']['output'];
  interviewLink?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  profileId: Scalars['String']['output'];
  responses: Array<Scalars['String']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  second: Scalars['String']['output'];
  status: Scalars['String']['output'];
  third: Scalars['String']['output'];
};

export type FilledApplicationCreateInput = {
  app: ApplicationCreateNestedOneWithoutFillApplicationsInput;
  first: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  interviewLink?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  profile: ProfileCreateNestedOneWithoutFillApplicationsInput;
  responses?: InputMaybe<FilledApplicationCreateresponsesInput>;
  score?: InputMaybe<Scalars['Int']['input']>;
  second: Scalars['String']['input'];
  status: Scalars['String']['input'];
  third: Scalars['String']['input'];
};

export type FilledApplicationCreateManyAppInput = {
  first: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  interviewLink?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  profileId: Scalars['String']['input'];
  responses?: InputMaybe<FilledApplicationCreateresponsesInput>;
  score?: InputMaybe<Scalars['Int']['input']>;
  second: Scalars['String']['input'];
  status: Scalars['String']['input'];
  third: Scalars['String']['input'];
};

export type FilledApplicationCreateManyAppInputEnvelope = {
  data: Array<FilledApplicationCreateManyAppInput>;
};

export type FilledApplicationCreateManyProfileInput = {
  appId: Scalars['String']['input'];
  first: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  interviewLink?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  responses?: InputMaybe<FilledApplicationCreateresponsesInput>;
  score?: InputMaybe<Scalars['Int']['input']>;
  second: Scalars['String']['input'];
  status: Scalars['String']['input'];
  third: Scalars['String']['input'];
};

export type FilledApplicationCreateManyProfileInputEnvelope = {
  data: Array<FilledApplicationCreateManyProfileInput>;
};

export type FilledApplicationCreateNestedManyWithoutAppInput = {
  connect?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FilledApplicationCreateOrConnectWithoutAppInput>>;
  create?: InputMaybe<Array<FilledApplicationCreateWithoutAppInput>>;
  createMany?: InputMaybe<FilledApplicationCreateManyAppInputEnvelope>;
};

export type FilledApplicationCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FilledApplicationCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<FilledApplicationCreateWithoutProfileInput>>;
  createMany?: InputMaybe<FilledApplicationCreateManyProfileInputEnvelope>;
};

export type FilledApplicationCreateOrConnectWithoutAppInput = {
  create: FilledApplicationCreateWithoutAppInput;
  where: FilledApplicationWhereUniqueInput;
};

export type FilledApplicationCreateOrConnectWithoutProfileInput = {
  create: FilledApplicationCreateWithoutProfileInput;
  where: FilledApplicationWhereUniqueInput;
};

export type FilledApplicationCreateWithoutAppInput = {
  first: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  interviewLink?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  profile: ProfileCreateNestedOneWithoutFillApplicationsInput;
  responses?: InputMaybe<FilledApplicationCreateresponsesInput>;
  score?: InputMaybe<Scalars['Int']['input']>;
  second: Scalars['String']['input'];
  status: Scalars['String']['input'];
  third: Scalars['String']['input'];
};

export type FilledApplicationCreateWithoutProfileInput = {
  app: ApplicationCreateNestedOneWithoutFillApplicationsInput;
  first: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  interviewLink?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  responses?: InputMaybe<FilledApplicationCreateresponsesInput>;
  score?: InputMaybe<Scalars['Int']['input']>;
  second: Scalars['String']['input'];
  status: Scalars['String']['input'];
  third: Scalars['String']['input'];
};

export type FilledApplicationCreateresponsesInput = {
  set: Array<Scalars['String']['input']>;
};

export type FilledApplicationListRelationFilter = {
  every?: InputMaybe<FilledApplicationWhereInput>;
  none?: InputMaybe<FilledApplicationWhereInput>;
  some?: InputMaybe<FilledApplicationWhereInput>;
};

export type FilledApplicationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FilledApplicationOrderByWithRelationInput = {
  app?: InputMaybe<ApplicationOrderByWithRelationInput>;
  appId?: InputMaybe<SortOrder>;
  first?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  interviewLink?: InputMaybe<SortOrder>;
  notes?: InputMaybe<SortOrder>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  responses?: InputMaybe<SortOrder>;
  score?: InputMaybe<SortOrder>;
  second?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  third?: InputMaybe<SortOrder>;
};

export enum FilledApplicationScalarFieldEnum {
  AppId = 'appId',
  First = 'first',
  Id = 'id',
  InterviewLink = 'interviewLink',
  Notes = 'notes',
  ProfileId = 'profileId',
  Responses = 'responses',
  Score = 'score',
  Second = 'second',
  Status = 'status',
  Third = 'third'
}

export type FilledApplicationScalarWhereInput = {
  AND?: InputMaybe<Array<FilledApplicationScalarWhereInput>>;
  NOT?: InputMaybe<Array<FilledApplicationScalarWhereInput>>;
  OR?: InputMaybe<Array<FilledApplicationScalarWhereInput>>;
  appId?: InputMaybe<StringFilter>;
  first?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  interviewLink?: InputMaybe<StringNullableFilter>;
  notes?: InputMaybe<StringNullableFilter>;
  profileId?: InputMaybe<StringFilter>;
  responses?: InputMaybe<StringNullableListFilter>;
  score?: InputMaybe<IntNullableFilter>;
  second?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  third?: InputMaybe<StringFilter>;
};

export type FilledApplicationUpdateInput = {
  app?: InputMaybe<ApplicationUpdateOneRequiredWithoutFillApplicationsNestedInput>;
  first?: InputMaybe<StringFieldUpdateOperationsInput>;
  interviewLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notes?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  profile?: InputMaybe<ProfileUpdateOneRequiredWithoutFillApplicationsNestedInput>;
  responses?: InputMaybe<FilledApplicationUpdateresponsesInput>;
  score?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  second?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  third?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FilledApplicationUpdateManyMutationInput = {
  first?: InputMaybe<StringFieldUpdateOperationsInput>;
  interviewLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notes?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  responses?: InputMaybe<FilledApplicationUpdateresponsesInput>;
  score?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  second?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  third?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FilledApplicationUpdateManyWithWhereWithoutAppInput = {
  data: FilledApplicationUpdateManyMutationInput;
  where: FilledApplicationScalarWhereInput;
};

export type FilledApplicationUpdateManyWithWhereWithoutProfileInput = {
  data: FilledApplicationUpdateManyMutationInput;
  where: FilledApplicationScalarWhereInput;
};

export type FilledApplicationUpdateManyWithoutAppNestedInput = {
  connect?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FilledApplicationCreateOrConnectWithoutAppInput>>;
  create?: InputMaybe<Array<FilledApplicationCreateWithoutAppInput>>;
  createMany?: InputMaybe<FilledApplicationCreateManyAppInputEnvelope>;
  delete?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FilledApplicationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  set?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  update?: InputMaybe<Array<FilledApplicationUpdateWithWhereUniqueWithoutAppInput>>;
  updateMany?: InputMaybe<Array<FilledApplicationUpdateManyWithWhereWithoutAppInput>>;
  upsert?: InputMaybe<Array<FilledApplicationUpsertWithWhereUniqueWithoutAppInput>>;
};

export type FilledApplicationUpdateManyWithoutProfileNestedInput = {
  connect?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FilledApplicationCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<FilledApplicationCreateWithoutProfileInput>>;
  createMany?: InputMaybe<FilledApplicationCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FilledApplicationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  set?: InputMaybe<Array<FilledApplicationWhereUniqueInput>>;
  update?: InputMaybe<Array<FilledApplicationUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<FilledApplicationUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<FilledApplicationUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type FilledApplicationUpdateWithWhereUniqueWithoutAppInput = {
  data: FilledApplicationUpdateWithoutAppInput;
  where: FilledApplicationWhereUniqueInput;
};

export type FilledApplicationUpdateWithWhereUniqueWithoutProfileInput = {
  data: FilledApplicationUpdateWithoutProfileInput;
  where: FilledApplicationWhereUniqueInput;
};

export type FilledApplicationUpdateWithoutAppInput = {
  first?: InputMaybe<StringFieldUpdateOperationsInput>;
  interviewLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notes?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  profile?: InputMaybe<ProfileUpdateOneRequiredWithoutFillApplicationsNestedInput>;
  responses?: InputMaybe<FilledApplicationUpdateresponsesInput>;
  score?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  second?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  third?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FilledApplicationUpdateWithoutProfileInput = {
  app?: InputMaybe<ApplicationUpdateOneRequiredWithoutFillApplicationsNestedInput>;
  first?: InputMaybe<StringFieldUpdateOperationsInput>;
  interviewLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notes?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  responses?: InputMaybe<FilledApplicationUpdateresponsesInput>;
  score?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  second?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  third?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FilledApplicationUpdateresponsesInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FilledApplicationUpsertWithWhereUniqueWithoutAppInput = {
  create: FilledApplicationCreateWithoutAppInput;
  update: FilledApplicationUpdateWithoutAppInput;
  where: FilledApplicationWhereUniqueInput;
};

export type FilledApplicationUpsertWithWhereUniqueWithoutProfileInput = {
  create: FilledApplicationCreateWithoutProfileInput;
  update: FilledApplicationUpdateWithoutProfileInput;
  where: FilledApplicationWhereUniqueInput;
};

export type FilledApplicationWhereInput = {
  AND?: InputMaybe<Array<FilledApplicationWhereInput>>;
  NOT?: InputMaybe<Array<FilledApplicationWhereInput>>;
  OR?: InputMaybe<Array<FilledApplicationWhereInput>>;
  app?: InputMaybe<ApplicationRelationFilter>;
  appId?: InputMaybe<StringFilter>;
  first?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  interviewLink?: InputMaybe<StringNullableFilter>;
  notes?: InputMaybe<StringNullableFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<StringFilter>;
  responses?: InputMaybe<StringNullableListFilter>;
  score?: InputMaybe<IntNullableFilter>;
  second?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  third?: InputMaybe<StringFilter>;
};

export type FilledApplicationWhereUniqueInput = {
  AND?: InputMaybe<Array<FilledApplicationWhereInput>>;
  NOT?: InputMaybe<Array<FilledApplicationWhereInput>>;
  OR?: InputMaybe<Array<FilledApplicationWhereInput>>;
  app?: InputMaybe<ApplicationRelationFilter>;
  appId?: InputMaybe<StringFilter>;
  first?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  interviewLink?: InputMaybe<StringNullableFilter>;
  notes?: InputMaybe<StringNullableFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<StringFilter>;
  responses?: InputMaybe<StringNullableListFilter>;
  score?: InputMaybe<IntNullableFilter>;
  second?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  third?: InputMaybe<StringFilter>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isSet?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToDivision: Scalars['String']['output'];
  checkInOldEvent: Array<EventCheckin>;
  checkinToEvent: EventCheckin;
  createOneApplication: Application;
  createOneEvent: Event;
  createOneFilledApplication: FilledApplication;
  createOneTypeformApplication: TypeformApplication;
  createOneVanityLink: VanityLink;
  deleteOneEvent?: Maybe<Event>;
  deleteOneTypeformApplication?: Maybe<TypeformApplication>;
  transferFile: SignedUrl;
  updateOneEvent?: Maybe<Event>;
  updateOneFilledApplication?: Maybe<FilledApplication>;
  updateOneOfficer?: Maybe<Officer>;
  updateOneTypeformApplication?: Maybe<TypeformApplication>;
  upsertOneProfile: Profile;
};


export type MutationAddUserToDivisionArgs = {
  data: AddUserToDivisionInput;
};


export type MutationCheckInOldEventArgs = {
  email: Scalars['String']['input'];
  netID: Scalars['String']['input'];
};


export type MutationCheckinToEventArgs = {
  options: EventCheckinInput;
};


export type MutationCreateOneApplicationArgs = {
  data: ApplicationCreateInput;
};


export type MutationCreateOneEventArgs = {
  data: EventCreateInput;
};


export type MutationCreateOneFilledApplicationArgs = {
  data: FilledApplicationCreateInput;
};


export type MutationCreateOneTypeformApplicationArgs = {
  data: TypeformApplicationCreateInput;
};


export type MutationCreateOneVanityLinkArgs = {
  data: VanityLinkCreateInput;
};


export type MutationDeleteOneEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationDeleteOneTypeformApplicationArgs = {
  where: TypeformApplicationWhereUniqueInput;
};


export type MutationTransferFileArgs = {
  options: SignedUrlInput;
};


export type MutationUpdateOneEventArgs = {
  data: EventUpdateInput;
  where: EventWhereUniqueInput;
};


export type MutationUpdateOneFilledApplicationArgs = {
  data: FilledApplicationUpdateInput;
  where: FilledApplicationWhereUniqueInput;
};


export type MutationUpdateOneOfficerArgs = {
  data: OfficerUpdateInput;
  where: OfficerWhereUniqueInput;
};


export type MutationUpdateOneTypeformApplicationArgs = {
  data: TypeformApplicationUpdateInput;
  where: TypeformApplicationWhereUniqueInput;
};


export type MutationUpsertOneProfileArgs = {
  create: ProfileCreateInput;
  update: ProfileUpdateInput;
  where: ProfileWhereUniqueInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  in?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  lt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  lte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  in?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  isSet?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  lte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isSet?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isSet?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTimeISO']['input']>;
  unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
  unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
  unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Officer = {
  __typename?: 'Officer';
  _count?: Maybe<OfficerCount>;
  director?: Maybe<Director>;
  divisionIds: Array<Scalars['String']['output']>;
  divisions: Array<Division>;
  dummy?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  profile: Profile;
  profileId: Scalars['String']['output'];
};


export type OfficerDirectorArgs = {
  where?: InputMaybe<DirectorWhereInput>;
};


export type OfficerDivisionsArgs = {
  cursor?: InputMaybe<DivisionWhereUniqueInput>;
  distinct?: InputMaybe<Array<DivisionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DivisionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DivisionWhereInput>;
};

export type OfficerCount = {
  __typename?: 'OfficerCount';
  divisions: Scalars['Int']['output'];
};


export type OfficerCountDivisionsArgs = {
  where?: InputMaybe<DivisionWhereInput>;
};

export type OfficerCreateNestedManyWithoutDivisionsInput = {
  connect?: InputMaybe<Array<OfficerWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OfficerCreateOrConnectWithoutDivisionsInput>>;
  create?: InputMaybe<Array<OfficerCreateWithoutDivisionsInput>>;
};

export type OfficerCreateNestedOneWithoutDirectorInput = {
  connect?: InputMaybe<OfficerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OfficerCreateOrConnectWithoutDirectorInput>;
  create?: InputMaybe<OfficerCreateWithoutDirectorInput>;
};

export type OfficerCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<OfficerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OfficerCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<OfficerCreateWithoutProfileInput>;
};

export type OfficerCreateOrConnectWithoutDirectorInput = {
  create: OfficerCreateWithoutDirectorInput;
  where: OfficerWhereUniqueInput;
};

export type OfficerCreateOrConnectWithoutDivisionsInput = {
  create: OfficerCreateWithoutDivisionsInput;
  where: OfficerWhereUniqueInput;
};

export type OfficerCreateOrConnectWithoutProfileInput = {
  create: OfficerCreateWithoutProfileInput;
  where: OfficerWhereUniqueInput;
};

export type OfficerCreateWithoutDirectorInput = {
  divisions?: InputMaybe<DivisionCreateNestedManyWithoutOfficersInput>;
  dummy?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  profile: ProfileCreateNestedOneWithoutOfficerInput;
};

export type OfficerCreateWithoutDivisionsInput = {
  director?: InputMaybe<DirectorCreateNestedOneWithoutOfficerInput>;
  dummy?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  profile: ProfileCreateNestedOneWithoutOfficerInput;
};

export type OfficerCreateWithoutProfileInput = {
  director?: InputMaybe<DirectorCreateNestedOneWithoutOfficerInput>;
  divisions?: InputMaybe<DivisionCreateNestedManyWithoutOfficersInput>;
  dummy?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type OfficerListRelationFilter = {
  every?: InputMaybe<OfficerWhereInput>;
  none?: InputMaybe<OfficerWhereInput>;
  some?: InputMaybe<OfficerWhereInput>;
};

export type OfficerNullableRelationFilter = {
  is?: InputMaybe<OfficerWhereInput>;
  isNot?: InputMaybe<OfficerWhereInput>;
};

export type OfficerOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type OfficerOrderByWithRelationInput = {
  director?: InputMaybe<DirectorOrderByWithRelationInput>;
  divisionIds?: InputMaybe<SortOrder>;
  divisions?: InputMaybe<DivisionOrderByRelationAggregateInput>;
  dummy?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
};

export type OfficerScalarWhereInput = {
  AND?: InputMaybe<Array<OfficerScalarWhereInput>>;
  NOT?: InputMaybe<Array<OfficerScalarWhereInput>>;
  OR?: InputMaybe<Array<OfficerScalarWhereInput>>;
  divisionIds?: InputMaybe<StringNullableListFilter>;
  dummy?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  profileId?: InputMaybe<StringFilter>;
};

export type OfficerUpdateInput = {
  director?: InputMaybe<DirectorUpdateOneWithoutOfficerNestedInput>;
  divisions?: InputMaybe<DivisionUpdateManyWithoutOfficersNestedInput>;
  dummy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  profile?: InputMaybe<ProfileUpdateOneRequiredWithoutOfficerNestedInput>;
};

export type OfficerUpdateManyMutationInput = {
  dummy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type OfficerUpdateManyWithWhereWithoutDivisionsInput = {
  data: OfficerUpdateManyMutationInput;
  where: OfficerScalarWhereInput;
};

export type OfficerUpdateManyWithoutDivisionsNestedInput = {
  connect?: InputMaybe<Array<OfficerWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OfficerCreateOrConnectWithoutDivisionsInput>>;
  create?: InputMaybe<Array<OfficerCreateWithoutDivisionsInput>>;
  delete?: InputMaybe<Array<OfficerWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OfficerScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OfficerWhereUniqueInput>>;
  set?: InputMaybe<Array<OfficerWhereUniqueInput>>;
  update?: InputMaybe<Array<OfficerUpdateWithWhereUniqueWithoutDivisionsInput>>;
  updateMany?: InputMaybe<Array<OfficerUpdateManyWithWhereWithoutDivisionsInput>>;
  upsert?: InputMaybe<Array<OfficerUpsertWithWhereUniqueWithoutDivisionsInput>>;
};

export type OfficerUpdateOneWithoutDirectorNestedInput = {
  connect?: InputMaybe<OfficerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OfficerCreateOrConnectWithoutDirectorInput>;
  create?: InputMaybe<OfficerCreateWithoutDirectorInput>;
  delete?: InputMaybe<OfficerWhereInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<OfficerUpdateToOneWithWhereWithoutDirectorInput>;
  upsert?: InputMaybe<OfficerUpsertWithoutDirectorInput>;
};

export type OfficerUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<OfficerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OfficerCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<OfficerCreateWithoutProfileInput>;
  delete?: InputMaybe<OfficerWhereInput>;
  disconnect?: InputMaybe<OfficerWhereInput>;
  update?: InputMaybe<OfficerUpdateToOneWithWhereWithoutProfileInput>;
  upsert?: InputMaybe<OfficerUpsertWithoutProfileInput>;
};

export type OfficerUpdateToOneWithWhereWithoutDirectorInput = {
  data: OfficerUpdateWithoutDirectorInput;
  where?: InputMaybe<OfficerWhereInput>;
};

export type OfficerUpdateToOneWithWhereWithoutProfileInput = {
  data: OfficerUpdateWithoutProfileInput;
  where?: InputMaybe<OfficerWhereInput>;
};

export type OfficerUpdateWithWhereUniqueWithoutDivisionsInput = {
  data: OfficerUpdateWithoutDivisionsInput;
  where: OfficerWhereUniqueInput;
};

export type OfficerUpdateWithoutDirectorInput = {
  divisions?: InputMaybe<DivisionUpdateManyWithoutOfficersNestedInput>;
  dummy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  profile?: InputMaybe<ProfileUpdateOneRequiredWithoutOfficerNestedInput>;
};

export type OfficerUpdateWithoutDivisionsInput = {
  director?: InputMaybe<DirectorUpdateOneWithoutOfficerNestedInput>;
  dummy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  profile?: InputMaybe<ProfileUpdateOneRequiredWithoutOfficerNestedInput>;
};

export type OfficerUpdateWithoutProfileInput = {
  director?: InputMaybe<DirectorUpdateOneWithoutOfficerNestedInput>;
  divisions?: InputMaybe<DivisionUpdateManyWithoutOfficersNestedInput>;
  dummy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type OfficerUpsertWithWhereUniqueWithoutDivisionsInput = {
  create: OfficerCreateWithoutDivisionsInput;
  update: OfficerUpdateWithoutDivisionsInput;
  where: OfficerWhereUniqueInput;
};

export type OfficerUpsertWithoutDirectorInput = {
  create: OfficerCreateWithoutDirectorInput;
  update: OfficerUpdateWithoutDirectorInput;
  where?: InputMaybe<OfficerWhereInput>;
};

export type OfficerUpsertWithoutProfileInput = {
  create: OfficerCreateWithoutProfileInput;
  update: OfficerUpdateWithoutProfileInput;
  where?: InputMaybe<OfficerWhereInput>;
};

export type OfficerWhereInput = {
  AND?: InputMaybe<Array<OfficerWhereInput>>;
  NOT?: InputMaybe<Array<OfficerWhereInput>>;
  OR?: InputMaybe<Array<OfficerWhereInput>>;
  director?: InputMaybe<DirectorNullableRelationFilter>;
  divisionIds?: InputMaybe<StringNullableListFilter>;
  divisions?: InputMaybe<DivisionListRelationFilter>;
  dummy?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<StringFilter>;
};

export type OfficerWhereUniqueInput = {
  AND?: InputMaybe<Array<OfficerWhereInput>>;
  NOT?: InputMaybe<Array<OfficerWhereInput>>;
  OR?: InputMaybe<Array<OfficerWhereInput>>;
  director?: InputMaybe<DirectorNullableRelationFilter>;
  divisionIds?: InputMaybe<StringNullableListFilter>;
  divisions?: InputMaybe<DivisionListRelationFilter>;
  dummy?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<Scalars['String']['input']>;
};

export type Profile = {
  __typename?: 'Profile';
  _count?: Maybe<ProfileCount>;
  classStanding: Scalars['String']['output'];
  email: Scalars['String']['output'];
  events: Array<EventReservation>;
  fillApplications: Array<FilledApplication>;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  major: Scalars['String']['output'];
  membershipStatus: Scalars['Boolean']['output'];
  membershipTS?: Maybe<Scalars['DateTimeISO']['output']>;
  netid: Scalars['String']['output'];
  officer?: Maybe<Officer>;
  resume: Scalars['Boolean']['output'];
  resumeTS?: Maybe<Scalars['DateTimeISO']['output']>;
  roles: Array<Scalars['String']['output']>;
  typeformSubmissions: Array<TypeformSubmission>;
  user: User;
  userId: Scalars['String']['output'];
  utdStudent: Scalars['Boolean']['output'];
};


export type ProfileEventsArgs = {
  cursor?: InputMaybe<EventReservationWhereUniqueInput>;
  distinct?: InputMaybe<Array<EventReservationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EventReservationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventReservationWhereInput>;
};


export type ProfileFillApplicationsArgs = {
  cursor?: InputMaybe<FilledApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<FilledApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FilledApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FilledApplicationWhereInput>;
};


export type ProfileOfficerArgs = {
  where?: InputMaybe<OfficerWhereInput>;
};

export type ProfileCount = {
  __typename?: 'ProfileCount';
  events: Scalars['Int']['output'];
  fillApplications: Scalars['Int']['output'];
};


export type ProfileCountEventsArgs = {
  where?: InputMaybe<EventReservationWhereInput>;
};


export type ProfileCountFillApplicationsArgs = {
  where?: InputMaybe<FilledApplicationWhereInput>;
};

export type ProfileCreateInput = {
  classStanding: Scalars['String']['input'];
  email: Scalars['String']['input'];
  events?: InputMaybe<EventReservationCreateNestedManyWithoutProfileInput>;
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutProfileInput>;
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  major: Scalars['String']['input'];
  membershipStatus: Scalars['Boolean']['input'];
  membershipTS?: InputMaybe<Scalars['DateTimeISO']['input']>;
  netid: Scalars['String']['input'];
  officer?: InputMaybe<OfficerCreateNestedOneWithoutProfileInput>;
  resume: Scalars['Boolean']['input'];
  resumeTS?: InputMaybe<Scalars['DateTimeISO']['input']>;
  roles?: InputMaybe<ProfileCreaterolesInput>;
  user: UserCreateNestedOneWithoutProfileInput;
  utdStudent: Scalars['Boolean']['input'];
};

export type ProfileCreateNestedOneWithoutEventsInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutEventsInput>;
  create?: InputMaybe<ProfileCreateWithoutEventsInput>;
};

export type ProfileCreateNestedOneWithoutFillApplicationsInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutFillApplicationsInput>;
  create?: InputMaybe<ProfileCreateWithoutFillApplicationsInput>;
};

export type ProfileCreateNestedOneWithoutOfficerInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutOfficerInput>;
  create?: InputMaybe<ProfileCreateWithoutOfficerInput>;
};

export type ProfileCreateOrConnectWithoutEventsInput = {
  create: ProfileCreateWithoutEventsInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutFillApplicationsInput = {
  create: ProfileCreateWithoutFillApplicationsInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutOfficerInput = {
  create: ProfileCreateWithoutOfficerInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateWithoutEventsInput = {
  classStanding: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutProfileInput>;
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  major: Scalars['String']['input'];
  membershipStatus: Scalars['Boolean']['input'];
  membershipTS?: InputMaybe<Scalars['DateTimeISO']['input']>;
  netid: Scalars['String']['input'];
  officer?: InputMaybe<OfficerCreateNestedOneWithoutProfileInput>;
  resume: Scalars['Boolean']['input'];
  resumeTS?: InputMaybe<Scalars['DateTimeISO']['input']>;
  roles?: InputMaybe<ProfileCreaterolesInput>;
  user: UserCreateNestedOneWithoutProfileInput;
  utdStudent: Scalars['Boolean']['input'];
};

export type ProfileCreateWithoutFillApplicationsInput = {
  classStanding: Scalars['String']['input'];
  email: Scalars['String']['input'];
  events?: InputMaybe<EventReservationCreateNestedManyWithoutProfileInput>;
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  major: Scalars['String']['input'];
  membershipStatus: Scalars['Boolean']['input'];
  membershipTS?: InputMaybe<Scalars['DateTimeISO']['input']>;
  netid: Scalars['String']['input'];
  officer?: InputMaybe<OfficerCreateNestedOneWithoutProfileInput>;
  resume: Scalars['Boolean']['input'];
  resumeTS?: InputMaybe<Scalars['DateTimeISO']['input']>;
  roles?: InputMaybe<ProfileCreaterolesInput>;
  user: UserCreateNestedOneWithoutProfileInput;
  utdStudent: Scalars['Boolean']['input'];
};

export type ProfileCreateWithoutOfficerInput = {
  classStanding: Scalars['String']['input'];
  email: Scalars['String']['input'];
  events?: InputMaybe<EventReservationCreateNestedManyWithoutProfileInput>;
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutProfileInput>;
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  major: Scalars['String']['input'];
  membershipStatus: Scalars['Boolean']['input'];
  membershipTS?: InputMaybe<Scalars['DateTimeISO']['input']>;
  netid: Scalars['String']['input'];
  resume: Scalars['Boolean']['input'];
  resumeTS?: InputMaybe<Scalars['DateTimeISO']['input']>;
  roles?: InputMaybe<ProfileCreaterolesInput>;
  user: UserCreateNestedOneWithoutProfileInput;
  utdStudent: Scalars['Boolean']['input'];
};

export type ProfileCreaterolesInput = {
  set: Array<Scalars['String']['input']>;
};

export type ProfileNullableRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export type ProfileOrderByWithRelationInput = {
  classStanding?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  events?: InputMaybe<EventReservationOrderByRelationAggregateInput>;
  fillApplications?: InputMaybe<FilledApplicationOrderByRelationAggregateInput>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  major?: InputMaybe<SortOrder>;
  membershipStatus?: InputMaybe<SortOrder>;
  membershipTS?: InputMaybe<SortOrder>;
  netid?: InputMaybe<SortOrder>;
  officer?: InputMaybe<OfficerOrderByWithRelationInput>;
  resume?: InputMaybe<SortOrder>;
  resumeTS?: InputMaybe<SortOrder>;
  roles?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  utdStudent?: InputMaybe<SortOrder>;
};

export type ProfileRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export type ProfileUpdateInput = {
  classStanding?: InputMaybe<StringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  events?: InputMaybe<EventReservationUpdateManyWithoutProfileNestedInput>;
  fillApplications?: InputMaybe<FilledApplicationUpdateManyWithoutProfileNestedInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  major?: InputMaybe<StringFieldUpdateOperationsInput>;
  membershipStatus?: InputMaybe<BoolFieldUpdateOperationsInput>;
  membershipTS?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  netid?: InputMaybe<StringFieldUpdateOperationsInput>;
  officer?: InputMaybe<OfficerUpdateOneWithoutProfileNestedInput>;
  resume?: InputMaybe<BoolFieldUpdateOperationsInput>;
  resumeTS?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  roles?: InputMaybe<ProfileUpdaterolesInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutProfileNestedInput>;
  utdStudent?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ProfileUpdateOneRequiredWithoutEventsNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutEventsInput>;
  create?: InputMaybe<ProfileCreateWithoutEventsInput>;
  update?: InputMaybe<ProfileUpdateToOneWithWhereWithoutEventsInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutEventsInput>;
};

export type ProfileUpdateOneRequiredWithoutFillApplicationsNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutFillApplicationsInput>;
  create?: InputMaybe<ProfileCreateWithoutFillApplicationsInput>;
  update?: InputMaybe<ProfileUpdateToOneWithWhereWithoutFillApplicationsInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutFillApplicationsInput>;
};

export type ProfileUpdateOneRequiredWithoutOfficerNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutOfficerInput>;
  create?: InputMaybe<ProfileCreateWithoutOfficerInput>;
  update?: InputMaybe<ProfileUpdateToOneWithWhereWithoutOfficerInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutOfficerInput>;
};

export type ProfileUpdateToOneWithWhereWithoutEventsInput = {
  data: ProfileUpdateWithoutEventsInput;
  where?: InputMaybe<ProfileWhereInput>;
};

export type ProfileUpdateToOneWithWhereWithoutFillApplicationsInput = {
  data: ProfileUpdateWithoutFillApplicationsInput;
  where?: InputMaybe<ProfileWhereInput>;
};

export type ProfileUpdateToOneWithWhereWithoutOfficerInput = {
  data: ProfileUpdateWithoutOfficerInput;
  where?: InputMaybe<ProfileWhereInput>;
};

export type ProfileUpdateWithoutEventsInput = {
  classStanding?: InputMaybe<StringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  fillApplications?: InputMaybe<FilledApplicationUpdateManyWithoutProfileNestedInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  major?: InputMaybe<StringFieldUpdateOperationsInput>;
  membershipStatus?: InputMaybe<BoolFieldUpdateOperationsInput>;
  membershipTS?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  netid?: InputMaybe<StringFieldUpdateOperationsInput>;
  officer?: InputMaybe<OfficerUpdateOneWithoutProfileNestedInput>;
  resume?: InputMaybe<BoolFieldUpdateOperationsInput>;
  resumeTS?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  roles?: InputMaybe<ProfileUpdaterolesInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutProfileNestedInput>;
  utdStudent?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ProfileUpdateWithoutFillApplicationsInput = {
  classStanding?: InputMaybe<StringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  events?: InputMaybe<EventReservationUpdateManyWithoutProfileNestedInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  major?: InputMaybe<StringFieldUpdateOperationsInput>;
  membershipStatus?: InputMaybe<BoolFieldUpdateOperationsInput>;
  membershipTS?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  netid?: InputMaybe<StringFieldUpdateOperationsInput>;
  officer?: InputMaybe<OfficerUpdateOneWithoutProfileNestedInput>;
  resume?: InputMaybe<BoolFieldUpdateOperationsInput>;
  resumeTS?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  roles?: InputMaybe<ProfileUpdaterolesInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutProfileNestedInput>;
  utdStudent?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ProfileUpdateWithoutOfficerInput = {
  classStanding?: InputMaybe<StringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  events?: InputMaybe<EventReservationUpdateManyWithoutProfileNestedInput>;
  fillApplications?: InputMaybe<FilledApplicationUpdateManyWithoutProfileNestedInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  major?: InputMaybe<StringFieldUpdateOperationsInput>;
  membershipStatus?: InputMaybe<BoolFieldUpdateOperationsInput>;
  membershipTS?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  netid?: InputMaybe<StringFieldUpdateOperationsInput>;
  resume?: InputMaybe<BoolFieldUpdateOperationsInput>;
  resumeTS?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  roles?: InputMaybe<ProfileUpdaterolesInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutProfileNestedInput>;
  utdStudent?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ProfileUpdaterolesInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ProfileUpsertWithoutEventsInput = {
  create: ProfileCreateWithoutEventsInput;
  update: ProfileUpdateWithoutEventsInput;
  where?: InputMaybe<ProfileWhereInput>;
};

export type ProfileUpsertWithoutFillApplicationsInput = {
  create: ProfileCreateWithoutFillApplicationsInput;
  update: ProfileUpdateWithoutFillApplicationsInput;
  where?: InputMaybe<ProfileWhereInput>;
};

export type ProfileUpsertWithoutOfficerInput = {
  create: ProfileCreateWithoutOfficerInput;
  update: ProfileUpdateWithoutOfficerInput;
  where?: InputMaybe<ProfileWhereInput>;
};

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  classStanding?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  events?: InputMaybe<EventReservationListRelationFilter>;
  fillApplications?: InputMaybe<FilledApplicationListRelationFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  lastName?: InputMaybe<StringFilter>;
  major?: InputMaybe<StringFilter>;
  membershipStatus?: InputMaybe<BoolFilter>;
  membershipTS?: InputMaybe<DateTimeNullableFilter>;
  netid?: InputMaybe<StringFilter>;
  officer?: InputMaybe<OfficerNullableRelationFilter>;
  resume?: InputMaybe<BoolFilter>;
  resumeTS?: InputMaybe<DateTimeNullableFilter>;
  roles?: InputMaybe<StringNullableListFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
  utdStudent?: InputMaybe<BoolFilter>;
};

export type ProfileWhereUniqueInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  classStanding?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  events?: InputMaybe<EventReservationListRelationFilter>;
  fillApplications?: InputMaybe<FilledApplicationListRelationFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<StringFilter>;
  major?: InputMaybe<StringFilter>;
  membershipStatus?: InputMaybe<BoolFilter>;
  membershipTS?: InputMaybe<DateTimeNullableFilter>;
  netid?: InputMaybe<Scalars['String']['input']>;
  officer?: InputMaybe<OfficerNullableRelationFilter>;
  resume?: InputMaybe<BoolFilter>;
  resumeTS?: InputMaybe<DateTimeNullableFilter>;
  roles?: InputMaybe<StringNullableListFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<Scalars['String']['input']>;
  utdStudent?: InputMaybe<BoolFilter>;
};

export type Query = {
  __typename?: 'Query';
  application?: Maybe<Application>;
  applications: Array<Application>;
  divisions: Array<Division>;
  events: Array<Event>;
  filledApplications: Array<FilledApplication>;
  findFirstTypeformApplication?: Maybe<TypeformApplication>;
  getSpreadsheetOverviewDivisionsData: Array<SpreadsheetOverviewDivisionsType>;
  getSpreadsheetOverviewRevenueData: Array<SpreadsheetOverviewRevenueType>;
  me: User;
  officerEligibleProfiles: Array<Profile>;
  profile?: Maybe<Profile>;
  returnAllOpenApp: Array<Application>;
  typeformApplications: Array<TypeformApplication>;
  upcomingEvents: Array<Event>;
};


export type QueryApplicationArgs = {
  where: ApplicationWhereUniqueInput;
};


export type QueryApplicationsArgs = {
  cursor?: InputMaybe<ApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<ApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ApplicationWhereInput>;
};


export type QueryDivisionsArgs = {
  cursor?: InputMaybe<DivisionWhereUniqueInput>;
  distinct?: InputMaybe<Array<DivisionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DivisionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DivisionWhereInput>;
};


export type QueryEventsArgs = {
  cursor?: InputMaybe<EventWhereUniqueInput>;
  distinct?: InputMaybe<Array<EventScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryFilledApplicationsArgs = {
  cursor?: InputMaybe<FilledApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<FilledApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FilledApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FilledApplicationWhereInput>;
};


export type QueryFindFirstTypeformApplicationArgs = {
  cursor?: InputMaybe<TypeformApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<TypeformApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TypeformApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TypeformApplicationWhereInput>;
};


export type QueryProfileArgs = {
  where: ProfileWhereUniqueInput;
};


export type QueryTypeformApplicationsArgs = {
  cursor?: InputMaybe<TypeformApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<TypeformApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TypeformApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TypeformApplicationWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RoleCreateNestedOneWithoutRolesOnUserInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RoleCreateOrConnectWithoutRolesOnUserInput>;
  create?: InputMaybe<RoleCreateWithoutRolesOnUserInput>;
};

export type RoleCreateOrConnectWithoutRolesOnUserInput = {
  create: RoleCreateWithoutRolesOnUserInput;
  where: RoleWhereUniqueInput;
};

export type RoleCreateWithoutRolesOnUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  roleName: Scalars['String']['input'];
};

export type RoleOrderByWithRelationInput = {
  RolesOnUser?: InputMaybe<RolesOnUserOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  roleName?: InputMaybe<SortOrder>;
};

export type RoleRelationFilter = {
  is?: InputMaybe<RoleWhereInput>;
  isNot?: InputMaybe<RoleWhereInput>;
};

export type RoleUpdateOneRequiredWithoutRolesOnUserNestedInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RoleCreateOrConnectWithoutRolesOnUserInput>;
  create?: InputMaybe<RoleCreateWithoutRolesOnUserInput>;
  update?: InputMaybe<RoleUpdateToOneWithWhereWithoutRolesOnUserInput>;
  upsert?: InputMaybe<RoleUpsertWithoutRolesOnUserInput>;
};

export type RoleUpdateToOneWithWhereWithoutRolesOnUserInput = {
  data: RoleUpdateWithoutRolesOnUserInput;
  where?: InputMaybe<RoleWhereInput>;
};

export type RoleUpdateWithoutRolesOnUserInput = {
  roleName?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RoleUpsertWithoutRolesOnUserInput = {
  create: RoleCreateWithoutRolesOnUserInput;
  update: RoleUpdateWithoutRolesOnUserInput;
  where?: InputMaybe<RoleWhereInput>;
};

export type RoleWhereInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  RolesOnUser?: InputMaybe<RolesOnUserListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  roleName?: InputMaybe<StringFilter>;
};

export type RoleWhereUniqueInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  RolesOnUser?: InputMaybe<RolesOnUserListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  roleName?: InputMaybe<StringFilter>;
};

export type RolesOnUser = {
  __typename?: 'RolesOnUser';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  roleId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type RolesOnUserCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  roleId: Scalars['String']['input'];
};

export type RolesOnUserCreateManyUserInputEnvelope = {
  data: Array<RolesOnUserCreateManyUserInput>;
};

export type RolesOnUserCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<RolesOnUserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RolesOnUserCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RolesOnUserCreateWithoutUserInput>>;
  createMany?: InputMaybe<RolesOnUserCreateManyUserInputEnvelope>;
};

export type RolesOnUserCreateOrConnectWithoutUserInput = {
  create: RolesOnUserCreateWithoutUserInput;
  where: RolesOnUserWhereUniqueInput;
};

export type RolesOnUserCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  role: RoleCreateNestedOneWithoutRolesOnUserInput;
};

export type RolesOnUserListRelationFilter = {
  every?: InputMaybe<RolesOnUserWhereInput>;
  none?: InputMaybe<RolesOnUserWhereInput>;
  some?: InputMaybe<RolesOnUserWhereInput>;
};

export type RolesOnUserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RolesOnUserOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  role?: InputMaybe<RoleOrderByWithRelationInput>;
  roleId?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum RolesOnUserScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  RoleId = 'roleId',
  UserId = 'userId'
}

export type RolesOnUserScalarWhereInput = {
  AND?: InputMaybe<Array<RolesOnUserScalarWhereInput>>;
  NOT?: InputMaybe<Array<RolesOnUserScalarWhereInput>>;
  OR?: InputMaybe<Array<RolesOnUserScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  roleId?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RolesOnUserUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RolesOnUserUpdateManyWithWhereWithoutUserInput = {
  data: RolesOnUserUpdateManyMutationInput;
  where: RolesOnUserScalarWhereInput;
};

export type RolesOnUserUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<RolesOnUserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RolesOnUserCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RolesOnUserCreateWithoutUserInput>>;
  createMany?: InputMaybe<RolesOnUserCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<RolesOnUserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RolesOnUserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RolesOnUserWhereUniqueInput>>;
  set?: InputMaybe<Array<RolesOnUserWhereUniqueInput>>;
  update?: InputMaybe<Array<RolesOnUserUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<RolesOnUserUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<RolesOnUserUpsertWithWhereUniqueWithoutUserInput>>;
};

export type RolesOnUserUpdateWithWhereUniqueWithoutUserInput = {
  data: RolesOnUserUpdateWithoutUserInput;
  where: RolesOnUserWhereUniqueInput;
};

export type RolesOnUserUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<RoleUpdateOneRequiredWithoutRolesOnUserNestedInput>;
};

export type RolesOnUserUpsertWithWhereUniqueWithoutUserInput = {
  create: RolesOnUserCreateWithoutUserInput;
  update: RolesOnUserUpdateWithoutUserInput;
  where: RolesOnUserWhereUniqueInput;
};

export type RolesOnUserUserIdRoleIdCompoundUniqueInput = {
  roleId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type RolesOnUserWhereInput = {
  AND?: InputMaybe<Array<RolesOnUserWhereInput>>;
  NOT?: InputMaybe<Array<RolesOnUserWhereInput>>;
  OR?: InputMaybe<Array<RolesOnUserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  role?: InputMaybe<RoleRelationFilter>;
  roleId?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RolesOnUserWhereUniqueInput = {
  AND?: InputMaybe<Array<RolesOnUserWhereInput>>;
  NOT?: InputMaybe<Array<RolesOnUserWhereInput>>;
  OR?: InputMaybe<Array<RolesOnUserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleRelationFilter>;
  roleId?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
  userId_roleId?: InputMaybe<RolesOnUserUserIdRoleIdCompoundUniqueInput>;
};

export type Session = {
  __typename?: 'Session';
  expires: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  sessionToken: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type SessionCreateManyUserInput = {
  expires: Scalars['DateTimeISO']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  sessionToken: Scalars['String']['input'];
};

export type SessionCreateManyUserInputEnvelope = {
  data: Array<SessionCreateManyUserInput>;
};

export type SessionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<SessionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SessionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<SessionCreateWithoutUserInput>>;
  createMany?: InputMaybe<SessionCreateManyUserInputEnvelope>;
};

export type SessionCreateOrConnectWithoutUserInput = {
  create: SessionCreateWithoutUserInput;
  where: SessionWhereUniqueInput;
};

export type SessionCreateWithoutUserInput = {
  expires: Scalars['DateTimeISO']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  sessionToken: Scalars['String']['input'];
};

export type SessionListRelationFilter = {
  every?: InputMaybe<SessionWhereInput>;
  none?: InputMaybe<SessionWhereInput>;
  some?: InputMaybe<SessionWhereInput>;
};

export type SessionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SessionOrderByWithRelationInput = {
  expires?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  sessionToken?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum SessionScalarFieldEnum {
  Expires = 'expires',
  Id = 'id',
  SessionToken = 'sessionToken',
  UserId = 'userId'
}

export type SessionScalarWhereInput = {
  AND?: InputMaybe<Array<SessionScalarWhereInput>>;
  NOT?: InputMaybe<Array<SessionScalarWhereInput>>;
  OR?: InputMaybe<Array<SessionScalarWhereInput>>;
  expires?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  sessionToken?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type SessionUpdateManyMutationInput = {
  expires?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  sessionToken?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SessionUpdateManyWithWhereWithoutUserInput = {
  data: SessionUpdateManyMutationInput;
  where: SessionScalarWhereInput;
};

export type SessionUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<SessionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SessionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<SessionCreateWithoutUserInput>>;
  createMany?: InputMaybe<SessionCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<SessionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SessionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SessionWhereUniqueInput>>;
  set?: InputMaybe<Array<SessionWhereUniqueInput>>;
  update?: InputMaybe<Array<SessionUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<SessionUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<SessionUpsertWithWhereUniqueWithoutUserInput>>;
};

export type SessionUpdateWithWhereUniqueWithoutUserInput = {
  data: SessionUpdateWithoutUserInput;
  where: SessionWhereUniqueInput;
};

export type SessionUpdateWithoutUserInput = {
  expires?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  sessionToken?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SessionUpsertWithWhereUniqueWithoutUserInput = {
  create: SessionCreateWithoutUserInput;
  update: SessionUpdateWithoutUserInput;
  where: SessionWhereUniqueInput;
};

export type SessionWhereInput = {
  AND?: InputMaybe<Array<SessionWhereInput>>;
  NOT?: InputMaybe<Array<SessionWhereInput>>;
  OR?: InputMaybe<Array<SessionWhereInput>>;
  expires?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  sessionToken?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type SessionWhereUniqueInput = {
  AND?: InputMaybe<Array<SessionWhereInput>>;
  NOT?: InputMaybe<Array<SessionWhereInput>>;
  OR?: InputMaybe<Array<SessionWhereInput>>;
  expires?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  sessionToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type SignedUrl = {
  __typename?: 'SignedURL';
  action?: Maybe<Action>;
  fileType?: Maybe<FileCategory>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SignedUrlInput = {
  action?: InputMaybe<Action>;
  fileType?: InputMaybe<FileCategory>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SpreadsheetOverviewDivisionsType = {
  __typename?: 'SpreadsheetOverviewDivisionsType';
  actualBudget: Scalars['Float']['output'];
  difference?: Maybe<Scalars['Float']['output']>;
  divisionsName: Scalars['String']['output'];
  estimatedBudget: Scalars['Float']['output'];
  notes: Scalars['String']['output'];
};

export type SpreadsheetOverviewRevenueType = {
  __typename?: 'SpreadsheetOverviewRevenueType';
  budgetAmount: Scalars['Float']['output'];
  itemName: Scalars['String']['output'];
  notes: Scalars['String']['output'];
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isSet?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']['input']>>;
  has?: InputMaybe<Scalars['String']['input']>;
  hasEvery?: InputMaybe<Array<Scalars['String']['input']>>;
  hasSome?: InputMaybe<Array<Scalars['String']['input']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TypeformApplication = {
  __typename?: 'TypeformApplication';
  active: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  division: Scalars['String']['output'];
  endpoint: Scalars['String']['output'];
  externalResourceUrl: Scalars['String']['output'];
  id: Scalars['String']['output'];
  typeformId: Scalars['String']['output'];
  typeformName: Scalars['String']['output'];
};

export type TypeformApplicationCreateInput = {
  active: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  division: Scalars['String']['input'];
  endpoint: Scalars['String']['input'];
  externalResourceUrl: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  typeformId: Scalars['String']['input'];
  typeformName: Scalars['String']['input'];
};

export type TypeformApplicationOrderByWithRelationInput = {
  active?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  division?: InputMaybe<SortOrder>;
  endpoint?: InputMaybe<SortOrder>;
  externalResourceUrl?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  typeformId?: InputMaybe<SortOrder>;
  typeformName?: InputMaybe<SortOrder>;
};

export enum TypeformApplicationScalarFieldEnum {
  Active = 'active',
  Description = 'description',
  Division = 'division',
  Endpoint = 'endpoint',
  ExternalResourceUrl = 'externalResourceUrl',
  Id = 'id',
  TypeformId = 'typeformId',
  TypeformName = 'typeformName'
}

export type TypeformApplicationUpdateInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  division?: InputMaybe<StringFieldUpdateOperationsInput>;
  endpoint?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalResourceUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  typeformId?: InputMaybe<StringFieldUpdateOperationsInput>;
  typeformName?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TypeformApplicationWhereInput = {
  AND?: InputMaybe<Array<TypeformApplicationWhereInput>>;
  NOT?: InputMaybe<Array<TypeformApplicationWhereInput>>;
  OR?: InputMaybe<Array<TypeformApplicationWhereInput>>;
  active?: InputMaybe<BoolFilter>;
  description?: InputMaybe<StringFilter>;
  division?: InputMaybe<StringFilter>;
  endpoint?: InputMaybe<StringFilter>;
  externalResourceUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  typeformId?: InputMaybe<StringFilter>;
  typeformName?: InputMaybe<StringFilter>;
};

export type TypeformApplicationWhereUniqueInput = {
  AND?: InputMaybe<Array<TypeformApplicationWhereInput>>;
  NOT?: InputMaybe<Array<TypeformApplicationWhereInput>>;
  OR?: InputMaybe<Array<TypeformApplicationWhereInput>>;
  active?: InputMaybe<BoolFilter>;
  description?: InputMaybe<StringFilter>;
  division?: InputMaybe<StringFilter>;
  endpoint?: InputMaybe<StringFilter>;
  externalResourceUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  typeformId?: InputMaybe<StringFilter>;
  typeformName?: InputMaybe<StringFilter>;
};

export type TypeformSubmission = {
  __typename?: 'TypeformSubmission';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  typeformName: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  accounts: Array<Account>;
  attendedEvents: Array<Event>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isDirector: Scalars['Boolean']['output'];
  isMember: Scalars['Boolean']['output'];
  isOfficer: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  resumeFilename: Scalars['String']['output'];
  roles: Array<RolesOnUser>;
  sessions: Array<Session>;
};


export type UserAccountsArgs = {
  cursor?: InputMaybe<AccountWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccountScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccountOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountWhereInput>;
};


export type UserProfileArgs = {
  where?: InputMaybe<ProfileWhereInput>;
};


export type UserRolesArgs = {
  cursor?: InputMaybe<RolesOnUserWhereUniqueInput>;
  distinct?: InputMaybe<Array<RolesOnUserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RolesOnUserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RolesOnUserWhereInput>;
};


export type UserSessionsArgs = {
  cursor?: InputMaybe<SessionWhereUniqueInput>;
  distinct?: InputMaybe<Array<SessionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SessionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SessionWhereInput>;
};

export type UserCount = {
  __typename?: 'UserCount';
  accounts: Scalars['Int']['output'];
  roles: Scalars['Int']['output'];
  sessions: Scalars['Int']['output'];
};


export type UserCountAccountsArgs = {
  where?: InputMaybe<AccountWhereInput>;
};


export type UserCountRolesArgs = {
  where?: InputMaybe<RolesOnUserWhereInput>;
};


export type UserCountSessionsArgs = {
  where?: InputMaybe<SessionWhereInput>;
};

export type UserCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<UserCreateWithoutProfileInput>;
};

export type UserCreateOrConnectWithoutProfileInput = {
  create: UserCreateWithoutProfileInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutProfileInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['DateTimeISO']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<RolesOnUserCreateNestedManyWithoutUserInput>;
  sessions?: InputMaybe<SessionCreateNestedManyWithoutUserInput>;
};

export type UserOrderByWithRelationInput = {
  accounts?: InputMaybe<AccountOrderByRelationAggregateInput>;
  email?: InputMaybe<SortOrder>;
  emailVerified?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  roles?: InputMaybe<RolesOnUserOrderByRelationAggregateInput>;
  sessions?: InputMaybe<SessionOrderByRelationAggregateInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserUpdateOneRequiredWithoutProfileNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<UserCreateWithoutProfileInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutProfileInput>;
  upsert?: InputMaybe<UserUpsertWithoutProfileInput>;
};

export type UserUpdateToOneWithWhereWithoutProfileInput = {
  data: UserUpdateWithoutProfileInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateWithoutProfileInput = {
  accounts?: InputMaybe<AccountUpdateManyWithoutUserNestedInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  roles?: InputMaybe<RolesOnUserUpdateManyWithoutUserNestedInput>;
  sessions?: InputMaybe<SessionUpdateManyWithoutUserNestedInput>;
};

export type UserUpsertWithoutProfileInput = {
  create: UserCreateWithoutProfileInput;
  update: UserUpdateWithoutProfileInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  email?: InputMaybe<StringNullableFilter>;
  emailVerified?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  profile?: InputMaybe<ProfileNullableRelationFilter>;
  roles?: InputMaybe<RolesOnUserListRelationFilter>;
  sessions?: InputMaybe<SessionListRelationFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  profile?: InputMaybe<ProfileNullableRelationFilter>;
  roles?: InputMaybe<RolesOnUserListRelationFilter>;
  sessions?: InputMaybe<SessionListRelationFilter>;
};

export type VanityLink = {
  __typename?: 'VanityLink';
  id: Scalars['String']['output'];
  originalUrl: Scalars['String']['output'];
  slashtag: Scalars['String']['output'];
  vanityDomain: Scalars['String']['output'];
};

export type VanityLinkCreateInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  originalUrl: Scalars['String']['input'];
  slashtag: Scalars['String']['input'];
  vanityDomain: Scalars['String']['input'];
};

export type GetOfficerStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOfficerStatusQuery = { __typename?: 'Query', me: { __typename?: 'User', isOfficer: boolean, isDirector: boolean } };

export type GetApplicationDataQueryVariables = Exact<{
  where?: InputMaybe<TypeformApplicationWhereInput>;
}>;


export type GetApplicationDataQuery = { __typename?: 'Query', returnAllOpenApp: Array<{ __typename?: 'Application', id: string, name: string, externalResourceUrl: string, description: string, division: { __typename?: 'Division', deptName: string } }>, typeformApplications: Array<{ __typename?: 'TypeformApplication', id: string, active: boolean, description: string, typeformId: string, typeformName: string, division: string, externalResourceUrl: string }>, me: { __typename?: 'User', isOfficer: boolean, profile?: { __typename?: 'Profile', firstName: string, email: string, lastName: string, major: string, netid: string, classStanding: string, typeformSubmissions: Array<{ __typename?: 'TypeformSubmission', typeformName: string }> } | null } };

export type GetSingleApplicationDataQueryVariables = Exact<{
  where?: InputMaybe<ApplicationWhereInput>;
}>;


export type GetSingleApplicationDataQuery = { __typename?: 'Query', applications: Array<{ __typename?: 'Application', questions: Array<string>, name: string }> };

export type SubmitSingleApplicationMutationVariables = Exact<{
  data: FilledApplicationCreateInput;
}>;


export type SubmitSingleApplicationMutation = { __typename?: 'Mutation', createOneFilledApplication: { __typename?: 'FilledApplication', id: string } };

export type UpdateSingleApplicationMutationVariables = Exact<{
  where: FilledApplicationWhereUniqueInput;
  data: FilledApplicationUpdateInput;
}>;


export type UpdateSingleApplicationMutation = { __typename?: 'Mutation', updateOneFilledApplication?: { __typename?: 'FilledApplication', id: string } | null };

export type GetApplicationAdminPageDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApplicationAdminPageDataQuery = { __typename?: 'Query', me: { __typename?: 'User', profile?: { __typename?: 'Profile', officer?: { __typename?: 'Officer', divisionIds: Array<string> } | null } | null }, returnAllOpenApp: Array<{ __typename?: 'Application', id: string, name: string, externalResourceUrl: string, description: string, division: { __typename?: 'Division', id: string, deptName: string } }> };

export type CreateApplicationMutationVariables = Exact<{
  data: ApplicationCreateInput;
}>;


export type CreateApplicationMutation = { __typename?: 'Mutation', createOneApplication: { __typename?: 'Application', id: string } };

export type CheckInToEventMutationVariables = Exact<{
  checkInData: EventCheckinInput;
}>;


export type CheckInToEventMutation = { __typename?: 'Mutation', checkinToEvent: { __typename?: 'EventCheckin', profileId: string, eventId: string } };

export type GetCheckInPageUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCheckInPageUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', profile?: { __typename?: 'Profile', id: string } | null } };

export type GetDivisionDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDivisionDataQuery = { __typename?: 'Query', divisions: Array<{ __typename?: 'Division', deptName: string, id: string }> };

export type GetEventPageUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventPageUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', isOfficer: boolean, attendedEvents: Array<{ __typename?: 'Event', summary: string, start: any, location: string }> }, upcomingEvents: Array<{ __typename?: 'Event', id: string, summary: string, start: any, location: string, end: any, description: string, url: string, isPublic: boolean }> };

export type GetAdminEventDataQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<EventOrderByWithRelationInput> | EventOrderByWithRelationInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAdminEventDataQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: string, summary: string, location: string, url: string, description: string, isPublic: boolean, end: any, start: any }> };

export type UpdateEventDataMutationVariables = Exact<{
  data: EventUpdateInput;
  where: EventWhereUniqueInput;
}>;


export type UpdateEventDataMutation = { __typename?: 'Mutation', updateOneEvent?: { __typename?: 'Event', summary: string, description: string, url: string, location: string, start: any, end: any, id: string } | null };

export type DeleteEventMutationVariables = Exact<{
  where: EventWhereUniqueInput;
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteOneEvent?: { __typename?: 'Event', id: string } | null };

export type GetCreateEventPageUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCreateEventPageUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', isOfficer: boolean } };

export type CreateNewEventMutationVariables = Exact<{
  data: EventCreateInput;
}>;


export type CreateNewEventMutation = { __typename?: 'Mutation', createOneEvent: { __typename?: 'Event', id: string } };

export type MigrateEventMutationVariables = Exact<{
  email: Scalars['String']['input'];
  netId: Scalars['String']['input'];
}>;


export type MigrateEventMutation = { __typename?: 'Mutation', checkInOldEvent: Array<{ __typename?: 'EventCheckin', eventId: string, profileId: string }> };

export type FindFilledApplicationsQueryVariables = Exact<{
  whereApp: ApplicationWhereUniqueInput;
}>;


export type FindFilledApplicationsQuery = { __typename?: 'Query', me: { __typename?: 'User', isOfficer: boolean }, application?: { __typename?: 'Application', id: string, name: string, externalResourceUrl: string, description: string, questions: Array<string>, divisionId: string, division: { __typename?: 'Division', id: string, deptName: string }, fillApplications: Array<{ __typename?: 'FilledApplication', id: string, profileId: string, appId: string, responses: Array<string>, status: string, first: string, notes?: string | null, second: string, third: string, score?: number | null, interviewLink?: string | null, profile: { __typename?: 'Profile', id: string, firstName: string, lastName: string, netid: string, classStanding: string } }> } | null };

export type GetFinanceDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFinanceDataQuery = { __typename?: 'Query', getSpreadsheetOverviewDivisionsData: Array<{ __typename?: 'SpreadsheetOverviewDivisionsType', actualBudget: number, difference?: number | null, divisionsName: string, notes: string, estimatedBudget: number }>, getSpreadsheetOverviewRevenueData: Array<{ __typename?: 'SpreadsheetOverviewRevenueType', budgetAmount: number, notes: string, itemName: string }> };

export type GetHomePageUserInfoQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetHomePageUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', attendedEvents: Array<{ __typename?: 'Event', description: string, location: string, summary: string, start: any }> }, profile?: { __typename?: 'Profile', firstName: string, netid: string, email: string } | null };

export type GetAddOfficerPageDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddOfficerPageDataQuery = { __typename?: 'Query', me: { __typename?: 'User', profile?: { __typename?: 'Profile', officer?: { __typename?: 'Officer', divisions: Array<{ __typename?: 'Division', id: string, deptName: string }> } | null } | null }, officerEligibleProfiles: Array<{ __typename?: 'Profile', lastName: string, firstName: string, netid: string, id: string }> };

export type AddUserToDivisionMutationVariables = Exact<{
  data: OfficerUpdateInput;
  where: OfficerWhereUniqueInput;
}>;


export type AddUserToDivisionMutation = { __typename?: 'Mutation', updateOneOfficer?: { __typename?: 'Officer', profile: { __typename?: 'Profile', firstName: string, lastName: string, officer?: { __typename?: 'Officer', divisions: Array<{ __typename?: 'Division', deptName: string }> } | null } } | null };

export type UpsertProfileMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  create: ProfileCreateInput;
  update: ProfileUpdateInput;
}>;


export type UpsertProfileMutation = { __typename?: 'Mutation', upsertOneProfile: { __typename?: 'Profile', firstName: string, lastName: string, email: string, netid: string, classStanding: string, major: string, utdStudent: boolean } };

export type FindProfileQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type FindProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', firstName: string, lastName: string, email: string, netid: string, classStanding: string, major: string, utdStudent: boolean, user: { __typename?: 'User', isDirector: boolean, isOfficer: boolean, isMember: boolean }, officer?: { __typename?: 'Officer', divisions: Array<{ __typename?: 'Division', deptName: string }> } | null } | null };

export type GetResumeSignedUrlMutationVariables = Exact<{
  options: SignedUrlInput;
}>;


export type GetResumeSignedUrlMutation = { __typename?: 'Mutation', transferFile: { __typename?: 'SignedURL', url?: string | null } };

export type GetResumePageUserInfoQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetResumePageUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', resumeFilename: string }, profile?: { __typename?: 'Profile', firstName: string, netid: string } | null };

export type CreateTypeformApplicationMutationVariables = Exact<{
  data: TypeformApplicationCreateInput;
}>;


export type CreateTypeformApplicationMutation = { __typename?: 'Mutation', createOneTypeformApplication: { __typename?: 'TypeformApplication', id: string, active: boolean, description: string, endpoint: string, externalResourceUrl: string, typeformId: string, typeformName: string } };

export type GetTypeformApplicationsWithUserDataQueryVariables = Exact<{
  where?: InputMaybe<TypeformApplicationWhereInput>;
}>;


export type GetTypeformApplicationsWithUserDataQuery = { __typename?: 'Query', typeformApplications: Array<{ __typename?: 'TypeformApplication', id: string, active: boolean, description: string, typeformId: string, typeformName: string, division: string, externalResourceUrl: string }>, me: { __typename?: 'User', isOfficer: boolean, profile?: { __typename?: 'Profile', firstName: string, email: string, lastName: string, major: string, netid: string, classStanding: string } | null } };

export type FindTypeformApplicationQueryVariables = Exact<{
  where?: InputMaybe<TypeformApplicationWhereInput>;
}>;


export type FindTypeformApplicationQuery = { __typename?: 'Query', findFirstTypeformApplication?: { __typename?: 'TypeformApplication', id: string, typeformName: string, description: string, endpoint: string, externalResourceUrl: string, active: boolean, typeformId: string, division: string } | null };

export type UpdateTypeformApplicationMutationVariables = Exact<{
  data: TypeformApplicationUpdateInput;
  where: TypeformApplicationWhereUniqueInput;
}>;


export type UpdateTypeformApplicationMutation = { __typename?: 'Mutation', updateOneTypeformApplication?: { __typename?: 'TypeformApplication', id: string, active: boolean, description: string, endpoint: string, externalResourceUrl: string, typeformId: string, typeformName: string } | null };

export type DeleteTypeformApplicationMutationVariables = Exact<{
  where: TypeformApplicationWhereUniqueInput;
}>;


export type DeleteTypeformApplicationMutation = { __typename?: 'Mutation', deleteOneTypeformApplication?: { __typename?: 'TypeformApplication', id: string, typeformName: string, description: string } | null };

export type GetEditViewApplicationListQueryVariables = Exact<{
  where?: InputMaybe<TypeformApplicationWhereInput>;
}>;


export type GetEditViewApplicationListQuery = { __typename?: 'Query', typeformApplications: Array<{ __typename?: 'TypeformApplication', id: string, active: boolean, description: string, typeformId: string, typeformName: string, division: string }>, me: { __typename?: 'User', isOfficer: boolean } };

export type GetUserDataForWidgetViewQueryVariables = Exact<{
  where?: InputMaybe<TypeformApplicationWhereInput>;
}>;


export type GetUserDataForWidgetViewQuery = { __typename?: 'Query', me: { __typename?: 'User', profile?: { __typename?: 'Profile', email: string, firstName: string, lastName: string, major: string, netid: string, classStanding: string } | null }, findFirstTypeformApplication?: { __typename?: 'TypeformApplication', typeformId: string } | null };

export type GetUserOfficerStatusDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserOfficerStatusDataQuery = { __typename?: 'Query', me: { __typename?: 'User', isOfficer: boolean } };

export type CreateVanityLinkMutationVariables = Exact<{
  data: VanityLinkCreateInput;
}>;


export type CreateVanityLinkMutation = { __typename?: 'Mutation', createOneVanityLink: { __typename?: 'VanityLink', originalUrl: string, vanityDomain: string, slashtag: string } };


export const GetOfficerStatusDocument = gql`
    query getOfficerStatus {
  me {
    isOfficer
    isDirector
  }
}
    `;
export const GetApplicationDataDocument = gql`
    query getApplicationData($where: TypeformApplicationWhereInput) {
  returnAllOpenApp {
    id
    name
    division {
      deptName
    }
    externalResourceUrl
    description
  }
  typeformApplications(where: $where) {
    id
    active
    description
    typeformId
    typeformName
    division
    externalResourceUrl
  }
  me {
    isOfficer
    profile {
      firstName
      email
      lastName
      major
      netid
      classStanding
      typeformSubmissions {
        typeformName
      }
    }
  }
}
    `;
export const GetSingleApplicationDataDocument = gql`
    query getSingleApplicationData($where: ApplicationWhereInput) {
  applications(where: $where) {
    questions
    name
  }
}
    `;
export const SubmitSingleApplicationDocument = gql`
    mutation submitSingleApplication($data: FilledApplicationCreateInput!) {
  createOneFilledApplication(data: $data) {
    id
  }
}
    `;
export const UpdateSingleApplicationDocument = gql`
    mutation updateSingleApplication($where: FilledApplicationWhereUniqueInput!, $data: FilledApplicationUpdateInput!) {
  updateOneFilledApplication(where: $where, data: $data) {
    id
  }
}
    `;
export const GetApplicationAdminPageDataDocument = gql`
    query getApplicationAdminPageData {
  me {
    profile {
      officer {
        divisionIds
      }
    }
  }
  returnAllOpenApp {
    id
    name
    division {
      id
      deptName
    }
    externalResourceUrl
    description
  }
}
    `;
export const CreateApplicationDocument = gql`
    mutation createApplication($data: ApplicationCreateInput!) {
  createOneApplication(data: $data) {
    id
  }
}
    `;
export const CheckInToEventDocument = gql`
    mutation checkInToEvent($checkInData: EventCheckinInput!) {
  checkinToEvent(options: $checkInData) {
    profileId
    eventId
  }
}
    `;
export const GetCheckInPageUserInfoDocument = gql`
    query getCheckInPageUserInfo {
  me {
    profile {
      id
    }
  }
}
    `;
export const GetDivisionDataDocument = gql`
    query getDivisionData {
  divisions {
    deptName
    id
  }
}
    `;
export const GetEventPageUserInfoDocument = gql`
    query getEventPageUserInfo {
  me {
    attendedEvents {
      summary
      start
      location
    }
    isOfficer
  }
  upcomingEvents {
    id
    summary
    start
    location
    end
    description
    url
    isPublic
  }
}
    `;
export const GetAdminEventDataDocument = gql`
    query getAdminEventData($orderBy: [EventOrderByWithRelationInput!], $take: Int) {
  events(orderBy: $orderBy, take: $take) {
    id
    summary
    location
    url
    description
    isPublic
    end
    start
  }
}
    `;
export const UpdateEventDataDocument = gql`
    mutation updateEventData($data: EventUpdateInput!, $where: EventWhereUniqueInput!) {
  updateOneEvent(data: $data, where: $where) {
    summary
    description
    url
    location
    start
    end
    id
  }
}
    `;
export const DeleteEventDocument = gql`
    mutation deleteEvent($where: EventWhereUniqueInput!) {
  deleteOneEvent(where: $where) {
    id
  }
}
    `;
export const GetCreateEventPageUserInfoDocument = gql`
    query getCreateEventPageUserInfo {
  me {
    isOfficer
  }
}
    `;
export const CreateNewEventDocument = gql`
    mutation createNewEvent($data: EventCreateInput!) {
  createOneEvent(data: $data) {
    id
  }
}
    `;
export const MigrateEventDocument = gql`
    mutation migrateEvent($email: String!, $netId: String!) {
  checkInOldEvent(email: $email, netID: $netId) {
    eventId
    profileId
  }
}
    `;
export const FindFilledApplicationsDocument = gql`
    query findFilledApplications($whereApp: ApplicationWhereUniqueInput!) {
  me {
    isOfficer
  }
  application(where: $whereApp) {
    id
    name
    externalResourceUrl
    description
    questions
    divisionId
    division {
      id
      deptName
    }
    fillApplications {
      id
      profileId
      profile {
        id
        firstName
        lastName
        netid
        classStanding
      }
      appId
      responses
      status
      first
      notes
      second
      third
      score
      interviewLink
    }
  }
}
    `;
export const GetFinanceDataDocument = gql`
    query getFinanceData {
  getSpreadsheetOverviewDivisionsData {
    actualBudget
    difference
    divisionsName
    notes
    estimatedBudget
  }
  getSpreadsheetOverviewRevenueData {
    budgetAmount
    notes
    itemName
  }
}
    `;
export const GetHomePageUserInfoDocument = gql`
    query getHomePageUserInfo($where: ProfileWhereUniqueInput!) {
  me {
    attendedEvents {
      description
      location
      summary
      start
    }
  }
  profile(where: $where) {
    firstName
    netid
    email
  }
}
    `;
export const GetAddOfficerPageDataDocument = gql`
    query getAddOfficerPageData {
  me {
    profile {
      officer {
        divisions {
          id
          deptName
        }
      }
    }
  }
  officerEligibleProfiles {
    lastName
    firstName
    netid
    id
  }
}
    `;
export const AddUserToDivisionDocument = gql`
    mutation addUserToDivision($data: OfficerUpdateInput!, $where: OfficerWhereUniqueInput!) {
  updateOneOfficer(data: $data, where: $where) {
    profile {
      firstName
      lastName
      officer {
        divisions {
          deptName
        }
      }
    }
  }
}
    `;
export const UpsertProfileDocument = gql`
    mutation upsertProfile($where: ProfileWhereUniqueInput!, $create: ProfileCreateInput!, $update: ProfileUpdateInput!) {
  upsertOneProfile(where: $where, create: $create, update: $update) {
    firstName
    lastName
    email
    netid
    classStanding
    major
    utdStudent
  }
}
    `;
export const FindProfileDocument = gql`
    query findProfile($where: ProfileWhereUniqueInput!) {
  profile(where: $where) {
    firstName
    lastName
    email
    netid
    classStanding
    major
    utdStudent
    user {
      isDirector
      isOfficer
      isMember
    }
    officer {
      divisions {
        deptName
      }
    }
  }
}
    `;
export const GetResumeSignedUrlDocument = gql`
    mutation getResumeSignedURL($options: SignedURLInput!) {
  transferFile(options: $options) {
    url
  }
}
    `;
export const GetResumePageUserInfoDocument = gql`
    query getResumePageUserInfo($where: ProfileWhereUniqueInput!) {
  me {
    resumeFilename
  }
  profile(where: $where) {
    firstName
    netid
  }
}
    `;
export const CreateTypeformApplicationDocument = gql`
    mutation createTypeformApplication($data: TypeformApplicationCreateInput!) {
  createOneTypeformApplication(data: $data) {
    id
    active
    description
    endpoint
    externalResourceUrl
    typeformId
    typeformName
  }
}
    `;
export const GetTypeformApplicationsWithUserDataDocument = gql`
    query getTypeformApplicationsWithUserData($where: TypeformApplicationWhereInput) {
  typeformApplications(where: $where) {
    id
    active
    description
    typeformId
    typeformName
    division
    externalResourceUrl
  }
  me {
    isOfficer
    profile {
      firstName
      email
      lastName
      major
      netid
      classStanding
    }
  }
}
    `;
export const FindTypeformApplicationDocument = gql`
    query findTypeformApplication($where: TypeformApplicationWhereInput) {
  findFirstTypeformApplication(where: $where) {
    id
    typeformName
    description
    endpoint
    externalResourceUrl
    active
    typeformId
    division
  }
}
    `;
export const UpdateTypeformApplicationDocument = gql`
    mutation updateTypeformApplication($data: TypeformApplicationUpdateInput!, $where: TypeformApplicationWhereUniqueInput!) {
  updateOneTypeformApplication(data: $data, where: $where) {
    id
    active
    description
    endpoint
    externalResourceUrl
    typeformId
    typeformName
  }
}
    `;
export const DeleteTypeformApplicationDocument = gql`
    mutation deleteTypeformApplication($where: TypeformApplicationWhereUniqueInput!) {
  deleteOneTypeformApplication(where: $where) {
    id
    typeformName
    description
  }
}
    `;
export const GetEditViewApplicationListDocument = gql`
    query getEditViewApplicationList($where: TypeformApplicationWhereInput) {
  typeformApplications(where: $where) {
    id
    active
    description
    typeformId
    typeformName
    division
  }
  me {
    isOfficer
  }
}
    `;
export const GetUserDataForWidgetViewDocument = gql`
    query getUserDataForWidgetView($where: TypeformApplicationWhereInput) {
  me {
    profile {
      email
      firstName
      lastName
      major
      netid
      classStanding
    }
  }
  findFirstTypeformApplication(where: $where) {
    typeformId
  }
}
    `;
export const GetUserOfficerStatusDataDocument = gql`
    query getUserOfficerStatusData {
  me {
    isOfficer
  }
}
    `;
export const CreateVanityLinkDocument = gql`
    mutation createVanityLink($data: VanityLinkCreateInput!) {
  createOneVanityLink(data: $data) {
    originalUrl
    vanityDomain
    slashtag
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getOfficerStatus(variables?: GetOfficerStatusQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetOfficerStatusQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOfficerStatusQuery>(GetOfficerStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOfficerStatus', 'query', variables);
    },
    getApplicationData(variables?: GetApplicationDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetApplicationDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetApplicationDataQuery>(GetApplicationDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getApplicationData', 'query', variables);
    },
    getSingleApplicationData(variables?: GetSingleApplicationDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSingleApplicationDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSingleApplicationDataQuery>(GetSingleApplicationDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSingleApplicationData', 'query', variables);
    },
    submitSingleApplication(variables: SubmitSingleApplicationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SubmitSingleApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubmitSingleApplicationMutation>(SubmitSingleApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'submitSingleApplication', 'mutation', variables);
    },
    updateSingleApplication(variables: UpdateSingleApplicationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateSingleApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateSingleApplicationMutation>(UpdateSingleApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateSingleApplication', 'mutation', variables);
    },
    getApplicationAdminPageData(variables?: GetApplicationAdminPageDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetApplicationAdminPageDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetApplicationAdminPageDataQuery>(GetApplicationAdminPageDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getApplicationAdminPageData', 'query', variables);
    },
    createApplication(variables: CreateApplicationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateApplicationMutation>(CreateApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createApplication', 'mutation', variables);
    },
    checkInToEvent(variables: CheckInToEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CheckInToEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckInToEventMutation>(CheckInToEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkInToEvent', 'mutation', variables);
    },
    getCheckInPageUserInfo(variables?: GetCheckInPageUserInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCheckInPageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCheckInPageUserInfoQuery>(GetCheckInPageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCheckInPageUserInfo', 'query', variables);
    },
    getDivisionData(variables?: GetDivisionDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDivisionDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDivisionDataQuery>(GetDivisionDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDivisionData', 'query', variables);
    },
    getEventPageUserInfo(variables?: GetEventPageUserInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetEventPageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventPageUserInfoQuery>(GetEventPageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEventPageUserInfo', 'query', variables);
    },
    getAdminEventData(variables?: GetAdminEventDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAdminEventDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAdminEventDataQuery>(GetAdminEventDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAdminEventData', 'query', variables);
    },
    updateEventData(variables: UpdateEventDataMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateEventDataMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEventDataMutation>(UpdateEventDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateEventData', 'mutation', variables);
    },
    deleteEvent(variables: DeleteEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEventMutation>(DeleteEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteEvent', 'mutation', variables);
    },
    getCreateEventPageUserInfo(variables?: GetCreateEventPageUserInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCreateEventPageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCreateEventPageUserInfoQuery>(GetCreateEventPageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCreateEventPageUserInfo', 'query', variables);
    },
    createNewEvent(variables: CreateNewEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateNewEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateNewEventMutation>(CreateNewEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createNewEvent', 'mutation', variables);
    },
    migrateEvent(variables: MigrateEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MigrateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<MigrateEventMutation>(MigrateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'migrateEvent', 'mutation', variables);
    },
    findFilledApplications(variables: FindFilledApplicationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindFilledApplicationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindFilledApplicationsQuery>(FindFilledApplicationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findFilledApplications', 'query', variables);
    },
    getFinanceData(variables?: GetFinanceDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetFinanceDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFinanceDataQuery>(GetFinanceDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFinanceData', 'query', variables);
    },
    getHomePageUserInfo(variables: GetHomePageUserInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetHomePageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHomePageUserInfoQuery>(GetHomePageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHomePageUserInfo', 'query', variables);
    },
    getAddOfficerPageData(variables?: GetAddOfficerPageDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAddOfficerPageDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAddOfficerPageDataQuery>(GetAddOfficerPageDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAddOfficerPageData', 'query', variables);
    },
    addUserToDivision(variables: AddUserToDivisionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddUserToDivisionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddUserToDivisionMutation>(AddUserToDivisionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addUserToDivision', 'mutation', variables);
    },
    upsertProfile(variables: UpsertProfileMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpsertProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertProfileMutation>(UpsertProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upsertProfile', 'mutation', variables);
    },
    findProfile(variables: FindProfileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindProfileQuery>(FindProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findProfile', 'query', variables);
    },
    getResumeSignedURL(variables: GetResumeSignedUrlMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetResumeSignedUrlMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetResumeSignedUrlMutation>(GetResumeSignedUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getResumeSignedURL', 'mutation', variables);
    },
    getResumePageUserInfo(variables: GetResumePageUserInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetResumePageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetResumePageUserInfoQuery>(GetResumePageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getResumePageUserInfo', 'query', variables);
    },
    createTypeformApplication(variables: CreateTypeformApplicationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateTypeformApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTypeformApplicationMutation>(CreateTypeformApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTypeformApplication', 'mutation', variables);
    },
    getTypeformApplicationsWithUserData(variables?: GetTypeformApplicationsWithUserDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTypeformApplicationsWithUserDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTypeformApplicationsWithUserDataQuery>(GetTypeformApplicationsWithUserDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTypeformApplicationsWithUserData', 'query', variables);
    },
    findTypeformApplication(variables?: FindTypeformApplicationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindTypeformApplicationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindTypeformApplicationQuery>(FindTypeformApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findTypeformApplication', 'query', variables);
    },
    updateTypeformApplication(variables: UpdateTypeformApplicationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateTypeformApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTypeformApplicationMutation>(UpdateTypeformApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTypeformApplication', 'mutation', variables);
    },
    deleteTypeformApplication(variables: DeleteTypeformApplicationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteTypeformApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTypeformApplicationMutation>(DeleteTypeformApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteTypeformApplication', 'mutation', variables);
    },
    getEditViewApplicationList(variables?: GetEditViewApplicationListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetEditViewApplicationListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEditViewApplicationListQuery>(GetEditViewApplicationListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEditViewApplicationList', 'query', variables);
    },
    getUserDataForWidgetView(variables?: GetUserDataForWidgetViewQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserDataForWidgetViewQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserDataForWidgetViewQuery>(GetUserDataForWidgetViewDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserDataForWidgetView', 'query', variables);
    },
    getUserOfficerStatusData(variables?: GetUserOfficerStatusDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserOfficerStatusDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserOfficerStatusDataQuery>(GetUserOfficerStatusDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserOfficerStatusData', 'query', variables);
    },
    createVanityLink(variables: CreateVanityLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateVanityLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateVanityLinkMutation>(CreateVanityLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createVanityLink', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;