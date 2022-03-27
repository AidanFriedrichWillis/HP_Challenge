const { application } = require("express");
const originalURL = require("../models/originalURL");
let originalURL_Model = require("../models/originalURL");


let db = [];


module.exports.find =async (req,res) => {

    const url = req.params.url;
    let fullURL;
    for(let i = 0; i <db.length; i++){
        if(db[i].encodedURL == url){
            fullURL = db[i].originalURL;
            break;
        }   
    }

    if(fullURL){
        try{
            res.status(200).redirect(fullURL);
        }
        catch(e){
            res.send(e);
        }
    }
    else{
        res.status(404).json("Not Found");
    }

   
      


}

module.exports.add = async (req,res) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

    const originalURL = req.query.urlp;
    const encodedURL = generateString(5);
    console.log(encodedURL)
    const newEntry = new originalURL_Model({
        originalURL,
        encodedURL
    })
    db.push(newEntry);
    res.status(200).json(encodedURL);
}