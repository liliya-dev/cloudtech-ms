import { withSentry } from '@sentry/nextjs';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  previewToken?: string;
};

export type StaticFormApiBody = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: string;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { user }: StaticFormApiBody = JSON.parse(req.body);

  // https://nextjs.org/docs/advanced-features/preview-mode#works-with-api-routes
  if (!req.preview) {
    return res.status(400).json({ message: `Not in preview mode` });
  }

  if (!user?.id) {
    return res.status(400).json({ message: `Not a Sanity authenticated user` });
  }

  return res
    .status(200)
    .json({ previewToken: `${user.id}${process.env.SANITY_API_TOKEN}` });
};

export default withSentry(handler as any);
