import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShoppingCartService extends Service {
  @tracked items = A([]);

  add(item) {
    this.items.pushObject(item);
  }

  remove(item) {
    this.items.removeObject(item);
  }

  empty() {
    this.items.clear();
  }

  get total() {
    return this.items
      .map((item) => item.price)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
