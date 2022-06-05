const d3 = require("d3-sparql");

exports.getAll = (req, res) => {
  const url = "http://localhost:3030/semantic-book/sparql";
  const query = `
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  prefix book: <http://example.com/book#>
  prefix author: <http://example.com/author#> 
  prefix genre: <http://example.com/genre#> 
  
  SELECT *
  WHERE {
    ?subject
      book:title ?title;
      book:publishYear ?publishYear;
      book:description ?description;
      book:photoURL ?photoURL;
      book:author ?author;
      book:genre ?genre.
    ?author author:name ?authorName.
    ?genre genre:name ?genreName.
  }
  ORDER BY ?title
  `;

  d3.sparql(url, query)
    .then((data) => {
      console.log(data);
      res.render("index", { data, title: "Home" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.search = (req, res) => {
  const params = req.query.search;
  const url = "http://localhost:3030/semantic-book/query";
  const query = `prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix book: <http://example.com/book#>
  prefix author: <http://example.com/author#> 
  prefix genre: <http://example.com/genre#> 

  SELECT * 
  WHERE {
    ?subject
      book:title ?title;
      book:publishYear ?publishYear;
      book:description ?description;
      book:photoURL ?photoURL;
      book:author ?author;
      book:genre ?genre.
    ?author author:name ?authorName.
    ?genre genre:name ?genreName.

    filter(regex(?title, "${params}", "i")|| regex(?publishYear, "${params}") || regex(?authorName, "${params}", "i") || regex(?genreName, "${params}", "i"))
  }
  ORDER BY ?title
  `;
  d3.sparql(url, query)
    .then((data) => {
      console.log(data);
      res.render("index", { data, title: "Results" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOne = (req, res) => {
  const params = req.params["id"];
  const url = "http://localhost:3030/semantic-book/query";
  const query = `
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix book: <http://example.com/book#>
  prefix author: <http://example.com/author#> 
  prefix genre: <http://example.com/genre#> 
  SELECT *
  WHERE {
    ?subject
      book:title ?title;
      book:publishYear ?publishYear;
      book:description ?description;
      book:photoURL ?photoURL;
      book:author ?author;
      book:genre ?genre.
    ?author author:name ?authorName.
    ?genre genre:name ?genreName.

    FILTER (?subject = book:${params})
  }
  `;

  d3.sparql(url, query)
    .then((data) => {
      console.log(data);
      res.render("bookDetail", { data, title: data.title });
    })
    .catch((err) => {
      console.log(err);
    });
};
