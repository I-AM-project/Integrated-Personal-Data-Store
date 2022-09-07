# Aries Personal Data Store 

## Introduction
This is an architecture for a database designed to store verifyable credentials and other miscellanious information associated with an Aries agent. It is intended to run on the cloud, and can serve several users while still guaranteeing that only the user can access their data. Data would be stored as an RDF graph using <a href=https://www.w3.org/TR/turtle/>turtle</a>, <a href=https://www.w3.org/TR/rdf-syntax-grammar/>XML</a>, or similar. The data would be standardized using the classes provided in the <a href=https://github.com/I-AM-project/my-data-ontology>My Data Ontology</a>, build on the <a href=https://github.com/CommonCoreOntology/CommonCoreOntologies>Common Core Ontolgy</a>, which is an extension of the <a href=https://github.com/BFO-ontology>Basic Formal Ontology</a>.

## What's included

`./pds-middleware`

&emsp;Containers the node server for the middleware. This folder is also a docker volume for the node container.

`./pds-middlware/backend`
&emsp; An Express Typescript server that host the api for the personal data store. The server's purpose is to interface with the triple store by crafting sparql 
queries. 

`./pds-middlware/frontend`
&emsp; A React Webapp that displays a person's data and credentials. The front end sends http requests when it needs to Create, Udpate, Read, Destroy data. 


`./triple-store`

&emsp;The Docker Volume for the Apache Jena Fuseki. Do not edit this file unless you want to directly modify the Fuseki backup 

`./docker-compose.yml`

&emsp;The docker-compose file that defines a docker network and 2 containers - Triple Store and Middleware


## Getting Started

