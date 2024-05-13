import { gql } from "@apollo/client";

export const queryCountryByCode = gql`
  query Country($code: String!) {
    country(code: $code) {
      code
      continent {
        name
      }
      emoji
      id
      name
    }
  }
`;
