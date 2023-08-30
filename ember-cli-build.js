'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      exclude: [
        'sw.js',
        'robots.txt',
        'assets/images/no-gravatar.png',
        'assets/images/no-gravatar-blue.png',
        'assets/icons/android-icon-36x36.png',
        'assets/icons/android-icon-48x48.png',
        'assets/icons/android-icon-72x72.png',
        'assets/icons/android-icon-96x96.png',
        'assets/icons/android-icon-144x144.png',
        'assets/icons/android-icon-192x192.png',
      ],
    },
    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
    // autoImport: {
    //   alias: {
    //     'notificare-in-app-messaging-css': 'notificare-web/in-app-messaging/in-app-messaging.css',
    //     'notificare-push-css': 'notificare-web/push/push.css',
    //     'notificare-push-ui-css': 'notificare-web/push-ui/push-ui.css',
    //   },
    //   webpack: {
    //     module: {
    //       rules: [
    //         {
    //           test: /\.css$/i,
    //           use: [
    //             'style-loader',
    //             'css-loader',
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import(
    'node_modules/@notificare/web-in-app-messaging/dist/notificare-in-app-messaging.css'
  );
  app.import('node_modules/@notificare/web-push/dist/notificare-push.css');
  app.import(
    'node_modules/@notificare/web-push-ui/dist/notificare-push-ui.css'
  );
  return app.toTree();
};
