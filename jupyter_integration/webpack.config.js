const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const fs = require('fs-extra')
const { ModuleFederationPlugin } = webpack.container
const { readJSONFile, writeJSONFile } = require('@jupyterlab/buildutils')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const data = require(path.join(__dirname, 'package.json'));

const outputPath = path.join('', data.jupyterlab['outputDir']);
const staticPath = path.join(outputPath, 'static');

class CleanupPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Cleanup', () => {
      // Find the remoteEntry file and add it to the package.json metadata
      const files = glob.sync(path.join(staticPath, 'remoteEntry.*.js'));
      let newestTime = -1;
      let newestRemote = '';
      files.forEach(fpath => {
        const mtime = fs.statSync(fpath).mtime.getTime();
        if (mtime > newestTime) {
          newestRemote = fpath;
          newestTime = mtime;
        }
      });
      const data = readJSONFile(path.join(outputPath, 'package.json'));
      const _build = {
        load: path.join('static', path.basename(newestRemote))
      };
      if (exposes['./extension'] !== undefined) {
        _build.extension = './extension';
      }
      if (exposes['./mimeExtension'] !== undefined) {
        _build.mimeExtension = './mimeExtension';
      }
      if (exposes['./style'] !== undefined) {
        _build.style = './style';
      }
      data.jupyterlab._build = _build;
      writeJSONFile(path.join(outputPath, 'package.json'), data);
    });
  }
}

const exposes = {
  "./index": "/Users/roman/sandbox/dharpa/react-proto-as-extension/src/index.ts",
  "./extension": "/Users/roman/sandbox/dharpa/react-proto-as-extension/src/index.ts"
}

const shared = {
  "@jupyterlab/application": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/application-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/apputils-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/celltags-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/codemirror-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/completer-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/console-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/coreutils": {
    "requiredVersion": "^5.0.1",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/csvviewer-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/debugger-extension": {
    "requiredVersion": "^3.0.4",
    "import": false
  },
  "@jupyterlab/docmanager-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/documentsearch-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/extensionmanager-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/filebrowser-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/fileeditor-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/help-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/htmlviewer-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/hub-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/imageviewer-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/inspector-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/javascript-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/json-extension": {
    "requiredVersion": "^3.0.2",
    "import": false
  },
  "@jupyterlab/launcher-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/logconsole-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/mainmenu-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/markdownviewer-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/mathjax2-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/notebook-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/pdf-extension": {
    "requiredVersion": "^3.0.2",
    "import": false
  },
  "@jupyterlab/rendermime-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/running-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/settingeditor-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/shortcuts-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/statusbar-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/terminal-extension": {
    "requiredVersion": "^3.0.4",
    "import": false
  },
  "@jupyterlab/theme-dark-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/theme-light-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/toc-extension": {
    "requiredVersion": "^5.0.3",
    "import": false
  },
  "@jupyterlab/tooltip-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/translation-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/ui-components-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/vdom-extension": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/vega5-extension": {
    "requiredVersion": "^3.0.2",
    "import": false
  },
  "@jupyterlab/apputils": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/attachments": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/cells": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/celltags": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/codeeditor": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/codemirror": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/completer": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/console": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/csvviewer": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/debugger": {
    "requiredVersion": "^3.0.4",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/docmanager": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/docregistry": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/documentsearch": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/extensionmanager": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/filebrowser": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/fileeditor": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/htmlviewer": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/imageviewer": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/inspector": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/launcher": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/logconsole": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/mainmenu": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/markdownviewer": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/mathjax2": {
    "requiredVersion": "^3.0.2",
    "import": false
  },
  "@jupyterlab/metapackage": {
    "requiredVersion": "^3.0.5",
    "import": false
  },
  "@jupyterlab/nbconvert-css": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/nbformat": {
    "requiredVersion": "^3.0.1",
    "import": false
  },
  "@jupyterlab/notebook": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/observables": {
    "requiredVersion": "^4.0.1",
    "import": false
  },
  "@jupyterlab/outputarea": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/property-inspector": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@jupyterlab/rendermime": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/rendermime-interfaces": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/running": {
    "requiredVersion": "^3.0.2",
    "import": false
  },
  "@jupyterlab/services": {
    "requiredVersion": "^6.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/settingeditor": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/settingregistry": {
    "requiredVersion": "^3.0.1",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/statedb": {
    "requiredVersion": "^3.0.1",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/statusbar": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/terminal": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/toc": {
    "requiredVersion": "^5.0.3",
    "import": false
  },
  "@jupyterlab/tooltip": {
    "requiredVersion": "^3.0.3",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/translation": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/ui-components": {
    "requiredVersion": "^3.0.2",
    "import": false,
    "singleton": true
  },
  "@jupyterlab/vdom": {
    "requiredVersion": "^3.0.3",
    "import": false
  },
  "@lumino/algorithm": {
    "requiredVersion": "^1.3.3",
    "import": false,
    "singleton": true
  },
  "@lumino/application": {
    "requiredVersion": "^1.13.1",
    "import": false,
    "singleton": true
  },
  "@lumino/commands": {
    "requiredVersion": "^1.12.0",
    "import": false,
    "singleton": true
  },
  "@lumino/coreutils": {
    "requiredVersion": "^1.5.3",
    "import": false,
    "singleton": true
  },
  "@lumino/disposable": {
    "requiredVersion": "^1.4.3",
    "import": false,
    "singleton": true
  },
  "@lumino/domutils": {
    "requiredVersion": "^1.2.3",
    "import": false,
    "singleton": true
  },
  "@lumino/dragdrop": {
    "requiredVersion": "^1.7.1",
    "import": false,
    "singleton": true
  },
  "@lumino/messaging": {
    "requiredVersion": "^1.4.3",
    "import": false,
    "singleton": true
  },
  "@lumino/properties": {
    "requiredVersion": "^1.2.3",
    "import": false,
    "singleton": true
  },
  "@lumino/signaling": {
    "requiredVersion": "^1.4.3",
    "import": false,
    "singleton": true
  },
  "@lumino/virtualdom": {
    "requiredVersion": "^1.8.0",
    "import": false,
    "singleton": true
  },
  "@lumino/widgets": {
    "requiredVersion": "^1.16.1",
    "import": false,
    "singleton": true
  },
  "react": {
    "requiredVersion": "^17.0.1",
    "import": false,
    "singleton": true
  },
  "react-dom": {
    "requiredVersion": "^17.0.1",
    "import": false,
    "singleton": true
  },
  "@lumino/datagrid": {},
  "axios": {},
  "diff": {},
  "framer-motion": {},
  "node-sass": {},
  "react-icons": {},
  "react-router-dom": {},
  "react-scripts": {},
  "semantic-ui-css": {},
  "semantic-ui-react": {},
  "uuid": {},
  "web-vitals": {},
  "@dharpa/react-proto-as-extension": {
    "version": "0.1.0",
    "singleton": true,
    "import": "/Users/roman/sandbox/dharpa/react-proto-as-extension/src/index.ts"
  }
}

