const d3 = require("d3-sparql");

exports.getAll = (req, res) => {
  const url = "http://localhost:3030/semantic-book/sparql";
  const query = `
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  prefix b: <http://example.com/book#>
  prefix a: <http://example.com/author#> 
  prefix g: <http://example.com/genre#> 

  SELECT * 
  WHERE {
    ?subject
      a:name ?name;
      a:photoURL ?photoURL;
      a:birthday ?birthday;
      a:birthplace ?birthplace.
  }
  ORDER BY ?name
  `;

  d3.sparql(url, query)
    .then((data) => {
      console.log(data);
      res.render("authors", { data, title: "Authors" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.search = (req, res) => {
  const url = "http://localhost:3030/semantic-book/query";
  const params = req.query.search;
  const query = `
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  prefix book: <http://example.com/book#>
  prefix author: <http://example.com/author#> 
  prefix genre: <http://example.com/genre#> 

  SELECT * 
  WHERE {
    ?subject
      author:name ?name;
      author:photoURL ?photoURL;
      author:birthday ?birthday;
      author:birthplace ?birthplace;

    filter(regex(?name, "${params}", "i")|| regex(?birthday, "${params}", "i") || regex(?birthplace, "${params}", "i")) 
  }
  ORDER BY ?name
  `;

  d3.sparql(url, query)
    .then((data) => {
      console.log(data);
      res.render("authors", { data, title: "Result" });
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
      author:name ?name;
      author:photoURL ?photoURL;
      author:birthday ?birthday;
      author:birthplace ?birthplace.

    FILTER (?subject = author:${params})
  }
  `;

  d3.sparql(url, query)
    .then((data) => {
      console.log(data);
      res.render("authorDetail", { data, title: data.name });
    })
    .catch((err) => {
      console.log(err);
    });
};
