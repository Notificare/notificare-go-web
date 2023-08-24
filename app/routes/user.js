import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class UserRoute extends Route {
  @service notificare;
  @service router;

  @action
  refreshModel() {
    this.refresh();
  }

  // beforeModel() {
  //   let device = this.notificare.getCurrentDevice();
  //   if (!device.userId) {
  //     this.router.transitionTo('restricted');
  //   }
  // }

  async model() {
    //return this.notificare.getCurrentDevice();
    return {userId: 'asdfasdf', userName: 'asdfasdf', id: 'asdfasdf'};
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.onResetController();
    controller.onControllerLoaded();
  }

  afterModel(model, transition) {
    this.notificare.logCustomEvent('page_viewed.user_profile');
  }
}
