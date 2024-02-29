import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// db
import db from './_db.js';
// types
import { typeDefs } from './schema.js';

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
// taking 3 arguments : review: (parent, args, context) to skip we can add underscore
const resolvers = {
    Query: {
        review: (_, args) => db.reviews.find(review => review.id === args.id),
        reviews: () => db.reviews,
        game: (_, args) => db.games.find(game => game.id === args.id),
        games: () => db.games,
        author: (_, args) => db.authors.find(author => author.id === args.id),
        authors: () => db.authors,
    },
    Game: {
        reviews: (parent) => db.reviews.filter(review => review.game_id === parent.id)
    },
    Author: {
        reviews: (parent) => db.reviews.filter(review => review.author_id === parent.id)
    },
    Review: {
        author: (parent) => db.authors.filter(author => author.id === parent.author_id),
        game: (parent) => db.games.filter(game => game.id === parent.game_id)
    },

    // Delete 
    Mutation: {
        // Created game with random id and then push and just return that game.
        addGame: (_, args) => { let game = { ...args.game, id: Math.floor(Math.random() * 10000).toString() }; db.games.push(game); return game },
        // Created game with random id and then push and just return that game.
        updateGame: (_, args) => {
            db.games = db.games.map((game) => {
                if (game.id === args.id) return { ...game, ...args.edits };
                return game
            });
            return db.games.find(game => game.id === args.id)
        },
        // Removing from array.
        deleteGame: (_, args) => db.games = db.games.filter(game => game.id !== args.id)
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at port: ${url}`);