module.exports = {
  // "bail": false,
  cache: {
    // 1. Set cache type to filesystem
    type: 'filesystem'
  },
  "module": {
    "rules": [
      {
        // test: /\.s[ac]ss$/i,
        // test: /\.(css|scss)$/i,
        test: /\.(sa|sc|c)ss$/i,
        // enforce: 'pre',
        use: [
          "style-loader",
          // MiniCssExtractPlugin.loader,
          // "css-loader",
          {
            loader: 'css-loader',
            // options: {
            //   esModule: false,
            //   importLoaders: 1,
            //   modules: {
            //     compileType: 'icss'
            //   }
            //   // modules: {
            //   //   // namedExport: true,
            //   //   exportLocalsConvention: "camelCase"
            //   // },
            // }
          },
          "sass-loader"
          // {
          //   loader: "sass-loader",
          //   options: {
          //     // sassOptions: {
          //     //   fibers: false
          //     // },
          //   },
          // },
        ],
      },
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.md$/, use: 'raw-loader' },
      { test: /\.(jpg|png|gif)$/, use: 'file-loader' },
      { test: /\.js.map$/, use: 'file-loader' },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
      {
        // In .css files, svg is loaded as a data URI.
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.css$/,
        use: {
          loader: 'svg-url-loader',
          options: { encoding: 'none', limit: 10000 }
        }
      },
      {
        // In .ts and .tsx files (both of which compile to .js), svg files
        // must be loaded as a raw string instead of data URIs.
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.js$/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        // enforce: "pre",
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },
    ]
  },
  "resolve": {
    "alias": {
      "@phosphor/algorithm$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/algorithm/dist/index.js",
      "@phosphor/application$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/application/dist/index.js",
      "@phosphor/commands$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/commands/dist/index.js",
      "@phosphor/coreutils$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/coreutils/dist/index.js",
      "@phosphor/disposable$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/disposable/dist/index.js",
      "@phosphor/domutils$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/domutils/dist/index.js",
      "@phosphor/dragdrop$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/dragdrop/dist/index.js",
      "@phosphor/dragdrop/style": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/widgets/style",
      "@phosphor/messaging$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/messaging/dist/index.js",
      "@phosphor/properties$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/properties/dist/index.js",
      "@phosphor/signaling": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/signaling/dist/index.js",
      "@phosphor/widgets/style": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/widgets/style",
      "@phosphor/virtualdom$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/virtualdom/dist/index.js",
      "@phosphor/widgets$": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/@lumino/widgets/dist/index.js"
    },
    "fallback": {
      "url": false,
      "buffer": false,
      "path": "/Users/roman/sandbox/dharpa/react-proto-as-extension/node_modules/path-browserify/index.js"
    },
    "extensions": [
      ".js",
      ".jsx",
      // ".scss",
      // ".css",
      ".ts",
      ".tsx"
    ]
  },
  "watchOptions": {
    "poll": 500,
    "aggregateTimeout": 1000
  },
  "plugins": [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css'
    // }),
    new webpack.DefinePlugin({
      // Needed for Blueprint. See https://github.com/palantir/blueprint/issues/4393
      'process.env': '{}',
      // Needed for various packages using cwd(), like the path polyfill
      process: { cwd: () => '/' }
    }),
    new ModuleFederationPlugin({
      name: data.name,
      library: {
        type: 'var',
        name: ['_JUPYTERLAB', data.name]
      },
      filename: 'remoteEntry.[contenthash].js',
      exposes,
      shared
    }),
    new CleanupPlugin()
  ],
  "mode": "development",
  "devtool": "source-map",
  // "entry": {},
  entry: './src/index.ts',
  "output": {
    "filename": "[name].[contenthash].js",
    "path": "/Users/roman/sandbox/dharpa/react-proto-as-extension/react_proto_as_extension/labextension/static",
    "publicPath": "auto"
  },
  // "stats": "verbose"
  stats: {
    loggingDebug: [
      'CssLoader',
    ]
  }
}