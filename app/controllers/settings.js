import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import EmberObject, { action } from '@ember/object';
import { restartableTask, timeout } from 'ember-concurrency';

export default class SettingsController extends Controller {
  @service constants;
  @service notificare;

  @tracked tags;
  @tracked allowedUI;
  @tracked allowedLocation;
  @tracked allowedDnd;
  @tracked dnd;
  @tracked app;
  @tracked version;

  @action
  async changeTag(tag, state) {
    try {
      if (state) {
        await this.notificare.addTags([tag]);
      } else {
        await this.notificare.removeTag(tag);
      }
      this.tags.set(tag, state);
    } catch (e) {}
  }

  @action
  async changeNotifications(state) {
    try {
      if (state) {
        await this.notificare.enableRemoteNotifications();
      } else {
        await this.notificare.disableRemoteNotifications();
      }
      this.allowedUI = state;
    } catch (e) {}
  }

  @action
  async changeDnd(state) {
    try {
      if (state) {
        await this.notificare.updateDoNotDisturb({
          start: '23:00',
          end: '08:00',
        });
      } else {
        await this.notificare.clearDoNotDisturb();
      }
      this.loadDnd();
    } catch (e) {}
  }

  @action
  handleDndUpdate() {
    this.updateDnd.perform();
  }

  @action
  async changeLocation(state) {
    try {
      if (state) {
        await this.notificare.enableLocationUpdates();
      } else {
        await this.notificare.disableLocationUpdates();
      }
      this.allowedLocation = state;
    } catch (e) {}
  }

  onResetController() {
    this.tags = EmberObject.create({
      topic_announcements: false,
      topic_best_practices: false,
      topic_product_updates: false,
      topic_engineering: false,
      topic_staff: false,
    });
  }

  onControllerLoaded() {
    this.device = this.notificare.getCurrentDevice();
    this.allowedUI = this.notificare.getAllowedUI();
    this.allowedLocation = this.notificare.hasLocationServicesEnabled();
    this.loadTags();
    this.loadDnd();
    this.loadApplication();
    this.loadVersion();
  }

  async loadTags() {
    try {
      let result = await this.notificare.fetchTags();
      this.tags.set(
        'topic_announcements',
        result.includes('topic_announcements')
      );
      this.tags.set(
        'topic_best_practices',
        result.includes('topic_best_practices')
      );
      this.tags.set(
        'topic_product_updates',
        result.includes('topic_product_updates')
      );
      this.tags.set('topic_engineering', result.includes('topic_engineering'));
      this.tags.set('topic_staff', result.includes('topic_staff'));
    } catch (e) {}
  }

  async loadDnd() {
    try {
      let result = await this.notificare.fetchDoNotDisturb();
      this.allowedDnd = result ? true : false;
      this.dnd = result
        ? EmberObject.create({ start: result.start, end: result.end })
        : null;
    } catch (e) {
      this.allowedDnd = false;
      this.dnd = null;
    }
  }

  async loadApplication() {
    try {
      let result = await this.notificare.fetchApplication();
      this.app = result;
    } catch (e) {
      this.app = null;
    }
  }

  async loadVersion() {
    try {
      let result = await window.fetch('/status.json');
      let response = await result.json();
      this.version = `v${response?.version}`;
    } catch (e) {
      this.version = 'v1.0.0';
    }
  }

  @restartableTask
  *updateDnd() {
    if (this.dnd.get('start') && this.dnd.get('end')) {
      yield timeout(500);
      try {
        yield this.notificare.updateDoNotDisturb({
          start: this.dnd.get('start'),
          end: this.dnd.get('end'),
        });
      } catch (e) {}
    }
  }

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
