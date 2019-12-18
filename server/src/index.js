const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

/*let links = [{
    id: 'link-0',
    url: 'www.howtographql',
    description: 'Fullstack tutorial for GraphQL'
}]*/

/*let colors = [{
    id: '0',
    color_code: '#00ff00',
},
{
    id: '1',
    color_code: '#affb67',
},
{
    id: '2',
    color_code: '#44bbcc',
}
]*/

// 2
//let idCount = links.length
//let colorIdCount = colors.length


const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    colorsold: () => `This is the list of colors!`,
    //colors: () => colors,
/*    colors: (root, args, context, info) => {
        return context.prisma.colors()
    },*/
    colors: (parent, args, context, info) => {
        const where = args.filter ? {
          OR: [
            { description_contains: args.filter },
            { url_contains: args.filter },
          ],
        } : {}
      
        const colors = context.prisma.colors({
          where,
          skip: args.skip,
          first: args.first
        })
        return colors 
      },
    //feed: () => links,
    feed: (root, args, context, info) => {
        return context.prisma.links()
    },
    color: (root, args, context, info) => {
        return context.prisma.color()
    },
  },

  Mutation: {
      addLink: (root, args, context) => {
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

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))