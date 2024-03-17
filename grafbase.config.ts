import { graph, config, scalar } from "@grafbase/sdk";

const g = graph.Standalone();

// Data Sources - https://grafbase.com/docs/connectors
//
// const pg = connector.Postgres('pg', { url: g.env('DATABASE_URL') })
// g.datasource(pg)

// Resolvers - https://grafbase.com/docs/resolvers
//
// g.query('helloWorld', {
//   returns: g.string(),
//   resolver: 'hello-world',
// })

const User = g.type("User", {
  name: scalar.string().length({ min: 2, max: 20 }),
  email: scalar.string().unique(),
  avatarUrl: scalar.url(),
  description: scalar.string().optional(),
  githubUrl: scalar.url().optional(),
  linkedInUrl: scalar.url().optional(),
  projects: g.ref(() => Project).list(),
});

const Project = g.type("project", {
  title: scalar.string().length({ min: 3 }),
  description: scalar.string(),
  image: scalar.url(),
  liveSiteUrl: scalar.url(),
  githubUrl: scalar.url(),
  category: scalar.string().search(),
  createdBy: g.ref(User),
});

export default config({
  graph: g,
  // Authentication - https://grafbase.com/docs/auth
  auth: {
    // OpenID Connect
    // const oidc = auth.OpenIDConnect({ issuer: g.env('OIDC_ISSUER_URL') })
    // providers: [oidc],
    rules: (rules) => {
      rules.public();
    },
  },
  // Caching - https://grafbase.com/docs/graphql-edge-caching
  // cache: {
  //   rules: [
  //     {
  //       types: ['Query'], // Cache everything for 60 seconds
  //       maxAge: 60,
  //       staleWhileRevalidate: 60
  //     }
  //   ]
  // }
});
