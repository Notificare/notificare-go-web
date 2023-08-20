import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service intl;
  @service session;
  @service router;

  async beforeModel() {
    await this.session.setup();
    this.intl.setLocale(['en-us']);
    window.setInterval(this.handleSessionExpiration.bind(this), 5000);
  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }

  handleSessionExpiration() {
    if (this.session?.data?.authenticated?.expires) {
      let now = new Date(),
        expires = new Date(this.session.data.authenticated.expires);
      if (expires.getTime() < now.getTime()) {
        this.session.invalidate();
        // this.session.on('invalidationSucceeded', () =>
        //   this.router.transitionTo('dashboard')
        // );
      }
    }
  }
}
