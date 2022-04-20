/**
 * 
 * This script generates a new module based on user input.

 * › create modules/[pascalName]/Module.tsx
 * › create modules/[pascalName]/Module.stories.tsx
 *
 * › create studio/modules/module.[schemaname].tsx
 * › add import in schema
 * › add schema in list of schemas
 *
 * › add query in queries/page.ts
 * › add render action in layout/ModuleBuilder/ModuleBuilder.tsx
 * 
 * › add schema to all schemas type types.sanity.ts
 * › add schema to module type types.sanity.ts
 */

const fs = require('fs');
const path = require('path');
const { pascalCase } = require('../helpers/pascalCase');
const { prettierFile } = require('../helpers/prettierFile');
const { addLine } = require('../helpers/addLine');
const { createSchema } = require('../helpers/createSchema');
const { createType } = require('../helpers/createType');
const { question } = require('../helpers/question');
const { cyan } = require('../helpers/terminal');
const { MultiSelect, Input } = require('enquirer');

async function init() {
  try {
    const nameInput = new Input({
      type: 'input',
      name: 'name',
      message: `${cyan(
        'What is the name of the module?',
      )}\nHuman readable form. 'My Module' will become schema name 'module.mymodule'.\n`,
    });
    // const description = `Human readable form. 'My Module' will become schema name 'module.mymodule'.`;

    const fieldsInput = new MultiSelect({
      name: 'value',
      message: 'Do you want to set up basic fields?',
      limit: 7,
      choices: [
        { name: 'title', value: 'Title' },
        { name: 'intro', value: 'Intro' },
        { name: 'image', value: 'Image' },
        { name: 'buttons', value: 'Buttons' },
        { name: 'items', value: 'Items' },
      ],
    });

    const name = await nameInput.run();
    if (!name) return;
    const fields = await fieldsInput.run();

    const pascalName = `${pascalCase(name)}`;
    const schemaName = `module.${name.toLowerCase().replace(/\s/g, '')}`;

    createModule(pascalName, fields);

    createSchema(name, pascalName, schemaName, {
      replacer: 'MyModule',
      schemaDir: 'modules',
      prototypeFile: `${__dirname}/module.mymodule.tsx`,
      schemaImportPrefix: 'module',
      fields,
    });

    createQuery(name, schemaName, fields);
    createType(schemaName, { module: true });
    createBuilder(name, pascalName, schemaName, fields);

    console.log('\nNext steps: ');

    console.log(
      `› Create an icon for the desk structure in ${cyan(
        path.relative(
          process.cwd(),
          `${__dirname}/../../studio/utils/desk/DocumentIcon.tsx`,
        ),
      )} or use an existing icon ${cyan('http://localhost:3333/cms/mawla-engine')}`,
    );
  } catch (err) {
    console.log(err);
  }
}

/**
 * a. create modules/[pascalName]/Module.tsx
 * b. create modules/[pascalName]/Module.stories.tsx
 */

