const { application } = require("express");
const originalURL = require("../models/originalURL");
let originalURL_Model = require("../models/originalURL");

//This wouldn't exist in a real world senario, I just thought Its easier becuase it contains it to the code for you.
let db = [];

//Finds the corisponding url from the encoded url sent from the user,
//REQUIRES REQUEST AND RESPONSE PARAMETERS
//REDIRECTS TO CORRECT URL OR SENDS ERROR RESPONSE
module.exports.find = async (req, res) => {
  const url = req.params.url;
  let fullURL;
  //Simulated search funtionalilty for a DB,
  //In SQL I would use:
  //SELECT originalURL FROM url_TABLE WHERE encodedURL = url
  for (let i = 0; i < db.length; i++) {
    if (db[i].encodedURL == url) {
      fullURL = db[i].originalURL;
      break;
    }
  }

  if (fullURL) {
    try {
      res.status(200).redirect(fullURL); //status 200 for a succsesfull result
    } catch (e) {
      res.send(e);
    }
  } else {
    res.status(404).json("Not Found"); //sends 404 if not found
  }
};
//ADDS A NEW URL TO THE SIMULATED DATABASE, REQUIRES REQUEST AND RESPONSE PARAMETERS.
//RETURNS OR SENDS A RESPONSE BACK TO THE CLIENT

//In the future this would check the generated string against the saved ones to check its not repeated.
//A good feature would also be seeing if the incoming URL has already been saved, this would save creating a new entry.

module.exports.add = async (req, res) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  //I HAVE SIMULATED MY DATABASE INSERT METHOD BY JUST INSERTING THE OBJECT INTO THE LIST
  //IN SQL THIS WOULD B:
  //INSERT INTO url_TABLE VALUES (originalURL,encodedURL)
  const originalURL = req.query.urlp;
  const encodedURL = generateString(5);
  console.log(encodedURL);
  const newEntry = new originalURL_Model({
    originalURL,
    encodedURL,
  });
  db.push(newEntry);
  res.status(201).json(encodedURL); //201 code, Created succsess.
};
