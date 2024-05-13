import { gql } from "@apollo/client";

export const queryAllCountries = gql`
  query {
    countries {
      code
      continent {
        name
        id
      }
      emoji
      id
      name
    }
  }
`;
