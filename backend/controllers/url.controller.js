const { application } = require("express");
let originalURL_Model = require("../models/originalURL");


//Finds the corisponding url from the encoded url sent from the user,
//REQUIRES REQUEST AND RESPONSE PARAMETERS
//REDIRECTS TO CORRECT URL OR SENDS ERROR RESPONSE
module.exports.find = async (req, res) => {
  const url = req.params.url;
  originalURL_Model.findOne({encodedURL:url})
  .then((url) => res.status(200).redirect(url.originalURL))
  .catch((e) => res.status(404).json(e))

};
//ADDS A NEW URL TO THE  DATABASE, REQUIRES REQUEST AND RESPONSE PARAMETERS.
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
  //IN SQL THIS WOULD B:
  //INSERT INTO url_TABLE VALUES (originalURL,encodedURL)
  const originalURL = req.query.urlp;
  const encodedURL = generateString(5);
  const newEntry = new originalURL_Model({
    originalURL,
    encodedURL,
  });
  newEntry.save()
  .then(()=>res.status(201).json(encodedURL))
  .catch((e)=>res.status(500).json("Url Insert Error: " +e));
};
