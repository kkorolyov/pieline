export type Maybe<T> = T | null;
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
};

export type Input_Auth_AuthRequest = {
  pass?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type Input_Auth_AuthResponse = {
  id?: Maybe<Input_Common_Uuid>;
  token?: Maybe<Scalars['String']>;
};

export type Input_Common_Chunk = {
  size?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['String']>;
};

export type Input_Common_Uuid = {
  value?: Maybe<Scalars['String']>;
};

export type Input_Common_UuidList = {
  ids?: Maybe<Array<Maybe<Input_Common_Uuid>>>;
};

export type Input_Debug_Jwt = {
  claims?: Maybe<Array<Maybe<Input_Debug_Jwt_ClaimsEntry>>>;
};

export type Input_Debug_Jwt_ClaimsEntry = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Input_I18n_PackRequest = {
  value?: Maybe<I18n_Locale>;
};

export type Input_I18n_I18nPack = {
  value?: Maybe<Array<Maybe<Input_I18n_I18nPack_ValueEntry>>>;
};

export type Input_I18n_I18nPack_ValueEntry = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Input_Project_Project = {
  details?: Maybe<Input_Project_Project_Details>;
  id?: Maybe<Input_Common_Uuid>;
};

export type Input_Project_Project_Details = {
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Input_Project_SearchRequest = {
  chunk?: Maybe<Input_Common_Chunk>;
  titlePattern?: Maybe<Scalars['String']>;
};

export type Input_Project_SearchResponse = {
  result?: Maybe<Array<Maybe<Input_Project_Project>>>;
  token?: Maybe<Scalars['String']>;
};

export type Input_User_Details = {
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Input_User_User = {
  details?: Maybe<Input_User_Details>;
  id?: Maybe<Input_Common_Uuid>;
};

export type MutationType = {
  __typename?: 'MutationType';
  /** auth */
  auth?: Maybe<_Mutation_Field_Group_Auth>;
  /** projects */
  projects?: Maybe<_Mutation_Field_Group_Projects>;
  /** users */
  users?: Maybe<_Mutation_Field_Group_Users>;
};

export type QueryType = {
  __typename?: 'QueryType';
  /** auth */
  auth?: Maybe<_Query_Field_Group_Auth>;
  /** debug */
  debug?: Maybe<_Query_Field_Group_Debug>;
  i18n?: Maybe<I18n_I18nPack>;
  /** projects */
  projects?: Maybe<_Query_Field_Group_Projects>;
  /** users */
  users?: Maybe<_Query_Field_Group_Users>;
};


export type QueryTypeI18nArgs = {
  locale?: Maybe<I18n_Locale>;
};

export type _Mutation_Field_Group_Auth = {
  __typename?: '_MUTATION_FIELD_GROUP_auth';
  register?: Maybe<Auth_AuthResponse>;
};


export type _Mutation_Field_Group_AuthRegisterArgs = {
  pass?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type _Mutation_Field_Group_Projects = {
  __typename?: '_MUTATION_FIELD_GROUP_projects';
  delete?: Maybe<Array<Project_Project>>;
  set?: Maybe<Project_Project>;
};


export type _Mutation_Field_Group_ProjectsDeleteArgs = {
  ids?: Maybe<Input_Common_UuidList>;
};


export type _Mutation_Field_Group_ProjectsSetArgs = {
  project?: Maybe<Input_Project_Project>;
};

export type _Mutation_Field_Group_Users = {
  __typename?: '_MUTATION_FIELD_GROUP_users';
  delete?: Maybe<Array<User_User>>;
  set?: Maybe<User_User>;
};


export type _Mutation_Field_Group_UsersDeleteArgs = {
  ids?: Maybe<Input_Common_UuidList>;
};


export type _Mutation_Field_Group_UsersSetArgs = {
  user?: Maybe<Input_User_User>;
};

export type _Query_Field_Group_Auth = {
  __typename?: '_QUERY_FIELD_GROUP_auth';
  login?: Maybe<Auth_AuthResponse>;
};


export type _Query_Field_Group_AuthLoginArgs = {
  pass?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type _Query_Field_Group_Debug = {
  __typename?: '_QUERY_FIELD_GROUP_debug';
  jwt?: Maybe<Debug_Jwt>;
};

export type _Query_Field_Group_Projects = {
  __typename?: '_QUERY_FIELD_GROUP_projects';
  get?: Maybe<Project_Project>;
  search?: Maybe<Project_SearchResponse>;
};


export type _Query_Field_Group_ProjectsGetArgs = {
  id?: Maybe<Scalars['String']>;
};


export type _Query_Field_Group_ProjectsSearchArgs = {
  request?: Maybe<Input_Project_SearchRequest>;
};

export type _Query_Field_Group_Users = {
  __typename?: '_QUERY_FIELD_GROUP_users';
  get?: Maybe<User_User>;
};


export type _Query_Field_Group_UsersGetArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Auth_AuthRequest = {
  __typename?: 'auth_AuthRequest';
  pass?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type Auth_AuthResponse = {
  __typename?: 'auth_AuthResponse';
  id?: Maybe<Common_Uuid>;
  token?: Maybe<Scalars['String']>;
};

export type Common_Chunk = {
  __typename?: 'common_Chunk';
  size?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['String']>;
};

export type Common_Uuid = {
  __typename?: 'common_Uuid';
  value?: Maybe<Scalars['String']>;
};

export type Common_UuidList = {
  __typename?: 'common_UuidList';
  ids?: Maybe<Array<Maybe<Common_Uuid>>>;
};

export type Debug_Jwt = {
  __typename?: 'debug_Jwt';
  claims?: Maybe<Array<Maybe<Debug_Jwt_ClaimsEntry>>>;
};

export type Debug_Jwt_ClaimsEntry = {
  __typename?: 'debug_Jwt_ClaimsEntry';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export enum I18n_Locale {
  EnUs = 'EN_US',
  Ru = 'RU'
}

export type I18n_PackRequest = {
  __typename?: 'i18n_PackRequest';
  value?: Maybe<I18n_Locale>;
};

export type I18n_I18nPack = {
  __typename?: 'i18n_i18nPack';
  value?: Maybe<Array<Maybe<I18n_I18nPack_ValueEntry>>>;
};

export type I18n_I18nPack_ValueEntry = {
  __typename?: 'i18n_i18nPack_ValueEntry';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Project_Project = {
  __typename?: 'project_Project';
  details?: Maybe<Project_Project_Details>;
  id?: Maybe<Common_Uuid>;
};

export type Project_Project_Details = {
  __typename?: 'project_Project_Details';
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Project_SearchRequest = {
  __typename?: 'project_SearchRequest';
  chunk?: Maybe<Common_Chunk>;
  titlePattern?: Maybe<Scalars['String']>;
};

export type Project_SearchResponse = {
  __typename?: 'project_SearchResponse';
  result?: Maybe<Array<Maybe<Project_Project>>>;
  token?: Maybe<Scalars['String']>;
};

export type User_Details = {
  __typename?: 'user_Details';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type User_User = {
  __typename?: 'user_User';
  details?: Maybe<User_Details>;
  id?: Maybe<Common_Uuid>;
};


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    