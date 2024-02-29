export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id:ID!
        rating: Int!
        content: String!
        game: Game!
        author:Author!
    }
    type Author {
        id:ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        review(id:ID!): Review
        reviews: [Review]
        game(id:ID!): Game
        games: [Game]
        author(id:ID!): Author
        authors: [Author]
    }
    type Mutation {
        addGame(game: AddGameInput!): Game
        updateGame(id:ID!, edits: UpdateGameInput!): Game
        deleteGame(id:ID!): [Game]
    }
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
    input UpdateGameInput {
        title: String
        platform: [String!]
    }
`;

// Types in GraphQL: int, float, string, boolean, ID.
// ! means it cant be null : Important