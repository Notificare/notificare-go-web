import { module, test } from 'qunit';
import { setupTest } from 'notificare-hq-ember-app/tests/helpers';

module('Unit | Controller | setuptwofa', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:setuptwofa');
    assert.ok(controller);
  });
});
