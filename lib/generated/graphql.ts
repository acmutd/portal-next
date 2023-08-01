import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  access_token?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  id_token?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refresh_token?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  session_state?: Maybe<Scalars['String']>;
  token_type?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  userId: Scalars['String'];
};

export type AccountCreateInput = {
  access_token?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  id_token?: InputMaybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refresh_token?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  session_state?: InputMaybe<Scalars['String']>;
  token_type?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateManyUserInput = {
  access_token?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  id_token?: InputMaybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refresh_token?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  session_state?: InputMaybe<Scalars['String']>;
  token_type?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
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
  access_token?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  id_token?: InputMaybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refresh_token?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  session_state?: InputMaybe<Scalars['String']>;
  token_type?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
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
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
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

export type AccountUpdateInput = {
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
  user?: InputMaybe<UserUpdateOneRequiredWithoutAccountsNestedInput>;
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
  id?: InputMaybe<Scalars['String']>;
  provider_providerAccountId?: InputMaybe<AccountProviderProviderAccountIdCompoundUniqueInput>;
};

/** Indicate whether the SignedURL will be for uploading, downloading, or deleting. */
export enum Action {
  Delete = 'DELETE',
  Download = 'DOWNLOAD',
  Upload = 'UPLOAD'
}

export type Application = {
  __typename?: 'Application';
  _count?: Maybe<ApplicationCount>;
  createdAt: Scalars['DateTime'];
  divisionId: Scalars['String'];
  expireDate: Scalars['DateTime'];
  id: Scalars['String'];
  questions: Array<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ApplicationCount = {
  __typename?: 'ApplicationCount';
  fillApplications: Scalars['Int'];
};

export type ApplicationCreateInput = {
  createdAt: Scalars['DateTime'];
  division: DivisionCreateNestedOneWithoutApplicationsInput;
  expireDate: Scalars['DateTime'];
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutAppInput>;
  id?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<ApplicationCreatequestionsInput>;
  type?: InputMaybe<Scalars['String']>;
};

export type ApplicationCreateManyDivisionInput = {
  createdAt: Scalars['DateTime'];
  expireDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<ApplicationCreatequestionsInput>;
  type?: InputMaybe<Scalars['String']>;
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
  createdAt: Scalars['DateTime'];
  expireDate: Scalars['DateTime'];
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutAppInput>;
  id?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<ApplicationCreatequestionsInput>;
  type?: InputMaybe<Scalars['String']>;
};

export type ApplicationCreateWithoutFillApplicationsInput = {
  createdAt: Scalars['DateTime'];
  division: DivisionCreateNestedOneWithoutApplicationsInput;
  expireDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<ApplicationCreatequestionsInput>;
  type?: InputMaybe<Scalars['String']>;
};

export type ApplicationCreatequestionsInput = {
  set: Array<Scalars['String']>;
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
  division?: InputMaybe<DivisionOrderByWithRelationInput>;
  divisionId?: InputMaybe<SortOrder>;
  expireDate?: InputMaybe<SortOrder>;
  fillApplications?: InputMaybe<FilledApplicationOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  questions?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
};

export type ApplicationRelationFilter = {
  is?: InputMaybe<ApplicationWhereInput>;
  isNot?: InputMaybe<ApplicationWhereInput>;
};

export enum ApplicationScalarFieldEnum {
  CreatedAt = 'createdAt',
  DivisionId = 'divisionId',
  ExpireDate = 'expireDate',
  Id = 'id',
  Questions = 'questions',
  Type = 'type'
}

export type ApplicationScalarWhereInput = {
  AND?: InputMaybe<Array<ApplicationScalarWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationScalarWhereInput>>;
  OR?: InputMaybe<Array<ApplicationScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  divisionId?: InputMaybe<StringFilter>;
  expireDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  questions?: InputMaybe<StringNullableListFilter>;
  type?: InputMaybe<StringNullableFilter>;
};

export type ApplicationUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  division?: InputMaybe<DivisionUpdateOneRequiredWithoutApplicationsNestedInput>;
  expireDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fillApplications?: InputMaybe<FilledApplicationUpdateManyWithoutAppNestedInput>;
  questions?: InputMaybe<ApplicationUpdatequestionsInput>;
  type?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ApplicationUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expireDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  questions?: InputMaybe<ApplicationUpdatequestionsInput>;
  type?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
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
  update?: InputMaybe<ApplicationUpdateWithoutFillApplicationsInput>;
  upsert?: InputMaybe<ApplicationUpsertWithoutFillApplicationsInput>;
};

export type ApplicationUpdateWithWhereUniqueWithoutDivisionInput = {
  data: ApplicationUpdateWithoutDivisionInput;
  where: ApplicationWhereUniqueInput;
};

export type ApplicationUpdateWithoutDivisionInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expireDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fillApplications?: InputMaybe<FilledApplicationUpdateManyWithoutAppNestedInput>;
  questions?: InputMaybe<ApplicationUpdatequestionsInput>;
  type?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ApplicationUpdateWithoutFillApplicationsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  division?: InputMaybe<DivisionUpdateOneRequiredWithoutApplicationsNestedInput>;
  expireDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  questions?: InputMaybe<ApplicationUpdatequestionsInput>;
  type?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ApplicationUpdatequestionsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ApplicationUpsertWithWhereUniqueWithoutDivisionInput = {
  create: ApplicationCreateWithoutDivisionInput;
  update: ApplicationUpdateWithoutDivisionInput;
  where: ApplicationWhereUniqueInput;
};

export type ApplicationUpsertWithoutFillApplicationsInput = {
  create: ApplicationCreateWithoutFillApplicationsInput;
  update: ApplicationUpdateWithoutFillApplicationsInput;
};

export type ApplicationWhereInput = {
  AND?: InputMaybe<Array<ApplicationWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationWhereInput>>;
  OR?: InputMaybe<Array<ApplicationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  division?: InputMaybe<DivisionRelationFilter>;
  divisionId?: InputMaybe<StringFilter>;
  expireDate?: InputMaybe<DateTimeFilter>;
  fillApplications?: InputMaybe<FilledApplicationListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  questions?: InputMaybe<StringNullableListFilter>;
  type?: InputMaybe<StringNullableFilter>;
};

export type ApplicationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  isSet?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
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

export type DivisionCreateOrConnectWithoutOfficersInput = {
  create: DivisionCreateWithoutOfficersInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionCreateWithoutApplicationsInput = {
  deptName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  officerIds?: InputMaybe<DivisionCreateofficerIdsInput>;
  officers?: InputMaybe<OfficerCreateNestedManyWithoutDivisionsInput>;
};

export type DivisionCreateWithoutOfficersInput = {
  applications?: InputMaybe<ApplicationCreateNestedManyWithoutDivisionInput>;
  deptName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  officerIds?: InputMaybe<DivisionCreateofficerIdsInput>;
};

export type DivisionCreateofficerIdsInput = {
  set: Array<Scalars['String']>;
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
  id?: InputMaybe<SortOrder>;
  officerIds?: InputMaybe<SortOrder>;
  officers?: InputMaybe<OfficerOrderByRelationAggregateInput>;
};

export type DivisionRelationFilter = {
  is?: InputMaybe<DivisionWhereInput>;
  isNot?: InputMaybe<DivisionWhereInput>;
};

export type DivisionScalarWhereInput = {
  AND?: InputMaybe<Array<DivisionScalarWhereInput>>;
  NOT?: InputMaybe<Array<DivisionScalarWhereInput>>;
  OR?: InputMaybe<Array<DivisionScalarWhereInput>>;
  deptName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  officerIds?: InputMaybe<StringNullableListFilter>;
};

export type DivisionUpdateManyMutationInput = {
  deptName?: InputMaybe<StringFieldUpdateOperationsInput>;
  officerIds?: InputMaybe<DivisionUpdateofficerIdsInput>;
};

export type DivisionUpdateManyWithWhereWithoutOfficersInput = {
  data: DivisionUpdateManyMutationInput;
  where: DivisionScalarWhereInput;
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
  update?: InputMaybe<DivisionUpdateWithoutApplicationsInput>;
  upsert?: InputMaybe<DivisionUpsertWithoutApplicationsInput>;
};

export type DivisionUpdateWithWhereUniqueWithoutOfficersInput = {
  data: DivisionUpdateWithoutOfficersInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionUpdateWithoutApplicationsInput = {
  deptName?: InputMaybe<StringFieldUpdateOperationsInput>;
  officerIds?: InputMaybe<DivisionUpdateofficerIdsInput>;
  officers?: InputMaybe<OfficerUpdateManyWithoutDivisionsNestedInput>;
};

export type DivisionUpdateWithoutOfficersInput = {
  applications?: InputMaybe<ApplicationUpdateManyWithoutDivisionNestedInput>;
  deptName?: InputMaybe<StringFieldUpdateOperationsInput>;
  officerIds?: InputMaybe<DivisionUpdateofficerIdsInput>;
};

export type DivisionUpdateofficerIdsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type DivisionUpsertWithWhereUniqueWithoutOfficersInput = {
  create: DivisionCreateWithoutOfficersInput;
  update: DivisionUpdateWithoutOfficersInput;
  where: DivisionWhereUniqueInput;
};

export type DivisionUpsertWithoutApplicationsInput = {
  create: DivisionCreateWithoutApplicationsInput;
  update: DivisionUpdateWithoutApplicationsInput;
};

export type DivisionWhereInput = {
  AND?: InputMaybe<Array<DivisionWhereInput>>;
  NOT?: InputMaybe<Array<DivisionWhereInput>>;
  OR?: InputMaybe<Array<DivisionWhereInput>>;
  applications?: InputMaybe<ApplicationListRelationFilter>;
  deptName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  officerIds?: InputMaybe<StringNullableListFilter>;
  officers?: InputMaybe<OfficerListRelationFilter>;
};

export type DivisionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  _count?: Maybe<EventCount>;
  description: Scalars['String'];
  end: Scalars['DateTime'];
  id: Scalars['String'];
  isPublic: Scalars['Boolean'];
  location: Scalars['String'];
  start: Scalars['DateTime'];
  summary: Scalars['String'];
  url: Scalars['String'];
};

export type EventCheckin = {
  __typename?: 'EventCheckin';
  eventId: Scalars['String'];
  profileId: Scalars['String'];
};

export type EventCheckinInput = {
  eventId: Scalars['String'];
  profileId: Scalars['String'];
};

export type EventCount = {
  __typename?: 'EventCount';
  profiles: Scalars['Int'];
};

export type EventCreateInput = {
  description: Scalars['String'];
  end: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  isPublic: Scalars['Boolean'];
  location: Scalars['String'];
  profiles?: InputMaybe<EventReservationCreateNestedManyWithoutEventInput>;
  start: Scalars['DateTime'];
  summary: Scalars['String'];
  url: Scalars['String'];
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
  description: Scalars['String'];
  end: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  isPublic: Scalars['Boolean'];
  location: Scalars['String'];
  start: Scalars['DateTime'];
  summary: Scalars['String'];
  url: Scalars['String'];
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
  eventId: Scalars['String'];
  id: Scalars['String'];
  profileId: Scalars['String'];
  status: Scalars['String'];
};

export type EventReservationCreateInput = {
  event: EventCreateNestedOneWithoutProfilesInput;
  id?: InputMaybe<Scalars['String']>;
  profile: ProfileCreateNestedOneWithoutEventsInput;
  status: Scalars['String'];
};

export type EventReservationCreateManyEventInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  status: Scalars['String'];
};

export type EventReservationCreateManyEventInputEnvelope = {
  data: Array<EventReservationCreateManyEventInput>;
};

export type EventReservationCreateManyProfileInput = {
  eventId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
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
  id?: InputMaybe<Scalars['String']>;
  profile: ProfileCreateNestedOneWithoutEventsInput;
  status: Scalars['String'];
};

export type EventReservationCreateWithoutProfileInput = {
  event: EventCreateNestedOneWithoutProfilesInput;
  id?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
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
  eventId: Scalars['String'];
  profileId: Scalars['String'];
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

export type EventReservationUpdateInput = {
  event?: InputMaybe<EventUpdateOneRequiredWithoutProfilesNestedInput>;
  profile?: InputMaybe<ProfileUpdateOneRequiredWithoutEventsNestedInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
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
  id?: InputMaybe<Scalars['String']>;
  profileId_eventId?: InputMaybe<EventReservationProfileIdEventIdCompoundUniqueInput>;
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
  update?: InputMaybe<EventUpdateWithoutProfilesInput>;
  upsert?: InputMaybe<EventUpsertWithoutProfilesInput>;
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
  id?: InputMaybe<Scalars['String']>;
};

/** Types of files or documents that may be uploaded to Google Cloud. */
export enum FileCategory {
  Resume = 'RESUME'
}

export type FilledApplication = {
  __typename?: 'FilledApplication';
  appId: Scalars['String'];
  first: Scalars['String'];
  id: Scalars['String'];
  interviewLink?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  profileId: Scalars['String'];
  responses: Array<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  second: Scalars['String'];
  status: Scalars['String'];
  third: Scalars['String'];
};

export type FilledApplicationCreateManyAppInput = {
  first: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  interviewLink?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  responses?: InputMaybe<FilledApplicationCreateresponsesInput>;
  score?: InputMaybe<Scalars['Int']>;
  second: Scalars['String'];
  status: Scalars['String'];
  third: Scalars['String'];
};

export type FilledApplicationCreateManyAppInputEnvelope = {
  data: Array<FilledApplicationCreateManyAppInput>;
};

export type FilledApplicationCreateManyProfileInput = {
  appId: Scalars['String'];
  first: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  interviewLink?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  responses?: InputMaybe<FilledApplicationCreateresponsesInput>;
  score?: InputMaybe<Scalars['Int']>;
  second: Scalars['String'];
  status: Scalars['String'];
  third: Scalars['String'];
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
  first: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  interviewLink?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  profile: ProfileCreateNestedOneWithoutFillApplicationsInput;
  responses?: InputMaybe<FilledApplicationCreateresponsesInput>;
  score?: InputMaybe<Scalars['Int']>;
  second: Scalars['String'];
  status: Scalars['String'];
  third: Scalars['String'];
};

export type FilledApplicationCreateWithoutProfileInput = {
  app: ApplicationCreateNestedOneWithoutFillApplicationsInput;
  first: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  interviewLink?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  responses?: InputMaybe<FilledApplicationCreateresponsesInput>;
  score?: InputMaybe<Scalars['Int']>;
  second: Scalars['String'];
  status: Scalars['String'];
  third: Scalars['String'];
};

export type FilledApplicationCreateresponsesInput = {
  set: Array<Scalars['String']>;
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
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
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
  id?: InputMaybe<Scalars['String']>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  isSet?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkInOldEvent: Array<EventCheckin>;
  checkinToEvent: EventCheckin;
  createOneAccount: Account;
  createOneApplication: Application;
  createOneEvent: Event;
  createOneEventReservation: EventReservation;
  createOneProfile: Profile;
  createOneTypeformApplication: TypeformApplication;
  createOneVanityLink: VanityLink;
  deleteOneAccount?: Maybe<Account>;
  deleteOneApplication?: Maybe<Application>;
  deleteOneEvent?: Maybe<Event>;
  deleteOneEventReservation?: Maybe<EventReservation>;
  deleteOneTypeformApplication?: Maybe<TypeformApplication>;
  deleteOneVanityLink?: Maybe<VanityLink>;
  transferFile: SignedUrl;
  updateOneAccount?: Maybe<Account>;
  updateOneApplication?: Maybe<Application>;
  updateOneEvent?: Maybe<Event>;
  updateOneEventReservation?: Maybe<EventReservation>;
  updateOneFilledApplication?: Maybe<FilledApplication>;
  updateOneProfile?: Maybe<Profile>;
  updateOneTypeformApplication?: Maybe<TypeformApplication>;
  updateOneVanityLink?: Maybe<VanityLink>;
  upsertOneAccount: Account;
  upsertOneApplication: Application;
  upsertOneEvent: Event;
  upsertOneEventReservation: EventReservation;
  upsertOneProfile: Profile;
};


export type MutationCheckInOldEventArgs = {
  email: Scalars['String'];
  netID: Scalars['String'];
};


export type MutationCheckinToEventArgs = {
  options: EventCheckinInput;
};


export type MutationCreateOneAccountArgs = {
  data: AccountCreateInput;
};


export type MutationCreateOneApplicationArgs = {
  data: ApplicationCreateInput;
};


export type MutationCreateOneEventArgs = {
  data: EventCreateInput;
};


export type MutationCreateOneEventReservationArgs = {
  data: EventReservationCreateInput;
};


export type MutationCreateOneProfileArgs = {
  data: ProfileCreateInput;
};


export type MutationCreateOneTypeformApplicationArgs = {
  data: TypeformApplicationCreateInput;
};


export type MutationCreateOneVanityLinkArgs = {
  data: VanityLinkCreateInput;
};


export type MutationDeleteOneAccountArgs = {
  where: AccountWhereUniqueInput;
};


export type MutationDeleteOneApplicationArgs = {
  where: ApplicationWhereUniqueInput;
};


export type MutationDeleteOneEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationDeleteOneEventReservationArgs = {
  where: EventReservationWhereUniqueInput;
};


export type MutationDeleteOneTypeformApplicationArgs = {
  where: TypeformApplicationWhereUniqueInput;
};


export type MutationDeleteOneVanityLinkArgs = {
  where: VanityLinkWhereUniqueInput;
};


export type MutationTransferFileArgs = {
  options: SignedUrlInput;
};


export type MutationUpdateOneAccountArgs = {
  data: AccountUpdateInput;
  where: AccountWhereUniqueInput;
};


export type MutationUpdateOneApplicationArgs = {
  data: ApplicationUpdateInput;
  where: ApplicationWhereUniqueInput;
};


export type MutationUpdateOneEventArgs = {
  data: EventUpdateInput;
  where: EventWhereUniqueInput;
};


export type MutationUpdateOneEventReservationArgs = {
  data: EventReservationUpdateInput;
  where: EventReservationWhereUniqueInput;
};


export type MutationUpdateOneFilledApplicationArgs = {
  data: FilledApplicationUpdateInput;
  where: FilledApplicationWhereUniqueInput;
};


export type MutationUpdateOneProfileArgs = {
  data: ProfileUpdateInput;
  where: ProfileWhereUniqueInput;
};


export type MutationUpdateOneTypeformApplicationArgs = {
  data: TypeformApplicationUpdateInput;
  where: TypeformApplicationWhereUniqueInput;
};


export type MutationUpdateOneVanityLinkArgs = {
  data: VanityLinkUpdateInput;
  where: VanityLinkWhereUniqueInput;
};


export type MutationUpsertOneAccountArgs = {
  create: AccountCreateInput;
  update: AccountUpdateInput;
  where: AccountWhereUniqueInput;
};


export type MutationUpsertOneApplicationArgs = {
  create: ApplicationCreateInput;
  update: ApplicationUpdateInput;
  where: ApplicationWhereUniqueInput;
};


export type MutationUpsertOneEventArgs = {
  create: EventCreateInput;
  update: EventUpdateInput;
  where: EventWhereUniqueInput;
};


export type MutationUpsertOneEventReservationArgs = {
  create: EventReservationCreateInput;
  update: EventReservationUpdateInput;
  where: EventReservationWhereUniqueInput;
};


export type MutationUpsertOneProfileArgs = {
  create: ProfileCreateInput;
  update: ProfileUpdateInput;
  where: ProfileWhereUniqueInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  isSet?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  isSet?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isSet?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
  unset?: InputMaybe<Scalars['Boolean']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
  unset?: InputMaybe<Scalars['Boolean']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
  unset?: InputMaybe<Scalars['Boolean']>;
};

export type OfficerCreateNestedManyWithoutDivisionsInput = {
  connect?: InputMaybe<Array<OfficerWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OfficerCreateOrConnectWithoutDivisionsInput>>;
  create?: InputMaybe<Array<OfficerCreateWithoutDivisionsInput>>;
};

export type OfficerCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<OfficerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OfficerCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<OfficerCreateWithoutProfileInput>;
};

export type OfficerCreateOrConnectWithoutDivisionsInput = {
  create: OfficerCreateWithoutDivisionsInput;
  where: OfficerWhereUniqueInput;
};

export type OfficerCreateOrConnectWithoutProfileInput = {
  create: OfficerCreateWithoutProfileInput;
  where: OfficerWhereUniqueInput;
};

export type OfficerCreateWithoutDivisionsInput = {
  divisionIds?: InputMaybe<OfficerCreatedivisionIdsInput>;
  id?: InputMaybe<Scalars['String']>;
  profile: ProfileCreateNestedOneWithoutOfficerInput;
};

export type OfficerCreateWithoutProfileInput = {
  divisionIds?: InputMaybe<OfficerCreatedivisionIdsInput>;
  divisions?: InputMaybe<DivisionCreateNestedManyWithoutOfficersInput>;
  id?: InputMaybe<Scalars['String']>;
};

export type OfficerCreatedivisionIdsInput = {
  set: Array<Scalars['String']>;
};

export type OfficerListRelationFilter = {
  every?: InputMaybe<OfficerWhereInput>;
  none?: InputMaybe<OfficerWhereInput>;
  some?: InputMaybe<OfficerWhereInput>;
};

export type OfficerOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type OfficerOrderByWithRelationInput = {
  divisionIds?: InputMaybe<SortOrder>;
  divisions?: InputMaybe<DivisionOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
};

export type OfficerRelationFilter = {
  is?: InputMaybe<OfficerWhereInput>;
  isNot?: InputMaybe<OfficerWhereInput>;
};

export type OfficerScalarWhereInput = {
  AND?: InputMaybe<Array<OfficerScalarWhereInput>>;
  NOT?: InputMaybe<Array<OfficerScalarWhereInput>>;
  OR?: InputMaybe<Array<OfficerScalarWhereInput>>;
  divisionIds?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  profileId?: InputMaybe<StringFilter>;
};

export type OfficerUpdateManyMutationInput = {
  divisionIds?: InputMaybe<OfficerUpdatedivisionIdsInput>;
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

export type OfficerUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<OfficerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OfficerCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<OfficerCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<OfficerUpdateWithoutProfileInput>;
  upsert?: InputMaybe<OfficerUpsertWithoutProfileInput>;
};

export type OfficerUpdateWithWhereUniqueWithoutDivisionsInput = {
  data: OfficerUpdateWithoutDivisionsInput;
  where: OfficerWhereUniqueInput;
};

export type OfficerUpdateWithoutDivisionsInput = {
  divisionIds?: InputMaybe<OfficerUpdatedivisionIdsInput>;
  profile?: InputMaybe<ProfileUpdateOneRequiredWithoutOfficerNestedInput>;
};

export type OfficerUpdateWithoutProfileInput = {
  divisionIds?: InputMaybe<OfficerUpdatedivisionIdsInput>;
  divisions?: InputMaybe<DivisionUpdateManyWithoutOfficersNestedInput>;
};

export type OfficerUpdatedivisionIdsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type OfficerUpsertWithWhereUniqueWithoutDivisionsInput = {
  create: OfficerCreateWithoutDivisionsInput;
  update: OfficerUpdateWithoutDivisionsInput;
  where: OfficerWhereUniqueInput;
};

export type OfficerUpsertWithoutProfileInput = {
  create: OfficerCreateWithoutProfileInput;
  update: OfficerUpdateWithoutProfileInput;
};

export type OfficerWhereInput = {
  AND?: InputMaybe<Array<OfficerWhereInput>>;
  NOT?: InputMaybe<Array<OfficerWhereInput>>;
  OR?: InputMaybe<Array<OfficerWhereInput>>;
  divisionIds?: InputMaybe<StringNullableListFilter>;
  divisions?: InputMaybe<DivisionListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<StringFilter>;
};

export type OfficerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  _count?: Maybe<ProfileCount>;
  classStanding: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  major: Scalars['String'];
  membershipStatus: Scalars['Boolean'];
  membershipTS?: Maybe<Scalars['DateTime']>;
  netid: Scalars['String'];
  resume: Scalars['Boolean'];
  resumeTS?: Maybe<Scalars['DateTime']>;
  roles: Array<Scalars['String']>;
  userId: Scalars['String'];
  utdStudent: Scalars['Boolean'];
};

export type ProfileCount = {
  __typename?: 'ProfileCount';
  events: Scalars['Int'];
  fillApplications: Scalars['Int'];
};

export type ProfileCreateInput = {
  classStanding: Scalars['String'];
  email: Scalars['String'];
  events?: InputMaybe<EventReservationCreateNestedManyWithoutProfileInput>;
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutProfileInput>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  major: Scalars['String'];
  membershipStatus: Scalars['Boolean'];
  membershipTS?: InputMaybe<Scalars['DateTime']>;
  netid: Scalars['String'];
  officer?: InputMaybe<OfficerCreateNestedOneWithoutProfileInput>;
  resume: Scalars['Boolean'];
  resumeTS?: InputMaybe<Scalars['DateTime']>;
  roles?: InputMaybe<ProfileCreaterolesInput>;
  user: UserCreateNestedOneWithoutProfileInput;
  utdStudent: Scalars['Boolean'];
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

export type ProfileCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<ProfileCreateWithoutUserInput>;
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

export type ProfileCreateOrConnectWithoutUserInput = {
  create: ProfileCreateWithoutUserInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateWithoutEventsInput = {
  classStanding: Scalars['String'];
  email: Scalars['String'];
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutProfileInput>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  major: Scalars['String'];
  membershipStatus: Scalars['Boolean'];
  membershipTS?: InputMaybe<Scalars['DateTime']>;
  netid: Scalars['String'];
  officer?: InputMaybe<OfficerCreateNestedOneWithoutProfileInput>;
  resume: Scalars['Boolean'];
  resumeTS?: InputMaybe<Scalars['DateTime']>;
  roles?: InputMaybe<ProfileCreaterolesInput>;
  user: UserCreateNestedOneWithoutProfileInput;
  utdStudent: Scalars['Boolean'];
};

export type ProfileCreateWithoutFillApplicationsInput = {
  classStanding: Scalars['String'];
  email: Scalars['String'];
  events?: InputMaybe<EventReservationCreateNestedManyWithoutProfileInput>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  major: Scalars['String'];
  membershipStatus: Scalars['Boolean'];
  membershipTS?: InputMaybe<Scalars['DateTime']>;
  netid: Scalars['String'];
  officer?: InputMaybe<OfficerCreateNestedOneWithoutProfileInput>;
  resume: Scalars['Boolean'];
  resumeTS?: InputMaybe<Scalars['DateTime']>;
  roles?: InputMaybe<ProfileCreaterolesInput>;
  user: UserCreateNestedOneWithoutProfileInput;
  utdStudent: Scalars['Boolean'];
};

export type ProfileCreateWithoutOfficerInput = {
  classStanding: Scalars['String'];
  email: Scalars['String'];
  events?: InputMaybe<EventReservationCreateNestedManyWithoutProfileInput>;
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutProfileInput>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  major: Scalars['String'];
  membershipStatus: Scalars['Boolean'];
  membershipTS?: InputMaybe<Scalars['DateTime']>;
  netid: Scalars['String'];
  resume: Scalars['Boolean'];
  resumeTS?: InputMaybe<Scalars['DateTime']>;
  roles?: InputMaybe<ProfileCreaterolesInput>;
  user: UserCreateNestedOneWithoutProfileInput;
  utdStudent: Scalars['Boolean'];
};

export type ProfileCreateWithoutUserInput = {
  classStanding: Scalars['String'];
  email: Scalars['String'];
  events?: InputMaybe<EventReservationCreateNestedManyWithoutProfileInput>;
  fillApplications?: InputMaybe<FilledApplicationCreateNestedManyWithoutProfileInput>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  major: Scalars['String'];
  membershipStatus: Scalars['Boolean'];
  membershipTS?: InputMaybe<Scalars['DateTime']>;
  netid: Scalars['String'];
  officer?: InputMaybe<OfficerCreateNestedOneWithoutProfileInput>;
  resume: Scalars['Boolean'];
  resumeTS?: InputMaybe<Scalars['DateTime']>;
  roles?: InputMaybe<ProfileCreaterolesInput>;
  utdStudent: Scalars['Boolean'];
};

export type ProfileCreaterolesInput = {
  set: Array<Scalars['String']>;
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

export enum ProfileScalarFieldEnum {
  ClassStanding = 'classStanding',
  Email = 'email',
  FirstName = 'firstName',
  Id = 'id',
  LastName = 'lastName',
  Major = 'major',
  MembershipStatus = 'membershipStatus',
  MembershipTs = 'membershipTS',
  Netid = 'netid',
  Resume = 'resume',
  ResumeTs = 'resumeTS',
  Roles = 'roles',
  UserId = 'userId',
  UtdStudent = 'utdStudent'
}

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
  update?: InputMaybe<ProfileUpdateWithoutEventsInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutEventsInput>;
};

export type ProfileUpdateOneRequiredWithoutFillApplicationsNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutFillApplicationsInput>;
  create?: InputMaybe<ProfileCreateWithoutFillApplicationsInput>;
  update?: InputMaybe<ProfileUpdateWithoutFillApplicationsInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutFillApplicationsInput>;
};

export type ProfileUpdateOneRequiredWithoutOfficerNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutOfficerInput>;
  create?: InputMaybe<ProfileCreateWithoutOfficerInput>;
  update?: InputMaybe<ProfileUpdateWithoutOfficerInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutOfficerInput>;
};

export type ProfileUpdateOneWithoutUserNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<ProfileCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ProfileUpdateWithoutUserInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutUserInput>;
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

export type ProfileUpdateWithoutUserInput = {
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
  utdStudent?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ProfileUpdaterolesInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ProfileUpsertWithoutEventsInput = {
  create: ProfileCreateWithoutEventsInput;
  update: ProfileUpdateWithoutEventsInput;
};

export type ProfileUpsertWithoutFillApplicationsInput = {
  create: ProfileCreateWithoutFillApplicationsInput;
  update: ProfileUpdateWithoutFillApplicationsInput;
};

export type ProfileUpsertWithoutOfficerInput = {
  create: ProfileCreateWithoutOfficerInput;
  update: ProfileUpdateWithoutOfficerInput;
};

export type ProfileUpsertWithoutUserInput = {
  create: ProfileCreateWithoutUserInput;
  update: ProfileUpdateWithoutUserInput;
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
  officer?: InputMaybe<OfficerRelationFilter>;
  resume?: InputMaybe<BoolFilter>;
  resumeTS?: InputMaybe<DateTimeNullableFilter>;
  roles?: InputMaybe<StringNullableListFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
  utdStudent?: InputMaybe<BoolFilter>;
};

export type ProfileWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  netid?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  applications: Array<Application>;
  eventReservations: Array<EventReservation>;
  events: Array<Event>;
  filledApplications: Array<FilledApplication>;
  findFirstApplication?: Maybe<Application>;
  findFirstTypeformApplication?: Maybe<TypeformApplication>;
  me: User;
  profile?: Maybe<Profile>;
  profiles: Array<Profile>;
  returnAllOpenApp: Array<Application>;
  typeformApplications: Array<TypeformApplication>;
  upcomingEvents: Array<Event>;
  vanityLinks: Array<VanityLink>;
};


export type QueryApplicationsArgs = {
  cursor?: InputMaybe<ApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<ApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ApplicationWhereInput>;
};


export type QueryEventReservationsArgs = {
  cursor?: InputMaybe<EventReservationWhereUniqueInput>;
  distinct?: InputMaybe<Array<EventReservationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EventReservationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventReservationWhereInput>;
};


export type QueryEventsArgs = {
  cursor?: InputMaybe<EventWhereUniqueInput>;
  distinct?: InputMaybe<Array<EventScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryFilledApplicationsArgs = {
  cursor?: InputMaybe<FilledApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<FilledApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FilledApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FilledApplicationWhereInput>;
};


export type QueryFindFirstApplicationArgs = {
  cursor?: InputMaybe<ApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<ApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ApplicationWhereInput>;
};


export type QueryFindFirstTypeformApplicationArgs = {
  cursor?: InputMaybe<TypeformApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<TypeformApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TypeformApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TypeformApplicationWhereInput>;
};


export type QueryProfileArgs = {
  where: ProfileWhereUniqueInput;
};


export type QueryProfilesArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};


export type QueryReturnAllOpenAppArgs = {
  date: Scalars['DateTime'];
};


export type QueryTypeformApplicationsArgs = {
  cursor?: InputMaybe<TypeformApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<TypeformApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TypeformApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TypeformApplicationWhereInput>;
};


export type QueryVanityLinksArgs = {
  cursor?: InputMaybe<VanityLinkWhereUniqueInput>;
  distinct?: InputMaybe<Array<VanityLinkScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VanityLinkOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VanityLinkWhereInput>;
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
  id?: InputMaybe<Scalars['String']>;
  roleName: Scalars['String'];
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
  update?: InputMaybe<RoleUpdateWithoutRolesOnUserInput>;
  upsert?: InputMaybe<RoleUpsertWithoutRolesOnUserInput>;
};

export type RoleUpdateWithoutRolesOnUserInput = {
  roleName?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RoleUpsertWithoutRolesOnUserInput = {
  create: RoleCreateWithoutRolesOnUserInput;
  update: RoleUpdateWithoutRolesOnUserInput;
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
  id?: InputMaybe<Scalars['String']>;
};

export type RolesOnUser = {
  __typename?: 'RolesOnUser';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  roleId: Scalars['String'];
  userId: Scalars['String'];
};

export type RolesOnUserCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  roleId: Scalars['String'];
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
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
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
  roleId: Scalars['String'];
  userId: Scalars['String'];
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
  id?: InputMaybe<Scalars['String']>;
  userId_roleId?: InputMaybe<RolesOnUserUserIdRoleIdCompoundUniqueInput>;
};

export type Session = {
  __typename?: 'Session';
  expires: Scalars['DateTime'];
  id: Scalars['String'];
  sessionToken: Scalars['String'];
  userId: Scalars['String'];
};

export type SessionCreateManyUserInput = {
  expires: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  sessionToken: Scalars['String'];
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
  expires: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  sessionToken: Scalars['String'];
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
  id?: InputMaybe<Scalars['String']>;
  sessionToken?: InputMaybe<Scalars['String']>;
};

export type SignedUrl = {
  __typename?: 'SignedURL';
  action?: Maybe<Action>;
  fileType?: Maybe<FileCategory>;
  url?: Maybe<Scalars['String']>;
};

export type SignedUrlInput = {
  action?: InputMaybe<Action>;
  fileType?: InputMaybe<FileCategory>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isSet?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type TypeformApplication = {
  __typename?: 'TypeformApplication';
  active: Scalars['Boolean'];
  description: Scalars['String'];
  division: Scalars['String'];
  endpoint: Scalars['String'];
  externalResourceUrl: Scalars['String'];
  id: Scalars['String'];
  typeformId: Scalars['String'];
  typeformName: Scalars['String'];
};

export type TypeformApplicationCreateInput = {
  active: Scalars['Boolean'];
  description: Scalars['String'];
  division: Scalars['String'];
  endpoint: Scalars['String'];
  externalResourceUrl: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  typeformId: Scalars['String'];
  typeformName: Scalars['String'];
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
  id?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  accounts: Array<Account>;
  attendedEvents: Array<Event>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isOfficer: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  resumeFilename: Scalars['String'];
  roles: Array<RolesOnUser>;
  sessions: Array<Session>;
};


export type UserAccountsArgs = {
  cursor?: InputMaybe<AccountWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccountScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccountOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountWhereInput>;
};


export type UserRolesArgs = {
  cursor?: InputMaybe<RolesOnUserWhereUniqueInput>;
  distinct?: InputMaybe<Array<RolesOnUserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RolesOnUserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RolesOnUserWhereInput>;
};


export type UserSessionsArgs = {
  cursor?: InputMaybe<SessionWhereUniqueInput>;
  distinct?: InputMaybe<Array<SessionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SessionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SessionWhereInput>;
};

export type UserCount = {
  __typename?: 'UserCount';
  accounts: Scalars['Int'];
  roles: Scalars['Int'];
  sessions: Scalars['Int'];
};

export type UserCreateNestedOneWithoutAccountsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAccountsInput>;
  create?: InputMaybe<UserCreateWithoutAccountsInput>;
};

export type UserCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<UserCreateWithoutProfileInput>;
};

