var request = require("request")
var jsonfile = require('jsonfile')

var url = "https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=2f5933819efdecf5d3773177bd309e9f9cff7463"

request({
    url: url,
    json: true
}, function (error, response, body) {
	if (!error && response.statusCode === 200) {
		//jsonfile.writeFile(file, body, function (err) {
		//	console.error(err)
		//})

		console.log("Station:", body[12].name)
		console.log("Vélos disponibles:", body[12].available_bikes)
		//var velosRestants = (body)
		//var  = (body["available_bikes"])
		}
	});