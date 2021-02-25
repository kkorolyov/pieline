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
  deleteProjects?: Maybe<Array<Project_Project>>;
  deleteUsers?: Maybe<Array<User_User>>;
  register?: Maybe<Auth_AuthResponse>;
  setProject?: Maybe<Project_Project>;
  setUser?: Maybe<User_User>;
};


export type MutationTypeDeleteProjectsArgs = {
  ids?: Maybe<Input_Common_UuidList>;
};


export type MutationTypeDeleteUsersArgs = {
  ids?: Maybe<Input_Common_UuidList>;
};


export type MutationTypeRegisterArgs = {
  pass?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};


export type MutationTypeSetProjectArgs = {
  project?: Maybe<Input_Project_Project>;
};


export type MutationTypeSetUserArgs = {
  user?: Maybe<Input_User_User>;
};

export type QueryType = {
  __typename?: 'QueryType';
  authenticate?: Maybe<Auth_AuthResponse>;
  i18n?: Maybe<I18n_I18nPack>;
  project?: Maybe<Project_Project>;
  projects?: Maybe<Array<Project_Project>>;
  user?: Maybe<User_User>;
  users?: Maybe<Array<User_User>>;
};


export type QueryTypeAuthenticateArgs = {
  pass?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};


export type QueryTypeI18nArgs = {
  locale?: Maybe<I18n_Locale>;
};


export type QueryTypeProjectArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryTypeProjectsArgs = {
  ids?: Maybe<Input_Common_UuidList>;
};


export type QueryTypeUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryTypeUsersArgs = {
  ids?: Maybe<Input_Common_UuidList>;
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
    