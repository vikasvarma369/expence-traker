import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      username
      name
    }
  }
`;


const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      _id
      username
      name
    }
}
`;


const LOGOUT = gql`
mutation Logout {
  logout{
    message
  }
}
`

export { SIGN_UP, LOGIN, LOGOUT };




