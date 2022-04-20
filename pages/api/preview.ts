import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = string;

function warning(msg) {
  return `<p style="
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif; 
  padding: 10px; 
  border-radius: 3px;
  background: lightyellow; 
  line-height: 1.5;
  border: 1px solid rgba(0,0,0,.1);">${msg}</p>`;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { secret, _id, _type } = req.query;

  if (secret !== process.env.SANITY_STUDIO_PREVIEW_SECRET) {
    return res.status(401).send(warning('The preview token is invalid.'));
  }

  if (!secret || Array.isArray(secret) || !secret.trim().length)
    return res.status(400).send(warning('secret is missing.'));

  if (Array.isArray(_id) || Array.isArray(_type)) {
    return res.status(400).send(warning('invalid arguments.'));
  }

  const Location = `/preview?id=${_id}&type=${_type}`;
  res.setPreviewData({});
  res.writeHead(307, { Location });
  res.end();
};

export default withSentry(handler);
