
function sendSlack(text)
{
  var jsonData =
  {
     "username" : "kinQ-bot",
     "icon_emoji": "email",
     "text" : text
  };
  var payload = JSON.stringify(jsonData);
  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };
  Logger.log(text);
  UrlFetchApp.fetch(slackApiUrl, options);
}

function Debug(){
  var date = new Date()
  Logger.log(Utilities.formatDate(date, "JST", "MM/dd (E) HH:mm"))
}

function myFunction() {
  var threads = GmailApp.search("ＫｉｎＱ.ｊｐ is:unread",0,1)
  var messages = GmailApp.getMessagesForThreads(threads); 
  if (messages.length > 0){
    var message = messages[0]
    message[0].markRead()
    var body = message[0].getPlainBody()
    var subject = message[0].getSubject()
    var date = Utilities.formatDate(message[0].getDate(), "JST", "MM/dd (E) HH:mm")
    if (!body.match(/田村/)){
      Logger.log("*Subject:* "+subject+"\n*Date:*"+date+"\n*body*\n>>>"+body)
      sendSlack(" *Subject:* "+subject+"\n *Date:* "+date+"\n *body* \n>>>"+body)
    }
  }
}
