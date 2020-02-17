sources:
	- https://vivacitylabs.com/setup-typescript-sequelize/
    - https://medium.com/@phcollignon/node-rest-api-jwt-in-typescript-e6a8ae5cd8f8 

notes:
	- promise structure should be reworked
	- password salt not present
	- auth check should(?) be done with hooks
	- encryption secret is currently hardcoded
	- state codes are not always correct, e.g. most errors return 500
	- assumption: post creation needs text+title as parameter
    - in the tests, the last test is commented out since seems to alway return all posts and 
      not the one specified. Do no know the reason yet, it works fine when tested with curl

how to run:
    - yarn install
    - yarn start
    - node tests.js



 
