import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service intl;
  @service notificare;

  async beforeModel() {
    this.intl.setLocale(['en-us']);
    this.handleTheme();
    await this.notificare.configure();
    await this.notificare.launch();
  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }

  handleTheme() {
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
}
