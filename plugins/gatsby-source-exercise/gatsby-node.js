const { lstatSync, readdirSync, readFileSync } = require('fs');
const path = require('path');
const showdown = require('showdown');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, pluginOptions) => {
  const { createNode } = actions;

  const exercisesPath = pluginOptions.path;

  const isDirectory = source => lstatSync(source).isDirectory();
  const getDirectories = source =>
    readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

  const folders = getDirectories(exercisesPath);
  folders.forEach(async folder => {
    const pathArray = folder.split('/');
    const exercise = {
      input: '',
      output: '',
      name: '',
      order: 0,
      instructions: '',
      key: pathArray[pathArray.length - 1],
      slug: pathArray[pathArray.length - 1],
    };

    const input = await readFileSync(path.join(folder, 'input.html'), { encoding: 'utf-8' });
    exercise.input = input;

    const options = await readFileSync(path.join(folder, 'options.json'), { encoding: 'utf-8' });
    const jsonOptions = JSON.parse(options);
    exercise.order = jsonOptions.order;
    exercise.name = jsonOptions.name;

    const output = readFileSync(path.join(folder, 'output.html'), { encoding: 'utf-8' });
    exercise.output = output;

    const instructions = await readFileSync(path.join(folder, 'instructions.md'), { encoding: 'utf-8' });
    const converter = new showdown.Converter();
    const htmlInstructions = converter.makeHtml(instructions);
    exercise.instructions = htmlInstructions;

    const exerciseContent = JSON.stringify(exercise);

    const exerciseMeta = {
      id: createNodeId(`exercise-${exercise.key}`),
      parent: null,
      children: [],
      internal: {
        type: `Exercise`,
        mediaType: `text/html`,
        content: exerciseContent,
        contentDigest: createContentDigest(exercise)
      }
    }

    const node = Object.assign({}, exercise, exerciseMeta);
    createNode(node);
  });
}