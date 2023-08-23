import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @service constants;
  @service notificare;

  @tracked slides;
  @tracked products;
  onResetController() {
    this.slides = [
      {
        src: 'https://placehold.co/2400x800?text=Hello+World',
        alt: '',
      },
    ];
    this.products = [];
  }

  onControllerLoaded() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      let response = await this.notificare.fetchAssets('products');
      let products = response.map((p) => {
        return {
          id: p.extra.id,
          title: p.title,
          description: p.description,
          price: p.extra.price,
          highlighted: p.extra.highlighted,
        }
      });
      this.products = products;
    } catch (e) {
      console.log(e);
      this.products = [];
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
