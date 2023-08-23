import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductsDetailRoute extends Route {
  @service notificare;
  async model(params) {
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
      let product = products.find((p) => {
        return p.id === params.product_id;
      });
      return product;
    } catch (e) {
      return null;
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.onResetController();
    controller.onControllerLoaded();
  }

  afterModel(model, transition) {
    this.notificare.logCustomEvent('page_viewed.product_details');
    this.notificare.logCustomEvent('product_viewed', {
      product: {
        id: model.id,
        name: model.title,
        price: model.price,
        price_formatted: `€ ${model.price}`,
      },
    });
  }
}
