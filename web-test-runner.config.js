/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {playwrightLauncher} from '@web/test-runner-playwright';

export default {
  files: [
    'test/app.test.js',
    'test/utils/**/*.test.js',
    'test/components/**/*.test.js'
  ],
  nodeResolve: true,
  browsers: [
    playwrightLauncher({product: 'chromium'})
  ],
  testFramework: {
    config: {
      ui: 'tdd',
      timeout: '5000'
    }
  },
  testRunnerHtml: testFramework => `
    <html>
      <head>
        <style>
          body { margin: 0; }
        </style>
      </head>
      <body>
        <div id="outlet"></div>
        <script type="module">
          window.outlet = document.getElementById('outlet');
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `
};
