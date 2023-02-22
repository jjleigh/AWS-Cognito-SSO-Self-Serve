import { 
	CognitoIdentityProviderClient, 
	ListUsersCommand, 
	AdminGetUserCommand,
	AdminDisableUserCommand,
	AdminEnableUserCommand,
	ListIdentityProvidersCommand,
  DescribeIdentityProviderCommand,
	CreateIdentityProviderCommand,
	DeleteIdentityProviderCommand,
	UpdateIdentityProviderCommand,
  UpdateUserPoolClientCommand,
  DescribeUserPoolClientCommand
} from "@aws-sdk/client-cognito-identity-provider";
import { Auth } from 'aws-amplify';

/**
 * Get cognito clients based on authenticated login
 */
let cognitoIdentityProviderClient;

const getCognitoIdentityProviderClient = async (region) => {
  if (!cognitoIdentityProviderClient) {
    const { 
      accessKeyId, 
      secretAccessKey, 
      sessionToken 
    } = await Auth.currentCredentials();

    cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
      region,
      credentials: {
        accessKeyId, 
        secretAccessKey, 
        sessionToken 
      }
    });
  }
  return cognitoIdentityProviderClient;
};

/**
 * Fetch list of users in the userpool.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @returns Object with list of users
 */
export const listUsers = async (userpoolId, region) => {
	let request = { UserPoolId: userpoolId };
  const command = new ListUsersCommand(request);

  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);
    console.debug("COGNITO LIST USERS RESPONSE: ", response);
    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};

/**
 * Fetch details for a user.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @param {*} username - The user name of the user you want to retrieve
 * @returns Object with user data
 */
export const getUser = async (userpoolId, username, region) => {
  let request = { UserPoolId: userpoolId, Username: username };
  const command = new AdminGetUserCommand(request);

  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};

/**
 * Makes a request to disable user.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @param {*} username - The user name of the user you want to retrieve
 */
export const disableUser = async (userpoolId, username, region) => {
  let request = { UserPoolId: userpoolId, Username: username };
  const command = new AdminDisableUserCommand(request);

  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};

/**
 * Makes a request to enable user.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @param {*} username - The user name of the user you want to retrieve
 */
export const enableUser = async (userpoolId, username, region) => {
  let request = { UserPoolId: userpoolId, Username: username };
  const command = new AdminEnableUserCommand(request);

  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};

/**
 * Fetch list of identity providers in the userpool.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @returns Object with list of identity providers
 */
export const listIdentityProviders= async (userpoolId, region) => {
  let request = { UserPoolId: userpoolId };
  const command = new ListIdentityProvidersCommand(request);

  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};

/**
 * Fetch identity provider.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @param {*} providerName - The IdP name
 * @returns Object identity provider data
 */
export const getIdentityProvider= async (userpoolId, providerName, region) => {
  let request = { UserPoolId: userpoolId, ProviderName: providerName };
  const command = new DescribeIdentityProviderCommand(request);

  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};

/**
 * Makes a request to create a SAML Identity provider.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @param {*} providerName - The IdP name
 * @param {*} providerType - The IdP type - Possible values: [ SAML ]
 * @param {*} providerDetails - The IdP details - MetadataFile or MetadataURL
 * @param {*} attributeMapping - The The IdP attribute mapping to be changed
 */
export const createIdentityProvider = async (userpoolId, providerName, providerType, providerDetails, region) => {
  let request = { 
    UserPoolId: userpoolId, 
    ProviderName: providerName,
    ProviderType: providerType, 
    ProviderDetails: providerDetails,
    AttributeMapping: {
      "Email": "http://shemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    } 
  };
  const command = new CreateIdentityProviderCommand(request)

  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};

/**
 * Makes a request to delete a SAML Identity provider.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @param {*} providerName - The IdP name
 */
export const deleteIdentityProvider = async (userpoolId, providerName, region) => {
  let request = { UserPoolId: userpoolId, ProviderName: providerName };
  const command = new DeleteIdentityProviderCommand(request);

  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response.Users;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
}; 

/**
 * Makes a request to update a SAML Identity provider.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @param {*} providerName - The IdP name
 * @param {*} providerDetails - The IdP details to be updated, such as MetadataURL and MetadataFile
 */
export const updateIdentityProvider = async (userpoolId, providerName, providerDetails, region) => {
  let request = { 
    UserPoolId: userpoolId, 
    ProviderName: providerName,
    ProviderDetails: providerDetails
  };
	const command = new UpdateIdentityProviderCommand(request);
  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};

/**
 * Makes a request to update a userpool client.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @param {*} clientId - The ID of the client associated with the user pool
 * @param {*} supportedIdentityProviders - A list of provider names for the IdPs that this client supports
 */
export const updateUserpoolClient = async (
  userpoolId, clientId, supportedIdentityProviders, redirectUrl, scopes, responseType, region
) => {
  let request = { 
    UserPoolId: userpoolId, 
    ClientId: clientId,
    SupportedIdentityProviders: supportedIdentityProviders,
    CallbackURLs: [redirectUrl],
    AllowedOAuthFlows: [responseType],
    AllowedOAuthScopes: scopes.split("+"),
    ExplicitAuthFlows: ['ALLOW_USER_PASSWORD_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH', 'ALLOW_CUSTOM_AUTH', 'ALLOW_USER_SRP_AUTH'],
  };
  const command = new UpdateUserPoolClientCommand(request);
  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};

/**
 * Makes a request to fetch userpool client details.
 * @param {*} userpoolId - The user pool ID for the user pool where you want to get information about the user
 * @param {*} clientId - The ID of the client associated with the user pool
 */
export const getUserpoolClient = async (userpoolId, clientId, region) => {
  let request = { 
    UserPoolId: userpoolId, 
    ClientId: clientId,
  };
  const command = new DescribeUserPoolClientCommand(request);
  try {
    let client = await getCognitoIdentityProviderClient(region);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error('Could not connect to Cognito to:', error);
  }
};
