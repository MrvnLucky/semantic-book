# Semantic Book
Semantic Book is a website created for searching data about books and authors stored in RDF turtle.

## Pre-requisites
* [Node](https://nodejs.org)
* [Apache Jena Fuseki](https://jena.apache.org)

## Usage

1. Install pre-requisites
2. Clone project
```bash
git clone https://github.com/MrvnLucky/semantic-book
```
3. Install Node dependencies
``` 
npm install
```
4. Run Apache Jena Fuseki on `port 3030` from installed directory in command prompt
```
fuseki-server
```
5. Import dataset from `/dataset/data.ttl` to Apache Jena Fuseki in `http://localhost:3030`

6. Run the website on `http://localhost:3000`
```
npm start
```

