var request = require("request")
var jsonfile = require('jsonfile')
require('dotenv').config()

var url = "https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=2f5933819efdecf5d3773177bd309e9f9cff7463";
var stationSearched = '20043';

request({
    url: url,
    json: true
}, function (error, response, body) {
	var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); 
	if (!error && response.statusCode === 200) {
		for (var i = 0; i < body.length; i++){
			if (body[i].number == stationSearched && body[i].available_bikes < 5){
				console.log("Station:", body[i].name)
				console.log("Vélos disponibles:", body[i].available_bikes)
				client.messages.create({ 
					to: "+33782171637",
					from: "+33644643476", 
					body: "Il reste actuellement "+ body[i].available_bikes +" vélos à la station "+ body[i].name+"", 
					}, function(err, message) {
						if(err){
							console.log(err);
						} else {
							console.log(message.body);
					}
				});
			}
		}
	}
	else {
		console.error(error)
	}
});