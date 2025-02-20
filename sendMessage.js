import request from "request";

const access_token_page =
  "EAAOZAc20KpL0BOZCnfTJLCXUHTsxbYRrvZBSFxbpxNhZBhhwG7ENE1NjUAE1nn8kQK0u0Emi3nXInX85ZBpjstpHfmPZCMXccOm7EZApNCcYgVX4fk3g3Am7F1UaStdP4kZAKELj8BiZCRO7vBan6TofGM2QczkOiW0rPkEUeEOIs77KCgklkSyuEWeVGDUmaeiAZD";

export default function sendMessage(senderId = 6726621144055847, message) {
  request({
    url: "https://graph.facebook.com/v17.0/me/messages",
    qs: {
      access_token: access_token_page,
    },
    method: "POST",
    json: {
      recipient: {
        id: senderId,
      },
      message: {
        text: message,
      },
    },
  });
}
