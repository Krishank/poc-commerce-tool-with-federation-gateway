## Apollo Federation Demo with Commerce Tool and AEM GQL without sub graph

This repository is a demo of using Apollo Federation to connect to commerce tool GQL which wiil be behind an authentication the postman collection is updated in repo to play in postman once we can sucessully connect to another SASS 3rd party GQL which is in our case commerce tools GQL we will connect to AEM GQL than will try to merge the data of both.

## Note

We will first proff that we will connect to Commerce and AEM GQL without spining up new graph than we will see if we have to write a sub graph to merge the response of both




## TODO

1. Code Cleanup also conver more in TS
2. Run Authentiaction flow
3. Once AEM is Deployed connect to AEM GQL


## Client ID, Secrete or Auth token will provide in internal tool

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