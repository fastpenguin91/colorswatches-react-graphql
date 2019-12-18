const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')

/*const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
}*/

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    colorsold: () => `This is the list of colors!`,
    //colors: () => colors,
    colors: (root, args, context, info) => {
        return context.prisma.colors()
    },
    //feed: () => links,
    feed: (root, args, context, info) => {
        return context.prisma.links()
    }
  },

  Mutation: {
      post: (root, args, context) => {
          return context.prisma.createLink({
              url: args.url,
              description: args.description,
          })
      },
      setColor: (root, args, context) => {
          return context.prisma.createColor({
              color_code: args.color_code,
          })
      },
  },

  Color: {
      id: (parent) => parent.id,
      color_code: (parent) => parent.color_code,
  },

  Link: {
      id: (parent) => parent.id,
      description: (parent) => parent.description,
      url: (parent) => parent.url,
  }
}


/*const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))*/

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