### What to install  
> All the components of the Aries PDS run inside docker containers. Use the links provided below to install docker and docker-compose
1. Install docker [here](https://docs.docker.com/get-docker/)
2. Install docker-compose [here](https://docs.docker.com/compose/install/)

### How to Run

1. Decide what mode you want to run the server in.
- Production Mode: Run the platform over https at the address: https://iamtestingbed.com/
- Testing Mode: Run the platform over http at <ip address>:80
> To set the different mode, navigate to the file ./pds-middleware/backend/serverConfig.ts and send the value for production


2. ```docker-compose up -d``` 
> Docker-compose creates two docker containers. The first container is an apache jena fuseki triple store. The seconds is a node server that runs a middleware. 

3. ```docker-compose down``` 
> To stop all the containers

### How to Access the triple store Web Interface
Jena fuseki runs a web interface that allows developers to run queries and input data. To access the web interface locally visit [http://localhost:3030/](http://localhost:3030/) in your internet browser

### Middleware API 

> ### My Wallet Endpoints

1. listAllConnections

```javaScript
/**
 *  Sends a request to the Trinsic API to list all the credentials. 
 *  @param {string} walletId: The Wallet Id
 *  Status: Done
 *  @CR
 */
app.post('/api/listAllConnections', async (request: Request<string, any>, response: Response)
```

2. listCredentialsInWallet
```javaScript
/**
 * Sends a request to Trinisc API to list all the credential in a wallet
 * @param {string} walletId: The Wallet Id
 * Status: Done
 * @CR
 */
app.post('/api/listCredentialsInWallet', async (request: Request<string, any>, response: Response)
```

3. getCredentialsInWallet
```javaScript
/**
 *  Sends a request to Trinisc API to get a specific credential given a credential Id
 * @param {string} walletId: The Wallet Id
 * @param {string} credentialId: The credential Id
 * Status: Done
 * @CR
 */
app.post('/api/getCredentialInWallet', async (request: Request<string, any>, response: Response)
```

4. deleteCredential
```javaScript
/**
 * Sends a request to the Trinsic API to delete a given credential given a credential Id
 * @param {string} walletId: The Wallet Id
 * @param {string} credentialId: The credential Id
 * Status: Done
 * @CR
 */
app.delete('/api/deleteCredential', async (request: Request<string, any>, response: Response)
```

5. AcceptCredential
```javaScript
/**
 * Sends a request to the Trinsic API to delete a given credential given a credential Id
 * @param {string} walletId: The Wallet Id
 * @param {string} credentialData: The url for the Credn
 * Status: Done
 * @CR
 */
app.post('/api/AcceptCredential', async (request: Request<string, any>, response: Response)
```

6. createWallet
```javaScript
/**
 * Sends a request to the Trinsic Wallet to create a digital Wallet. If there already is a wallet,
 * sends a response indicating the current wallet
 * Status: Done
 * @CR
 */
app.put('/api/createWallet', async (request: Request<string, any>, response: Response)
```
7. DeleteCloudWallet
```javaScript
/**
 * Sends a request to the Trinsic API to delete a cloud wallet 
 * @param {string} walletId: The ID for the digital Wallet
 * Status: Update the triples 
 * @CR
 */
app.delete('/api/DeleteCloudWallet', async (request: Request<string, any>, response: Response)
```

8. DeleteAllCloudWallet
```javaScript
/**
 * Sends a request to the Trinsic API to delete ALL cloud wallet 
 * Status: Update the triples 
 * @CR
 */
app.delete('/api/DeleteAllCloudWallet', async (request: Request<string, any>, response: Response)
```

9. getWallet
```javaScript
/**
 * Sends a request to the Trinsic API to get the current wallet
 * Status: Done
 * @CR
 */
app.get('/api/getWallet', async (request: Request<string, any>, response: Response)
```

> ### My Data Endpoints

1. getPersonIRI
```javaScript
/**
 * Sends a query to the triple store to get the IRI for the Person
 * Status: Done
 * @CR
 */
app.get('/api/getPersonIRI', (request: Request<string, any>, response: Response)
```

2. createNewUser
```javaScript
/**
 * Creates a new user in the triple store. If there is already a user, sends the IRI 
 * of the current person
 * Status: Done 
 * @CE 
 */
app.put('/api/createNewUser', (request: Request<string, any>, response: Response)
```

3. createMyData
```javaScript
/**
 * Creates triples for the an attribute in the Verifiable Credential and uploads the data into the triple store
 * @param {string} person: The IRI of the person 
 * @param {string} attribute: The attribte that you want to create
 * @param {string} value: The value of the attribute
 * @param {string} verifiableCredentialId: The id for the Verifiable Credential
 * Status: In Progress Fix createMyDataFunction and test
 * @CR
 */
app.put('/api/createMyData', (request: Request<string, any>, response: Response)
```

4.readMappedAttributes
```javaScript
/**
 * Sends the current attribute that have been mapped in the My Data Ontology
 * Status: Done 
 * @Cr
 */
app.get('/api/readMappedAttributes', (request: Request, response: Response)
```
5. readMyData
```javaScript
/**
 * Queries the triple store to get all a person's data 
 * Status: Done
 * @CR
 */
app.get('/api/readMyData', (request: Request, response: Response)
```

6.readTriples
```javaScript
/**
 * Reads triples from triple store
 * Status: Unknown
 */
app.post('/dev/readTriples', (request: Request, response: Response)
```

7. getOntologyMapping
```javaScript
/**
 * Returns Onotology Mapping
 * Status: Unknown
 */
app.get('/dev/getOntologyMapping', (request: Request, response: Response)
```

8. createTriples
```javaScript
/**
 * Creates Triples inside triple store
 * Status: In Process
 */
app.post('/dev/createTriples', (request: Request, response: Response)
```

### Testing Issues

<!-- ## Input format
The server would receive PUT, POST, and GET requests from the agent. Before anything else, it would check that the agent is authorized to use the data it is trying to access (the details will vary depending on the chain provider; in Sovrin's case, you would use the policy oracle). All requests would have a path parameter with the rdfs:label property of the class they are using to represent the data. The ontology would be either stored locally on the machine with the server or queried from a separate database. 
### POST requests
POST requests would add the class to the triples in the user's triple store.
### PUT requests
PUT requests would update the values associated with the class.
### GET requests
GET requests would cause the server to retrieve the properties of the class. Each class would have predetermined properties that it would be associated with.

## Encryption and security
The database would use a scheme somewhat similar to password manager services. All of the data on the server would be encrypted via AES-GCM. Each file would store the encryption key used to encrypt the data. <b>The key would be stored encrypted with the agent's public key. Note that this means the server cannot decrypt the triples on its own.</b> The encrypted data and key would be sent to the agent upon a GET request. Note that, for several agents to access the same data, there must be a copy for each agent, and changes would need to be applied to every copy. The encryption_example.py file in the repository showcases how this encryption scheme would work on the server side.
### Implications
This scheme prevents the cloud service provider from reading or sharing the data aggregated on the server without permission. It also offers protection if the server is hacked. It offers no protection from an agent getting hacked. For this reason, it is recommended to try to find a service that allows agents to be given specific, narrow permissions. This server can service an arbitrary number of agents without risk of them reading each others' data, even if there is a flaw in the authentication, assuming the encryption is done safely.  
### Server usage
Note that this encrypted storage scheme means that creating a single server for each person is not necessary. In fact, doing so would be a serious security risk. If only one person is accessing a given server, and that server is publically queryable from the internet (even if the queries just return an error message), the server may be vulnerable to side-channel attacks. For example, if an attacker notices the system tends to slow down at 6:00 PM, they may deduce that the user is engaging in a large amount of internet activity at that time each day. For this reason, <b>it is strongly recommended to avoid creating a single server for each user, unless that server is restricted to their local network!</b>

## Implementation recommendations
For performance reasons, it is probably best to use the Rust programming language for this server. Remember, this is going to be involved in nearly every interaction on the internet; it absolutely, positively has to run as efficiently as possible. This is why I also recommend writing as much of the code as possible in C and calling it through Rust. C gives you access to hardware-specific optimization options, such as using the aesenc instructions available on most x86 processors, which would likely grant a massive performance boost. Don't forget that AES-GCM is parallelizable! You could easily encrypt blocks in parallel using openmp, pthreads, or similar. The importance of performance is also why I am recommending building a new database architecture, instead of building on top of an existing one. Building on an existing architecture would likely be significantly slower. Doing it this way allows for performance and storage to be optimized for this specific storage scheme.
### PUT
I forsee PUT requests being the biggest challenge of creating this server because the server cannot read the data. You could do this by simply making the database append-only, but the storage requirements would likely get out of hand. I would recommend appending the changes, and then having the agent update the information and send it back to the server when they recieve it. -->