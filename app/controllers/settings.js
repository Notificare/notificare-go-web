import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import EmberObject, { action } from '@ember/object';

export default class SettingsController extends Controller {
  @service constants;
  @service notificare;

  @tracked tags;

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
    this.loadTags();
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
