import { gql } from "@apollo/client";

export const mutationCreatedCountry = gql`
  mutation Mutation($data: NewCountryInput!) {
    addCountry(data: $data) {
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
