const fs = require('fs');
const path = require('path');
const { prettierFile } = require('../helpers/prettierFile');
const { cyan } = require('../helpers/terminal');
const { addLine } = require('../helpers/addLine');
const { sortLines } = require('../helpers/sortLines');

/**
 * Insert schema import at the alphabetically sorted correct position
 * a. create studio/modules/module.[schemaname].tsx
 * b. add import in schema
 * c. add schema in list of schemas
 * d. add selected fields
 */

module.exports.createSchema = (name, pascalName, schemaName, options) => {
  const schemaEditFn = options.schemaEditFn || ((x) => x);
  const schemaImportName = `${options.schemaImportPrefix}${pascalName}`;

  const filePath = `${__dirname}/../../studio/schemas/schema.ts`;
  const schemaFilePath = `${__dirname}/../../studio/schemas/${options.schemaDir}/${schemaName}.tsx`;
  const file = fs.readFileSync(filePath).toString();
  let lines = file.split('\n');

  /**
   * Add to all schema imports
   */
  lines = [
    `import ${schemaImportName} from './${options.schemaDir}/${schemaName}';`,
    ...lines,
  ];
  const fromNeedle = `schemaTypes.concat([`;
  const toNeedle = `]),`;
  lines = addLine(`    ${schemaImportName},`, lines, fromNeedle);
  lines = sortLines(lines, fromNeedle, toNeedle);

  fs.writeFileSync(filePath, lines.join('\n'));
  prettierFile(filePath);

  /**
   * Create schema
   */

  const fieldLines = [];

  if (options.fields?.indexOf('title') > -1) {
    fieldLines.push(`
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      }`);
  }

  if (options.fields?.indexOf('intro') > -1) {
    fieldLines.push(`
      {
        name: 'intro',
        title: 'Intro',
        type: 'richtext.basic',
      }`);
  }

  if (options.fields?.indexOf('image') > -1) {
    fieldLines.push(`
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      }`);
  }

  if (options.fields?.indexOf('items') > -1) {
    fieldLines.push(`
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          {
            title: 'Item',
            name: 'item',
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              }
            ],
          },
        ],
      }`);
  }

  if (options.fields?.indexOf('buttons') > -1) {
    fieldLines.push(`
      {
        name: 'buttons',
        title: 'Buttons',
        type: 'buttongroup',
      }`);
  }

  // create schema file
  let schemaContent = fs
    .readFileSync(options.prototypeFile)
    .toString()
    .replace(
      new RegExp(`${options.replacer}Title`, 'g'),
      pascalName.replace(/([A-Z])/g, ' $1').trim(),
    )
    .replace(new RegExp(`${options.replacer}Schema`, 'g'), schemaName)
    .replace(new RegExp(`${options.replacer}`, 'g'), pascalName)
    .replace('/*FIELDS*/', `${fieldLines.join(',\n')},`);

  if (options.schemaImportPrefix === 'hero') {
    schemaContent = schemaContent.replace(
      new RegExp(`../modules/${pascalName}`, 'g'),
      `../heroes`,
    );
  }

  fs.writeFileSync(schemaFilePath, schemaEditFn(schemaContent));
  prettierFile(schemaFilePath);

  console.log(
    `› Added import in ${cyan(path.relative(process.cwd(), schemaFilePath))}`,
  );
  console.log(`› Added schema in ${cyan(path.relative(process.cwd(), filePath))}`);
};
