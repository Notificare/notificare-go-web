import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject, { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EventsController extends Controller {
  @service constants;
  @service notificare;

  @tracked eventName;
  @tracked eventData;
  @tracked isSuccess;
  @tracked hasServerError;

  @action
  async logEvent(e) {
    e.preventDefault();
    this.clearDismissAlert();
    try {
      let data = Object.fromEntries(
        this.eventData.map((obj) => [obj.key, obj.value])
      );
      await this.notificare.logCustomEvent(this.eventName, data);
      this.name = null;
      this.eventData = [];
      this.isSuccess = true;
      this.dismissAlert();
    } catch (e) {
      this.hasServerError = true;
      this.dismissAlert();
    }
  }

  @action
  async addAttribute(e) {
    e.preventDefault();
    this.eventData.pushObject(
      EmberObject.create({
        key: null,
        value: null,
      })
    );
  }

  @action
  async removeAttribute(attr, e) {
    e.preventDefault();
    this.eventData.removeObject(attr);
  }

  onResetController() {
    this.name = null;
    this.eventData = [];
  }

  onControllerLoaded() {}

  dismissAlert() {
    this.dismissTimeout = setTimeout(
      this.dismiss.bind(this),
      this.constants.defaultErrorTimeout
    );
  }

  dismiss() {
    this.isSuccess = false;
    this.hasServerError = false;
  }

  clearDismissAlert() {
    clearTimeout(this.dismissTimeout);
    this.dismiss();
  }
}
