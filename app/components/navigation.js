import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NavigationComponent extends Component {
  @tracked theme;
  @action
  changeTheme(theme, e) {
    e.preventDefault();
    window.localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    this.theme = theme;
  }

  constructor(...args) {
    super(...args);
    this.theme = window.localStorage.getItem('theme');
  }
}
