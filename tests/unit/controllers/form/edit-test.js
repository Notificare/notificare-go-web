import { module, test } from 'qunit';
import { setupTest } from 'notificare-hq-ember-app/tests/helpers';

module('Unit | Controller | form/edit', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:form/edit');
    assert.ok(controller);
  });
});
