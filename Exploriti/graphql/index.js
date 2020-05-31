import gql from "graphql-tag";

export const GET_USER = gql`
    query getUser($id: String!) {
        user(id: $id) {
            name
            description
            programs {
                program {
                    id
                    name
                }
            }
            image
        }
    }
`;
