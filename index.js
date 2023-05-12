const core = require('@actions/core');

try {
  // Get the input JSON string from the environment variable
  const inputJson = process.env.INPUT_JSON;

  // Parse the input JSON string into a JSON object
  const parsedJson = JSON.parse(inputJson);

  // Set the parsed JSON object as the output of this step
  core.setOutput('parsed-json', parsedJson);
} catch (error) {
  core.setFailed(error.message);
}