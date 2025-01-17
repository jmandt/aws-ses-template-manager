# Semplates AWS SES Template Manager

[Semplates](https://semplates.io) offers a graphical user interface to manage templates on AWS SES. If you are using our services, 
this repository can help you to deploy a Lambda function to AWS in order to easily send out automated emails to your users.
If you do not want to use a Lambda function to send transactional emails, you can use the code provided in this repository and integrate it into you application.

## Features of Semplates for AWS Simple Email Service:
- Import existing AWS SES templates.
- Update, duplicate, or delete templates without using the CLI.
- Directly send test emails from within the service.
- Increase productivity for product and development teams.
- Contribute to the templates easily from different departments.

> **Note:** Semplates does not offer an API to track and monitor sending statistics for templates managed via our service. Automated emails still need to be sent via the backend of the user's service using AWS SDKs.

This repository provides:
- A base to easily set up AWS SES with Terraform.
- Examples to send emails based on templates via Lambda functions.
- Examples are currently in Python only. JavaScript, Go and Java will follow soon.
- A Github Pipeline to directly setup AWS SES with Terraform and deploy a function to send transactional emails in AWS Lambda

## How to use the Pipeline to directly deploy from within this repository

### Prerequisites

- An AWS account
- Forked copy of this repository

### Setting Up

1. **Fork the Repository**: Click on the 'Fork' button in the top-right corner of this repository to create your own copy.

2. **AWS Credentials**: Ensure you have your AWS credentials set up. If not, follow our [guide to setting up AWS credentials locally](#aws-credentials-setup).

3. **Environment Variables**: For the pipeline to work, you need to set up the following environment variables:
    - `AWS_ACCESS_KEY_ID`: Your AWS access key.
    - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
    - `AWS_REGION`: Your AWS default region (e.g., `us-west-1`).
    - `SENDER_EMAIL`: The email address from which emails will be sent.

4. **Run the Pipeline**: Once the environment variables are set, trigger the pipeline. This will:
    - Set up the Lambda function.
    - Deploy a test template using Terraform.
    - Verify the email addresses provided (please check your email inbox and confirm).

5. **Send a Test Email**: 
   1. After email verification, you will need to sign in to the AWS Management Console and check your [AWS Lambda Functions](https://eu-central-1.console.aws.amazon.com/lambda)
   2. Select the test tab and enter the following Event JSON:
      ```json
      {
         "receiver_email": "<receiver-email>",
         "sender_email": "<sender-email>",
         "template_name": "SEMPLATES_DEMO_TEMPLATE",
         "placeholders": {
            "FIRST_NAME": "Jonathan",
            "LAST_NAME": "Doe"
         }
      }
      ```
   3. Hit the test button. The result should show:
      ```json
      {
        "statusCode": 200,
        "body": {
          "message": "Email sent successfully!"
        }
      }
      ```
   