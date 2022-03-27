import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

function App() {

  let [url, setURL] = React.useState("");
  let [listOfURL, setlistOfURL] = React.useState([]);
  let [encodedURL, setEncodedURL] = React.useState("");

  React.useEffect(()=>{



  })

  async function createURL(e){
    e.preventDefault();
    const queryParams = { urlp:url }
    const queryString = new URLSearchParams(queryParams).toString()

    const response = await fetch(`http://localhost:5000/api/shorten?${queryString}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
  });
  const data = await response.json();
  console.log(data);
  await setEncodedURL("https://localhost:5000/api/"+data);
  }
  


  return (
    <>
       <Form onSubmit={createURL}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label >Enter original url</Form.Label>
    <Form.Control type="text" placeholder="URL" onChange={(e) => setURL(e.target.value)}/>
    <Form.Text className="text-muted">
      Create your smalled URL now!!
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit" onClick={createURL}>
    Go
  </Button>
  </Form>
    <h1>
      
      <a href={encodedURL}>Visit W3Schools.com!</a>

    </h1>


    </>
  );
}

export default App;
