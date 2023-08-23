import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service intl;
  @service session;
  @service router;

  async beforeModel() {
    let theme = window.localStorage.getItem('theme');
    if (!theme) {
      let theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      window.localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-bs-theme', theme);
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }
}
