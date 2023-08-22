import Route from '@ember/routing/route';

export default class ProductsRoute extends Route {
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.onResetController();
    controller.onControllerLoaded();
  }
}
