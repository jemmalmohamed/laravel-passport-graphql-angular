import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
 mutation login($username: String!  , $password: String! ){
  login(data: {username: $username, password: $password})
  {
  access_token
  refresh_token
  expires_in
  token_type
}
}`;

export const REFRESH_TOKEN_MUTATION = gql`
 mutation refreshToken($refresh_token: String! ){
  refreshToken(data: {refresh_token: $refresh_token})
  {
  access_token
  refresh_token
  expires_in
  token_type
}
}`;


export const LOGOUT_MUTATION = gql`
mutation {
  logout{
    status
    message
  }
}
 `;

export const SIGNUP_MUTATION = gql`
 mutation createUser ($username :String!  , $password : String! ){
  createUser(username: $username, password: $password ) {
    email
  }
}`;
