var querystring = require("querystring");

var client_id = "8f0e3f494da346d49d634302a24dd8e0"; // Your client id
var client_secret = "a0c86002919446e38819369175deae4b"; // Your secret
var redirect_uri = "http://localhost:3000/api/auth/callback"; // Your redirect uri
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

const handler = async (req, res) => {
  if (req.method == "GET") {
    var state = generateRandomString(16);
    var scope = "user-read-private user-read-email";
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  }
};
export default handler;
