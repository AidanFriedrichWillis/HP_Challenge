import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {
  //REACT STATE VARIABLES, ALLOW FOR REACTIVE FUNTIONALITY
  let [url, setURL] = React.useState("");
  let [listOfURL, setlistOfURL] = React.useState([]);
  let [encodedURL, setEncodedURL] = React.useState("");

  //THIS RUNS ON COMPONENT START OR WHEN A STATE IS UPDATED
  //I just put it here to show I know what it is
  React.useEffect(() => {});
  //This is the funtion which sends our request to the server,
  //we use a POST method to match our servers routes
  //This funtion is taking in an event, and fetches data from the server

  async function createURL(e) {
    e.preventDefault(); //We prevent a page refresh from a form submmit
    const queryParams = { urlp: url };
    const queryString = new URLSearchParams(queryParams).toString(); //we make our url safe to send in the url link, I probably could have just put this in the body of the request.
    const response = await fetch(
      `http://localhost:5000/api/shorten?${queryString}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data); //returns and prints our response from the server, we are hoping for a 200 statud response code.
    await setEncodedURL("http://localhost:5000/api/" + data); //We set our state so we can see the new encoded url.
  }
  //manditory reuturn statement for a react funtional component, it is a basic form which takes in out original url
  return (
    //
    <>
      <Form onSubmit={createURL}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter original url</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL"
            onChange={(e) => setURL(e.target.value)}
          />
          <Form.Text className="text-muted">
            Create your smalled URL now!!
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={createURL}>
          Go
        </Button>
      </Form>
      <h1>
        <a href={encodedURL}>{encodedURL}</a>
      </h1>
    </>
  );
}

export default App;