function createModule(pascalName, fields) {
  const fileDir = `${__dirname}/../../modules`;
  const filePath = `${fileDir}/${pascalName}/${pascalName}.tsx`;
  const storiesFilePath = filePath.replace('.tsx', '.stories.tsx');
  const optionsFilePath = filePath.replace('.tsx', 'Options.ts');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const importLines = [];
  const typescriptLines = [];
  const jsxLines = [];
  const propsLines = [];

  if (fields.indexOf('title') > -1) {
    typescriptLines.push('title?: string;');
    propsLines.push('title');
    importLines.push(`import { Title } from '../../components/module/Title';`);
    jsxLines.push(`
    {title && (
      <div className="mb-4 md:mb-6">
        <Title size="lg">{title}</Title>
      </div>
    )}
    `);
  }

  if (fields.indexOf('intro') > -1) {
    typescriptLines.push('intro?: React.ReactNode;');
    propsLines.push('intro');
    importLines.push(`import { Text } from '../../components/module/Text';`);
    jsxLines.push(`
    {intro && (
      <div className="mb-10 md:mb-14">
        <Text color="black">{intro}</Text>
      </div>
    )}
    `);
  }

  if (fields.indexOf('image') > -1) {
    typescriptLines.push('image?: ImageType');
    propsLines.push('image');
    importLines.push(`
    import { ImageType } from '../../types';
    import { Image } from '../../components/images/Image';`);
    jsxLines.push(`
    {image && (
      <div className="w-96 h-96">
        <Image {...image} layout="fill" />
      </div>
    )}
    `);
  }

  if (fields.indexOf('items') > -1) {
    typescriptLines.push('items?: { title?:string }[];');
    propsLines.push('items');
    jsxLines.push(`
    {Boolean(items?.length) && (
      <ul className="pt-7 divide-y divide-grey-50">
        {items?.map(({ title }) => (
          <li key={title} className="">{title}</li>
        ))}
      </ul>
    )}
    `);
  }

  if (fields.indexOf('buttons') > -1) {
    typescriptLines.push('buttons?: ButtonProps[];');
    propsLines.push('buttons');
    importLines.push(`
      import { ButtonProps } from '../../components/buttons/Button';
      import { ButtonGroup } from '../../components/buttons/ButtonGroup';`);
    jsxLines.push(`
    {buttons && (
      <div className="mt-8 lg:mt-12">
        <ButtonGroup items={buttons} />
      </div>
    )}
    `);
  }

  // create module file
  const moduleContent = fs
    .readFileSync(`${__dirname}/MyModule.tsx`)
    .toString()
    .replace(/MyModule/g, pascalName)
    .replace('/*TYPE*/', `${typescriptLines.join('\n')}`)
    .replace('/*IMPORT*/', `${importLines.join('\n')}`)
    .replace('/*JSX*/', `${jsxLines.join('\n')}`)
    .replace('/*PROPS*/', `, ${propsLines.join(',')}`);
  fs.writeFileSync(filePath, moduleContent);
  prettierFile(filePath);

  console.log(`› Created file ${cyan(path.relative(process.cwd(), filePath))}`);

  // create stories file
  const storyContent = fs
    .readFileSync(`${__dirname}/MyModule.stories.tsx`)
    .toString()
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(storiesFilePath, storyContent);
  prettierFile(filePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), storiesFilePath))}`,
  );

  // create options file
  const optionsContent = fs
    .readFileSync(`${__dirname}/MyModuleOptions.ts`)
    .toString()
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(optionsFilePath, optionsContent);
  prettierFile(filePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), optionsFilePath))}`,
  );
}

/**
 * Add query
 */

function createQuery(name, schemaName, fields) {
  const filePath = `${__dirname}/../../queries/page.ts`;
  let lines = fs.readFileSync(filePath).toString().split('\n');

  const fieldsQuery = [];
  if (fields.indexOf('title') > -1) fieldsQuery.push('title');
  if (fields.indexOf('intro') > -1) fieldsQuery.push('intro[] ${richTextQuery}');
  if (fields.indexOf('image') > -1) fieldsQuery.push('"image": ${imageQuery}');
  if (fields.indexOf('buttons') > -1) fieldsQuery.push('buttons[] ${buttonQuery}');
  if (fields.indexOf('items') > -1) fieldsQuery.push('items[]');

  const newQuery = `
      // ${name}
      _type == "${schemaName}" => {
        background,
        ${fieldsQuery.join(',\n        ')}
      },
    `;

  lines = addLine(newQuery, lines, 'dialogs[] {', -3);
  fs.writeFileSync(filePath, lines.join('\n'));
  console.log(`› Added query in ${cyan(path.relative(process.cwd(), filePath))}`);
}

/**
 * Add module to the module builder
 */

function createBuilder(name, pascalName, schemaName, fields) {
  const filePath = `${__dirname}/../../layout/ModuleBuilder/ModuleBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split('\n');

  // add import
  lines = [
    `import { ${pascalName}Memo as ${pascalName} } from '../../modules/${pascalName}/${pascalName}';`,
    ...lines,
  ];

  const props = [];
  if (fields.indexOf('intro') > -1) {
    props.push(`intro={<PortableText content={item.intro} />}`);
  }

  // add to render loop
  const jsx = `\n{/* ${name} */}{item._type === '${schemaName}' && <${pascalName} {...item} ${props.join(
    ' ',
  )}/>}`;
  lines = addLine(jsx, lines, '</React.Fragment>', 0);

  fs.writeFileSync(filePath, lines.join('\n'));
  prettierFile(filePath);

  console.log(`› Added import to ${cyan(path.relative(process.cwd(), filePath))}`);
  console.log(
    `› Added module render to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
}

init();
