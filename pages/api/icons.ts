/**
 * CMS helper apis
 */
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import ReactDOMServer from 'react-dom/server';

import { Icons, IconName } from '../../components/icons/Icons';

type IconResponse = { name: IconName; icon: string }[];

const handler = async (req: NextApiRequest, res: NextApiResponse<IconResponse>) => {
  const obj: IconResponse = Object.entries(Icons).map(
    ([key, value]: [IconName, any]) => ({
      name: key,
      icon: ReactDOMServer.renderToString(
        value.render ? value.render({}) : value({}),
      ) as string,
    }),
  );

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=86400');

  res.status(200).json(obj);
};

export default withSentry(handler);
