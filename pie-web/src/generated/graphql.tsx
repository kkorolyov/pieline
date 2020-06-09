export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Input_Common_Uuid = {
  value?: Maybe<Scalars['String']>;
};

export type Input_Common_UuidList = {
  ids?: Maybe<Array<Maybe<Input_Common_Uuid>>>;
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
  setUser?: Maybe<User_User>;
};


export type MutationTypeSetUserArgs = {
  user?: Maybe<Input_User_User>;
};

export type QueryType = {
  __typename?: 'QueryType';
  user?: Maybe<User_User>;
  users?: Maybe<Array<User_User>>;
};


export type QueryTypeUserArgs = {
  id?: Maybe<Input_Common_Uuid>;
};


export type QueryTypeUsersArgs = {
  ids?: Maybe<Input_Common_UuidList>;
};

export type Common_Uuid = {
  __typename?: 'common_Uuid';
  value?: Maybe<Scalars['String']>;
};

export type Common_UuidList = {
  __typename?: 'common_UuidList';
  ids?: Maybe<Array<Maybe<Common_Uuid>>>;
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



      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    