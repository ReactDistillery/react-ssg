/*
  eslint-disable
  import/no-unresolved,
  import/extensions,
  import/no-extraneous-dependencies,
  no-console,
*/
import React from 'react';
import { renderToString, extractModules } from 'react-router-server';
import { StaticRouter } from 'react-router';
import ejs from 'ejs';
import Helmet from 'react-helmet';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';

import publicManifest from '../../build/public/js/stats.json';
import staticManifest from '../../build/static/js/stats.json';

const templatePath = path.join(__dirname, '..', '..', 'index.ejs');
const staticPath = path.join(__dirname, '..', '..', 'build', 'static');
const cssPath = path.join(__dirname, '..', '..', 'assets', 'css', 'style.css');
const template = fs.readFileSync(templatePath, 'utf8');
const App = require(`../../build/static/js/${staticManifest.assetsByChunkName.app}`).default;

const asynchronousRender = async (route, stats) => {
  const context = {};
  try {
    const { html, modules } = await renderToString(
      <StaticRouter location={route} context={context}>
        <App />
      </StaticRouter>,
    );
    const extractedModules = extractModules(modules, stats);
    const appendedFiles = extracted.map(module => ({
      id: module.id,
      files: module.files,
    }));
    const output = ejs.render(template, {
      html,
      entryPoint: publicManifest.assetsByChunkName.app,
      files: extractedModules.map(module => module.files),
      modules: extractedModules.map(({ id, files } => ({ id, files })),
      publicPath: process.env.PUBLIC_PATH,
    });
    return output;
  } catch (e) {
    throw e;
  }
};

const writeRoute = async (route) => {
  try {
    const html = await asynchronousRender(route, publicManifest);
    return fs.outputFile(path.join(staticPath, route, 'index.html'), html);
  } catch (e) {
    throw e;
  }
};

const outputErrors = (errors) => {
  errors.forEach(([route, e]) => {
    console.error(
      chalk.red(`${route} ✗`),
      '\n',
      chalk.yellow(e.message),
      '\n',
      chalk.grey(e.stack),
    );
  });
};

const buildRoutes = async (allRoutes) => {
  const errors = [];
  for (const route of allRoutes) {
    try {
      await writeRoute(route);
      console.log(chalk.green(`${route} ✓`));
    } catch (e) {
      errors.push([route, e]);
    }
  }
  if (errors.length) {
    outputErrors(errors);
  }
};

try {
  buildRoutes(JSON.parse(process.argv[2]));
} catch (e) {
  throw e;
}
