import { module, test } from 'qunit';
import { setupTest } from 'notificare-hq-ember-app/tests/helpers';

module('Unit | Service | constants', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:constants');
    assert.ok(service);
  });
});
