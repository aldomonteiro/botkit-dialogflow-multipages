const env = require('node-env-file')(__dirname + '/.env'),
      express = require('express'),
      bodyParser = require('body-parser'),
      querystring = require('querystring'),
      Botkit = require('botkit');

const DEBUG = process.env.DEBUG === 'false' ? false : true;
const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
const POOL_PORT = process.env.POOL_PORT || 3000;
const webserver = express();

const dialogflow = require('botkit-middleware-dialogflow')({
    keyFilename: process.env.dialogflow,  // service account private key file from Google Cloud Console
});  

const pages = [
    { // First page
        pageID: '', // Page ID here (Echobot)
        pageToken: '' // Page token here
    },
    { // Second page
        pageID: '', // Another page ID here (Koraline)
        pageToken: '' // Another page token here
    }
    // more pages here...
];

webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({extended: true}));

let controllers = {};

for (let i = 0; i < pages.length; i++) {

    let fbPage = pages[i];
    let pageToken = fbPage.pageToken;
    let pageID = fbPage.pageID;

    controllers[pageID] = Botkit.facebookbot({
        debug: DEBUG,
        verify_token: FB_VERIFY_TOKEN,
        access_token: pageToken
    });

    webserver.post('/facebook/' + pageID + '/receive', function(req, res) {
        let pid = req.url.split("/")[2],
            bot = controllers[pid].spawn({});
        controllers[pid].handleWebhookPayload(req, res, bot);
        res.end();
    });

    controllers[pageID].middleware.receive.use(dialogflow.receive);
    controllers[pageID].webserver = webserver;

    controllers[pageID].hears(['hello'], 'message_received', function(bot, message) {
        bot.reply(message, 'Hey there. I\'m '+ bot.identity.name);
    });

    controllers[pageID].hears(['Default-WelcomeIntent'], 'message_received,facebook_postback', dialogflow.hears, function(
        bot,
        message
      ) {
        const replyText = message.fulfillment.text;
        bot.reply(message, replyText);
      });
}

webserver.listen(POOL_PORT, null, function() {
    console.log('Listening at 127.0.0.1:' + POOL_PORT);
});

