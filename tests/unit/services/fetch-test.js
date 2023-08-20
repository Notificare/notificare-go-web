import { module, test } from 'qunit';
import { setupTest } from 'notificare-hq-ember-app/tests/helpers';

module('Unit | Service | fetch', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:fetch');
    assert.ok(service);
  });
});
