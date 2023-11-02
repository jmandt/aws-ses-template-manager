import { SendTemplatedEmailCommand, SESClient } from "@aws-sdk/client-ses";

// Set up the AWS SES client.
const region = process.env.AWS_REGION;
const sesClient = new SESClient({region});

const sendTemplatedEmail = async (receiverEmail, templateName, senderEmail, templateData) => {
  try {
    const params = {
      Source: senderEmail,
      Destination: {
        ToAddresses: [receiverEmail],
      },
      Template: templateName,
      TemplateData: JSON.stringify(templateData),
    };

    const command = new SendTemplatedEmailCommand(params);
    const response = await sesClient.send(command);
    console.log(`Email sent! Message ID: ${response.MessageId}`);
    return {
      statusCode: 200,
      body: JSON.stringify({message: 'Email sent successfully!'}),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({error_message: error.message}),
    };
  }
};

export const lambdaHandler = async (event, context) => {
  try {
    const {receiverEmail, senderEmail, templateName, placeholders} = event;
    return await sendTemplatedEmail(receiverEmail, templateName, senderEmail, placeholders);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({errorMessage: `Missing key in input: ${error.message}`}),
    };
  }
};

// Run locally if this file is executed directly
if (process.env.NODE_ENV !== 'production') {

  const event = {
    "receiverEmail": "jonathan@semplates.io",
    "senderEmail": "jonathan@semplates.io",
    "templateName": "SEMPLATES_DEMO_TEMPLATE",
    "placeholders": {
      "FIRST_NAME": "value1",
      "LAST_NAME": "value2"
    }
  }

  lambdaHandler(event, {}).then(console.log).catch(console.error);
}
