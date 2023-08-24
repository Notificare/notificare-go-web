import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class InboxController extends Controller {
  @service constants;
  @service notificare;

  @action
  async openInboxItem(item, e) {
    e.preventDefault();
    try {
      let result =  await this.notificare.openInboxItem(item);
      this.notificare.presentNotification(result);
      this.send('refreshModel');
    } catch (e) {}
  }

  @action
  async removeInboxItem(item, e) {
    e.preventDefault();
    try {
      await this.notificare.removeInboxItem(item);
      this.send('refreshModel');
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
