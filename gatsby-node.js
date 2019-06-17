const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`{
    allExercise {
      nodes {
        slug
      }
    }
  }`);

  const exerciseTemplate = path.resolve('./src/templates/exercise.js');

  const { allExercise } = result.data;
  allExercise.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: exerciseTemplate,
      context: {
        slug: node.slug
      }
    });
  })
}