export type UserCreateOrConnectWithoutAccountsInput = {
  create: UserCreateWithoutAccountsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutProfileInput = {
  create: UserCreateWithoutProfileInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAccountsInput = {
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutUserInput>;
  roles?: InputMaybe<RolesOnUserCreateNestedManyWithoutUserInput>;
  sessions?: InputMaybe<SessionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutProfileInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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

export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAccountsInput>;
  create?: InputMaybe<UserCreateWithoutAccountsInput>;
  update?: InputMaybe<UserUpdateWithoutAccountsInput>;
  upsert?: InputMaybe<UserUpsertWithoutAccountsInput>;
};

export type UserUpdateOneRequiredWithoutProfileNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<UserCreateWithoutProfileInput>;
  update?: InputMaybe<UserUpdateWithoutProfileInput>;
  upsert?: InputMaybe<UserUpsertWithoutProfileInput>;
};

export type UserUpdateWithoutAccountsInput = {
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  profile?: InputMaybe<ProfileUpdateOneWithoutUserNestedInput>;
  roles?: InputMaybe<RolesOnUserUpdateManyWithoutUserNestedInput>;
  sessions?: InputMaybe<SessionUpdateManyWithoutUserNestedInput>;
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

export type UserUpsertWithoutAccountsInput = {
  create: UserCreateWithoutAccountsInput;
  update: UserUpdateWithoutAccountsInput;
};

export type UserUpsertWithoutProfileInput = {
  create: UserCreateWithoutProfileInput;
  update: UserUpdateWithoutProfileInput;
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
  profile?: InputMaybe<ProfileRelationFilter>;
  roles?: InputMaybe<RolesOnUserListRelationFilter>;
  sessions?: InputMaybe<SessionListRelationFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type VanityLink = {
  __typename?: 'VanityLink';
  id: Scalars['String'];
  originalUrl: Scalars['String'];
  slashtag: Scalars['String'];
  vanityDomain: Scalars['String'];
};

export type VanityLinkCreateInput = {
  id?: InputMaybe<Scalars['String']>;
  originalUrl: Scalars['String'];
  slashtag: Scalars['String'];
  vanityDomain: Scalars['String'];
};

export type VanityLinkOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  originalUrl?: InputMaybe<SortOrder>;
  slashtag?: InputMaybe<SortOrder>;
  vanityDomain?: InputMaybe<SortOrder>;
};

export enum VanityLinkScalarFieldEnum {
  Id = 'id',
  OriginalUrl = 'originalUrl',
  Slashtag = 'slashtag',
  VanityDomain = 'vanityDomain'
}

export type VanityLinkUpdateInput = {
  originalUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  slashtag?: InputMaybe<StringFieldUpdateOperationsInput>;
  vanityDomain?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type VanityLinkWhereInput = {
  AND?: InputMaybe<Array<VanityLinkWhereInput>>;
  NOT?: InputMaybe<Array<VanityLinkWhereInput>>;
  OR?: InputMaybe<Array<VanityLinkWhereInput>>;
  id?: InputMaybe<StringFilter>;
  originalUrl?: InputMaybe<StringFilter>;
  slashtag?: InputMaybe<StringFilter>;
  vanityDomain?: InputMaybe<StringFilter>;
};

export type VanityLinkWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type FindFirstApplicationQueryVariables = Exact<{
  where?: InputMaybe<ApplicationWhereInput>;
}>;


export type FindFirstApplicationQuery = { __typename?: 'Query', findFirstApplication?: { __typename?: 'Application', id: string, divisionId: string, questions: Array<string> } | null };

export type FetchAllOpenApplicationsQueryVariables = Exact<{
  date: Scalars['DateTime'];
}>;


export type FetchAllOpenApplicationsQuery = { __typename?: 'Query', returnAllOpenApp: Array<{ __typename?: 'Application', divisionId: string, id: string, questions: Array<string> }> };

export type CheckInToEventMutationVariables = Exact<{
  checkInData: EventCheckinInput;
}>;


export type CheckInToEventMutation = { __typename?: 'Mutation', checkinToEvent: { __typename?: 'EventCheckin', profileId: string, eventId: string } };

export type GetCheckInPageUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCheckInPageUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', profile?: { __typename?: 'Profile', id: string } | null } };

export type GetEventPageUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventPageUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', isOfficer: boolean, attendedEvents: Array<{ __typename?: 'Event', summary: string, start: any, location: string }> }, upcomingEvents: Array<{ __typename?: 'Event', id: string, summary: string, start: any, location: string, end: any, description: string, url: string, isPublic: boolean }> };

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
  email: Scalars['String'];
  netId: Scalars['String'];
}>;


export type MigrateEventMutation = { __typename?: 'Mutation', checkInOldEvent: Array<{ __typename?: 'EventCheckin', eventId: string, profileId: string }> };

export type FindFilledApplicationsQueryVariables = Exact<{
  whereFilled?: InputMaybe<FilledApplicationWhereInput>;
  whereApp?: InputMaybe<ApplicationWhereInput>;
}>;


export type FindFilledApplicationsQuery = { __typename?: 'Query', me: { __typename?: 'User', isOfficer: boolean }, filledApplications: Array<{ __typename?: 'FilledApplication', profileId: string, appId: string, responses: Array<string>, status: string, first: string, notes?: string | null, second: string, third: string, score?: number | null, interviewLink?: string | null }>, findFirstApplication?: { __typename?: 'Application', createdAt: any, expireDate: any, type?: string | null, questions: Array<string>, id: string, divisionId: string } | null };

export type GetHomePageUserInfoQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetHomePageUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', attendedEvents: Array<{ __typename?: 'Event', description: string, location: string, summary: string, start: any }> }, profile?: { __typename?: 'Profile', firstName: string, netid: string, email: string } | null };

export type UpsertProfileMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  create: ProfileCreateInput;
  update: ProfileUpdateInput;
}>;


export type UpsertProfileMutation = { __typename?: 'Mutation', upsertOneProfile: { __typename?: 'Profile', firstName: string, lastName: string, email: string, netid: string, classStanding: string, major: string, utdStudent: boolean } };

export type FindProfileQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type FindProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', firstName: string, lastName: string, email: string, netid: string, classStanding: string, major: string, utdStudent: boolean } | null };

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

export type GetUserOfficerStatusDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserOfficerStatusDataQuery = { __typename?: 'Query', me: { __typename?: 'User', isOfficer: boolean } };

export type CreateVanityLinkMutationVariables = Exact<{
  data: VanityLinkCreateInput;
}>;


export type CreateVanityLinkMutation = { __typename?: 'Mutation', createOneVanityLink: { __typename?: 'VanityLink', originalUrl: string, vanityDomain: string, slashtag: string } };


export const FindFirstApplicationDocument = gql`
    query findFirstApplication($where: ApplicationWhereInput) {
  findFirstApplication(where: $where) {
    id
    divisionId
    questions
  }
}
    `;
export const FetchAllOpenApplicationsDocument = gql`
    query fetchAllOpenApplications($date: DateTime!) {
  returnAllOpenApp(date: $date) {
    divisionId
    id
    questions
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
    query findFilledApplications($whereFilled: FilledApplicationWhereInput, $whereApp: ApplicationWhereInput) {
  me {
    isOfficer
  }
  filledApplications(where: $whereFilled) {
    profileId
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
  findFirstApplication(where: $whereApp) {
    createdAt
    expireDate
    type
    questions
    id
    divisionId
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    findFirstApplication(variables?: FindFirstApplicationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindFirstApplicationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindFirstApplicationQuery>(FindFirstApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findFirstApplication', 'query');
    },
    fetchAllOpenApplications(variables: FetchAllOpenApplicationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FetchAllOpenApplicationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FetchAllOpenApplicationsQuery>(FetchAllOpenApplicationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchAllOpenApplications', 'query');
    },
    checkInToEvent(variables: CheckInToEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CheckInToEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckInToEventMutation>(CheckInToEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkInToEvent', 'mutation');
    },
    getCheckInPageUserInfo(variables?: GetCheckInPageUserInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCheckInPageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCheckInPageUserInfoQuery>(GetCheckInPageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCheckInPageUserInfo', 'query');
    },
    getEventPageUserInfo(variables?: GetEventPageUserInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventPageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventPageUserInfoQuery>(GetEventPageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEventPageUserInfo', 'query');
    },
    updateEventData(variables: UpdateEventDataMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateEventDataMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEventDataMutation>(UpdateEventDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateEventData', 'mutation');
    },
    deleteEvent(variables: DeleteEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEventMutation>(DeleteEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteEvent', 'mutation');
    },
    getCreateEventPageUserInfo(variables?: GetCreateEventPageUserInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCreateEventPageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCreateEventPageUserInfoQuery>(GetCreateEventPageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCreateEventPageUserInfo', 'query');
    },
    createNewEvent(variables: CreateNewEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateNewEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateNewEventMutation>(CreateNewEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createNewEvent', 'mutation');
    },
    migrateEvent(variables: MigrateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MigrateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<MigrateEventMutation>(MigrateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'migrateEvent', 'mutation');
    },
    findFilledApplications(variables?: FindFilledApplicationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindFilledApplicationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindFilledApplicationsQuery>(FindFilledApplicationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findFilledApplications', 'query');
    },
    getHomePageUserInfo(variables: GetHomePageUserInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetHomePageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHomePageUserInfoQuery>(GetHomePageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHomePageUserInfo', 'query');
    },
    upsertProfile(variables: UpsertProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertProfileMutation>(UpsertProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upsertProfile', 'mutation');
    },
    findProfile(variables: FindProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindProfileQuery>(FindProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findProfile', 'query');
    },
    getResumeSignedURL(variables: GetResumeSignedUrlMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetResumeSignedUrlMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetResumeSignedUrlMutation>(GetResumeSignedUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getResumeSignedURL', 'mutation');
    },
    getResumePageUserInfo(variables: GetResumePageUserInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetResumePageUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetResumePageUserInfoQuery>(GetResumePageUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getResumePageUserInfo', 'query');
    },
    createTypeformApplication(variables: CreateTypeformApplicationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTypeformApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTypeformApplicationMutation>(CreateTypeformApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTypeformApplication', 'mutation');
    },
    getTypeformApplicationsWithUserData(variables?: GetTypeformApplicationsWithUserDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTypeformApplicationsWithUserDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTypeformApplicationsWithUserDataQuery>(GetTypeformApplicationsWithUserDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTypeformApplicationsWithUserData', 'query');
    },
    findTypeformApplication(variables?: FindTypeformApplicationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindTypeformApplicationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindTypeformApplicationQuery>(FindTypeformApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findTypeformApplication', 'query');
    },
    updateTypeformApplication(variables: UpdateTypeformApplicationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTypeformApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTypeformApplicationMutation>(UpdateTypeformApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTypeformApplication', 'mutation');
    },
    deleteTypeformApplication(variables: DeleteTypeformApplicationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTypeformApplicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTypeformApplicationMutation>(DeleteTypeformApplicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteTypeformApplication', 'mutation');
    },
    getEditViewApplicationList(variables?: GetEditViewApplicationListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEditViewApplicationListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEditViewApplicationListQuery>(GetEditViewApplicationListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEditViewApplicationList', 'query');
    },
    getUserOfficerStatusData(variables?: GetUserOfficerStatusDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserOfficerStatusDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserOfficerStatusDataQuery>(GetUserOfficerStatusDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserOfficerStatusData', 'query');
    },
    createVanityLink(variables: CreateVanityLinkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateVanityLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateVanityLinkMutation>(CreateVanityLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createVanityLink', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;