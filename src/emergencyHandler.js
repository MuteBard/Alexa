const Alexa = require('ask-sdk-core');

const EmergencyIntentHandler = {
    canHandle(handlerInput) {
        console.log("TEST TEST TEST", JSON.stringify(handlerInput))
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EmergencyIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Contacting Carl And Carla';
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
        const speakOutput = 'What is your emergency?';
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
        const speakOutput = `Even though I had trouble understanding what you have asked, I will contact Carl and Carla.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Lambda handler function
const emergencyHandler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        EmergencyIntentHandler,
        LaunchRequestHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .lambda();

module.exports = emergencyHandler;