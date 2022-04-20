import defaultResolve from 'part:@sanity/base/document-actions';
import {
  DeleteAction,
  DuplicateAction,
  UnpublishAction,
} from 'part:@sanity/base/document-actions';

import { isSingleton } from '../../utils/schemas/isSingleton';

const resolveDocumentActions = (props) => {
  const defaultActions = defaultResolve(props);

  // never delete, unpublish or duplicate singletons
  if (isSingleton(props.type)) {
    return defaultResolve(props).filter(
      (Action) =>
        Action !== DeleteAction &&
        Action !== DuplicateAction &&
        Action !== UnpublishAction,
    );
  }

  return defaultActions;
};

export default resolveDocumentActions;
