import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CartRoute extends Route {
  @service notificare;
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.onResetController();
    controller.onControllerLoaded();
  }

  afterModel(model, transition) {
    this.notificare.logCustomEvent('page_viewed.cart');
  }
}
