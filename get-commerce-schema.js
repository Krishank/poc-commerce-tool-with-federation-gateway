const { fetch } = require("cross-fetch");
const { print } = require("graphql");
const { wrapSchema, introspectSchema } = require("@graphql-tools/wrap");
const { transformSchemaFederation } = require("graphql-transform-federation");

const executor = async ({ document, variables }) => {
    const query = print(document);
    const fetchResult = await fetch("https://api.europe-west1.gcp.commercetools.com/cos-australia/graphql", {
        method: "POST",
        headers: {
            "Authorization": "Bearer "
        },
        body: JSON.stringify({ query, variables }),
    });
    return fetchResult.json();
};

module.exports = async () => {
    const schema = wrapSchema({
        schema: await introspectSchema(executor),
        executor,
    });

    return transformSchemaFederation(schema, {
        Query: {
            extend: true,
        },
    });
};