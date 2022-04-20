import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

import config from './documents/config';
import footer from './documents/footer';
import formStatic from './documents/form.static';
import navigation from './documents/navigation';
import pageContent from './documents/page.content';
import pageHome from './documents/page.home';
import pageLanding from './documents/page.landing';
import pageNotFound from './documents/page.notfound';
import redirect from './documents/redirect';
import sitemap from './documents/sitemap';
import dialogForm from './modules/dialog.form';
import dialogRichText from './modules/dialog.richtext';
import dialogVideo from './modules/dialog.video';
import heroVisual from './modules/hero.visual';
import moduleAccordion from './modules/module.accordion';
import moduleDivider from './modules/module.divider';
import moduleRichText from './modules/module.richtext';
import moduleTextImage from './modules/module.textimage';
import moduleVideo from './modules/module.video';
import accordion from './objects/accordion';
import backgroundColor from './objects/backgroundColor';
import button from './objects/button';
import buttongroup from './objects/buttongroup';
import imageSimple from './objects/image.simple';
import link from './objects/link';
import richtextBasic from './objects/richtext.basic';
import richtextFull from './objects/richtext.full';
import richtextSimple from './objects/richtext.simple';
import video from './objects/video';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    accordion,
    backgroundColor,
    button,
    buttongroup,
    config,
    dialogForm,
    dialogRichText,
    dialogVideo,
    footer,
    formStatic,
    heroVisual,
    imageSimple,
    link,
    moduleAccordion,
    moduleDivider,
    moduleRichText,
    moduleTextImage,
    moduleVideo,
    navigation,
    pageContent,
    pageHome,
    pageLanding,
    pageNotFound,
    redirect,
    richtextBasic,
    richtextFull,
    richtextSimple,
    sitemap,
    video,
  ]),
});
