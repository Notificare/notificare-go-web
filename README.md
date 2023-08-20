# notificare-go-web

Notificare's Go web app

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd notificare-go-web`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4303](http://localhost:4303).
* Visit your tests at [http://localhost:4303/tests](http://localhost:4303/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Make sure you have valid AWS credentials, either in your .aws/credentials or as environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

For Acceptance
* ember deploy staging

For Production
* ember deploy production

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
    * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
    * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
