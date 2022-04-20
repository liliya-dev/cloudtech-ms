import { SchemaName } from '../../types.sanity';

type Props = {
  _id: string;
  _type: SchemaName;
};

export default function resolveProductionUrl({ _id, _type }: Props) {
  return `${process.env.SANITY_STUDIO_PROJECT_PATH}api/resolve-url?_id=${_id}&_type=${_type}`;
}
