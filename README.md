## Apollo Federation Demo with Commerce Tool and AEM GQL without sub graph

This repository is a demo for using Apollo Federation to connect to commerce tool GQL 3rd patry SASS which wiil be behind an oAuth authentication flow once we sucessully proff this integration next step is to connect with another SASS AEM GQL that we have to multiplex the data between commerce tools GQL and AEM GQL.

## Note

We will first proff that we will connect to Commerce and AEM GQL without spining up new graph than we will see if we have to write a sub graph to merge the response 


## TODO

1. Code Cleanup will do directly in JADE
2. Run Authentiaction flow
3. Once AEM is Deployed connect to AEM GQL


## Client ID, Secrete or Auth token will provide in teams

### Installation

To run this demo locally, pull down the repository then run the following commands:


Update the value of Auth token in line 11 poc-commerce-tool-with-federation-gateway/get-commerce-schema.js or create it with the POSTMAN collection provided

```sh
npm install
```

This will install all of the dependencies for the gateway.

Now run the gatewway

```sh
npm run start-gateway
```

Playground
```
http://localhost:4000
```

Query 
```
{
  products{
    results{
      id
      version
      productType{
        name
        attributeDefinitions{
          results{
            name
            type{
              name
            }
          }
          
        }
      }
    }
  }
}


```
