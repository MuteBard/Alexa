const Alexa = require('ask-sdk-core');

const MuteBotIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MuteBotIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello, world! I am Mutebot';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Handler for LaunchRequest
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to the skill!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Error handler
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again Kupo.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Lambda handler function
const helloHandler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        MuteBotIntentHandler,
        LaunchRequestHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .lambda();

module.exports = helloHandler;