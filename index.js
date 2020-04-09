var request = require("request");
var tokens = require("./tokens");
var md5 = require("md5");

const observationId = 14772719;

for (let i = 0; i < 10; i++) {
  const authorization = i % 2 === 0 ? tokens.harsh : tokens.stillForest;
  const message = i % 2 === 0 ? "u#harsh1" : "u#still-forest";
  const options = {
    method: "POST",
    url: "https://venus.strandls.com/observation-api/api/v1/observation/add",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      authorization,
      accept: "application/json, text/plain, */*",
    },
    body: JSON.stringify({
      body: `${message} md5#${md5(authorization)}`,
      rootHolderId: observationId,
      rootHolderType: "observation",
      subRootHolderId: null,
      subRootHolderType: null,
    }),
  };
  console.log(`Fetch @ ${message} md5#${md5(authorization)}`);
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
}
