import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductsIndexRoute extends Route {
  @service notificare;
  async model() {
    try {
      let response = await this.notificare.fetchAssets('products');
      let products = response.map((p) => {
        return {
          id: p.extra.id,
          image: p.url,
          title: p.title,
          description: p.description,
          price: p.extra.price,
          highlighted: p.extra.highlighted,
        };
      });
      return products;
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
    this.notificare.logCustomEvent('page_viewed.products');
  }
}
