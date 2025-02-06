import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const SERVICE_ACCOUNT_JSON = process.env.SERVICE_ACCOUNT_JSON;
const DELEGATED_ADMIN_EMAIL = process.env.DELEGATED_ADMIN_EMAIL;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const GCP_CLOUD_FUNCTION_URL = process.env.GCP_CLOUD_FUNCTION_URL;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!SERVICE_ACCOUNT_JSON || !DELEGATED_ADMIN_EMAIL || !SENDER_EMAIL || !GCP_CLOUD_FUNCTION_URL) {
        console.error('Missing required environment variables.');
        return res.status(500).json({ error: 'Server configuration incomplete. Missing environment variables.' });
    }


    try {
        const { officers } = req.body; // Expecting an array of officers

        if (!officers || !Array.isArray(officers)) {
            return res.status(400).json({ error: 'Invalid request: Officers data must be an array.' });
        }

        const onboardingResults = [];

        for (const officer of officers) {
            const { first_name, last_name, org_unit_path, groups, send_to_email } = officer;

            if (!first_name || !last_name || !org_unit_path || !send_to_email) {
                onboardingResults.push({
                    email: send_to_email,
                    status: 'failed',
                    error: 'Missing required fields for officer.'
                });
                continue; // Skip to the next officer
            }


            try {
                const response = await axios.post(GCP_CLOUD_FUNCTION_URL, {
                    first_name,
                    last_name,
                    org_unit_path,
                    groups,
                    send_to_email,
                    SERVICE_ACCOUNT_JSON,
                    DELEGATED_ADMIN_EMAIL,
                    SENDER_EMAIL
                });
                onboardingResults.push({
                    email: send_to_email,
                    status: 'success',
                    data: response.data
                });


            } catch (error: any) {
                console.error(`Error onboarding officer ${send_to_email}:`, error);
                onboardingResults.push({
                    email: send_to_email,
                    status: 'failed',
                    error: error.message 
                });
            }
        }


        res.status(200).json({ results: onboardingResults }); 

    } catch (error: any) {
        console.error('Error processing officer onboarding request:', error);
        res.status(500).json({ error: 'Failed to process officer onboarding', details: error.message });
    }
}
