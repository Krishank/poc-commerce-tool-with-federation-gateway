const { ApolloServer } = require("apollo-server");
const { ApolloGateway,RemoteGraphQLDataSource, LocalGraphQLDataSource } = require("@apollo/gateway");
const getCommerceSchema = require("./get-commerce-schema");


const setupGateway = async () => {
    const commerceSchema = await getCommerceSchema();
  
    const gateway = new ApolloGateway({
        serviceList: [{ name: "commerce", url: "https://auth.europe-west1.gcp.commercetools.com/cos-australia/graphql" }],
  
        // Experimental: Enabling this enables the query plan view in Playground.
        __exposeQueryPlanExperimental: false,
  
        buildService: ({ url }) => {
            if (url === "https://auth.europe-west1.gcp.commercetools.com/cos-australia/graphql") {
                return new LocalGraphQLDataSource(commerceSchema);
            } else {
                return new RemoteGraphQLDataSource({
                    url,
                });
            }
        },
    });
  
    return gateway;
  };
  
  (async () => {
      const gateway = await setupGateway();
    
      const server = new ApolloServer({
          gateway,
    
          // Apollo Graph Manager (previously known as Apollo Engine)
          // When enabled and an `ENGINE_API_KEY` is set in the environment,
          // provides metrics, schema management and trace reporting.
          engine: false,
    
          // Subscriptions are unsupported but planned for a future Gateway version.
          subscriptions: false,
      });
    
      server.listen().then(({ url }) => {
          console.log(`🚀 Server ready at ${url}`);
      });
    })();



// const { createHttpLink } = require('apollo-link-http');
// const { setContext } = require('apollo-link-context');
// const { TokenProvider } = require('@commercetools/sdk-auth');
// const SdkAuth = require('@commercetools/sdk-auth');


// const tokenProvider = new TokenProvider({
//   sdkAuth: new SdkAuth({
//     host: 'https://auth.europe-west1.gcp.commercetools.com',
//     projectKey: 'cos-australia',
//     credentials: {
//       clientId: '',
//       clientSecret: '',
//     },
//     scopes: ['manage_project:cos-australia'],
//   }),
//   fetchTokenInfo: sdkAuth => sdkAuth.anonymousFlow(),
// });

// const httpLink = createHttpLink({
//   uri:'https://api.europe-west1.gcp.commercetools.com/cos-australia/graphql',
// });

// const authLink = setContext((_, { headers = {} }) => tokenProvider.getTokenInfo()
//   .then(tokenInfo => `${tokenInfo.token_type} ${tokenInfo.access_token}`)
//   .then(authorization => ({ headers: { ...headers, authorization } })));



  




// const gateway = new ApolloGateway({
//   // This entire `serviceList` is optional when running in managed federation
//   // mode, using Apollo Graph Manager as the source of truth.  In production,
//   // using a single source of truth to compose a schema is recommended and
//   // prevents composition failures at runtime using schema validation using
//   // real usage-based metrics.
//   serviceList: [
//     { name: "commerce", url: "https://auth.europe-west1.gcp.commercetools.com/cos-australia/graphql" },
//   ],
//   introspectionHeaders: {
//     Authorization: "Bearer <token>"
//   },

//   buildService: ({ url }) => {
//     if (url === "https://auth.europe-west1.gcp.commercetools.com/cos-australia/graphql") {
//       return new LocalGraphQLDataSource(getcommerceSchema());
//     } else {
//       return new RemoteGraphQLDataSource({
//         url,
//       });
//     }
//   },

  // buildService({ name, url }) {
  //   return new RemoteGraphQLDataSource({
  //     url,
  //     willSendRequest({ request, context }) {
  //       request.http.headers.set(
  //         "Authorization",
  //         "Bearer <token>"
  //       );
  //     }
  //   });
  // },


  // Experimental: Enabling this enables the query plan view in Playground.
  // __exposeQueryPlanExperimental: false,
// });



