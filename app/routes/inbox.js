import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class InboxRoute extends Route {
  @service notificare;

  @action
  refreshModel() {
    this.refresh();
  }

  async model() {
    try {
      let result = await this.notificare.fetchInbox(null, 0, 100);
      return result?.items;
    } catch (e) {
      return [];
    }
  }
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.onResetController();
    controller.onControllerLoaded();
  }

  afterModel(model, transition) {
    this.notificare.logCustomEvent('page_viewed.inbox');
  }
}
