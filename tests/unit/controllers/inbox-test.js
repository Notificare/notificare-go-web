import { module, test } from 'qunit';
import { setupTest } from 'notificare-go-web/tests/helpers';

module('Unit | Controller | inbox', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:inbox');
    assert.ok(controller);
  });
});