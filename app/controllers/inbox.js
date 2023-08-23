import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import EmberObject, { action } from '@ember/object';

export default class InboxController extends Controller {
  @service constants;
  @service notificare;

  @action
  async openInboxItem(item) {
    try {
      let result =  await this.notificare.openInboxItem(item);
      this.nodel.reload();
    } catch (e) {}
  }

  @action
  async removeInboxItem(item) {
    try {
      await this.notificare.removeInboxItem(item);
      this.nodel.reload();
    } catch (e) {}
  }
  onResetController() {}

  onControllerLoaded() {}

  dismissAlert() {
    this.dismissTimeout = setTimeout(
      this.dismiss.bind(this),
      this.constants.defaultErrorTimeout
    );
  }

  dismiss() {}

  clearDismissAlert() {
    clearTimeout(this.dismissTimeout);
    this.dismiss();
  }
}
