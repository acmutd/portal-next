// import { StartExecutionCommand } from '@aws-sdk/client-sfn';
// import { createStepFunctionInstance } from '../aws/setup';
// import { v4 as uuid } from 'uuid';
import axios from 'axios';

interface Vanity {
  destination: string;
  primaryDomain: string;
  subdomain: string;
  slashtag: string;
}

export interface VanityReqBody extends Vanity {
  firstName: string;
  lastName: string;
  email: string;
}

interface VanityLinkPayload {
  firstName: string;
  lastName: string;
  email: string;
  destination: string;
  primaryDomain: string;
  subdomain: string;
  slashtag: string;
}

export async function generateVanityLink(payload: VanityLinkPayload) {
  // Depreciate step function 

  // const stepFunction = createStepFunctionInstance();

  // return stepFunction.send(new StartExecutionCommand({
  //   stateMachineArn: process.env.VANITY_ARN!,
  //   name: uuid(),
  //   input: JSON.stringify(payload),
  // }));
  const { destination, primaryDomain, subdomain, slashtag } = payload;

  const vanityData: Vanity = { destination, primaryDomain, slashtag, subdomain };

  const vanityResponse = await createVanityLink(vanityData);

  if (vanityResponse.httpCode && vanityResponse.httpCode !== 200) {
    return {
      success: false,
      data: vanityResponse,
    };
  }

  return {
    success: true,
    data: {
      vanityLink: `${subdomain}.${primaryDomain}/${slashtag}`,
    },
  };


}

const createVanityLink = async (vanity: Vanity) => {
  const linkRequest = {
    destination: vanity.destination,
    domain: {
      fullName: `${vanity.subdomain}.${vanity.primaryDomain}`,
    },
    slashtag: vanity.slashtag,
  };

  const apikey =
    vanity.primaryDomain === process.env.URL_ROOT
      ? process.env.REBRANDLY_APIKEY
      : process.env.REBRANDLY_APIKEY2;

  const requestHeaders = {
    'Content-Type': 'application/json',
    apikey: apikey!,
  };

  const config = {
    headers: requestHeaders,
  };

  // Will be used to determine whether we are trying to create a new link or update an already exist link
  const res = await axios.get<Array<Record<string, string>>>(
    `https://api.rebrandly.com/v1/links?domain.fullName=${linkRequest.domain.fullName}&slashtag=${linkRequest.slashtag}`,
    config
  );

  const { data } = await axios.post<{ httpCode?: number; [key: string]: unknown }>(
    `https://api.rebrandly.com/v1/links/${
      Object.keys(res.data).length !== 0 ? res.data[0]!.id! : ''
    }`,
    linkRequest,
    {
      headers: requestHeaders,
    }
  );
  return data;
};
