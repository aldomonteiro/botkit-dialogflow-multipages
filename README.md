# botkit-dialogflow-multi-pages

I am proud to bring you botkit-dialogflow-multi-pages. A chatbot based on [botkit](https://github.com/howdyai/botkit) that can be integrated to several Facebook pages and an unique Dialogflow instance.

This is project is based on the very clever [botkit-multi-fb-pages](https://github.com/danieledp/botkit-multi-fb-pages), that handles queries from several facebook pages plus [botkit-middleware-dialogflow](https://github.com/jschnurr/botkit-middleware-dialogflow), that integrates the botkit with Dialogflow.

### **The idea**

The idea is to integrate an instance of Dialogflow and use its configuration to postback queries from users in several facebook pages.

[Here](https://github.com/danieledp/botkit-multi-fb-pages) there are the instructions to setup several Facebook pages, so, the system can hear queries from all of them.

### Usage

```shell
git clone https://github.com/aldomonteiro/botkit-dialogflow-multipages && cd botkit-dialogflow-multipages
npm install node-env-file request express 
npm install botkit botkit-middleware-dialogfow
node start.js
```

Enjoy!