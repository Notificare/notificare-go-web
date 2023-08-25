import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CartController extends Controller {
  @service constants;
  @service notificare;
  @service('shopping-cart') cart;

  @action
  async removeItem(item, e) {
    e.preventDefault();
    this.cart.remove(item);
  }

  @action
  purchase() {
    let products = this.cart.items.map((item) => {
      return {
        id: item.id,
        name: item.title,
        price: item.price,
        price_formatted: `€ ${item.price}`,
      };
    });
    this.notificare.logCustomEvent('purchase', {
      total_price: this.cart.total,
      total_price_formatted: `€ ${this.cart.total}`,
      total_items: this.cart.items.length,
      products: products,
    });
    this.cart.empty();
  }
  onResetController() {}

  onControllerLoaded() {}

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
