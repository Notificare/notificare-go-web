import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ProductsDetailController extends Controller {
  @service constants;
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
