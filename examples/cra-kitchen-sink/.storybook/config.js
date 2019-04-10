import { configure, addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';

import { withA11y } from '@storybook/addon-a11y';

addDecorator(withA11y);
addParameters({
  options: {
    isFullscreen: false,
    showAddonsPanel: true,
    showSearchBox: false,
    panelPosition: 'right',
    sortStoriesByKind: false,
    hierarchySeparator: /\./,
    hierarchyRootSeparator: /\|/,
    enableShortcuts: true,
    theme: create({
      base: 'light',
      brandTitle: 'CRA Kitchen Sink',
      brandUrl: 'https://github.com/storybooks/storybook/tree/master/examples/cra-kitchen-sink',
      gridCellSize: 12,
    }),
    storySort: (a, b) => (a.id > b.id ? -1 : 1),
  },
});

function loadStories() {
  // put welcome screen at the top of the list so it's the first one displayed
  require('../src/stories/welcome');

  // automatically import all story js files that end with *.stories.js
  const req = require.context('../src/stories', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
