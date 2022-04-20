import type { NextApiRequest, NextApiResponse } from 'next';

import { getClient } from '../../helpers/sanity/server';
import { getPathForId } from '../../helpers/sitemap/getPathForId';
import { SitemapItemType, sitemapQuery } from '../../queries/sitemap';

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id, _type } = req.query;

  if (Array.isArray(_id) || Array.isArray(_type)) {
    return res.status(400).json({ message: 'invalid arguments.' });
  }

  const sitemap: SitemapItemType[] = await getClient(true).fetch(sitemapQuery);
  const path = getPathForId(_id, sitemap);

  if (path === '/' && _id.indexOf('page_homepage') === -1) {
    return res.status(400).json({ message: `Missing slug for document id ${_id}.` });
  }

  if (!path) {
    return res
      .status(400)
      .json({ message: `No page found for document id ${_id}.` });
  }

  res.redirect(307, path);
  res.end();
};

export default handler;
