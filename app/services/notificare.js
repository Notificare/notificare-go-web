import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class NotificareService extends Service {
  @service accountUtils;
  @service session;

  notificarePlugin = null;
  isReady = false;

  launch() {
    if (!this.notificarePlugin) {
      if (this.session.isAuthenticated) {
        this.notificarePlugin = new window.Notificare({
          appHost: 'https://dashboard.notifica.re',
          appVersion: '1.0',
          appKey:
            'b31e47e10b2717e83cfe6a1d40e80053800adfa3a65f6f11af6c10781e9cc931',
          appSecret:
            'bfb35adea6dcd2b9db7209cfa88f48f8a7b152d5267a416f9db61f3e371311a1',
          soundsDir: '/resources/sounds/',
          serviceWorker: '/sw.js',
          googleMapsAPIKey: 'AIzaSyDDD4gXxhQLNrMV91wvnZPVWgTnUmOes5Y',
          geolocationOptions: {
            timeout: 60000,
            enableHighAccuracy: true,
            maximumAge: 100000,
          },
        });

        this.notificarePlugin.launchWithAutoOnBoarding({
          text: 'Would you like to receive notifications from Notificare?',
          cancelText: 'No',
          acceptText: 'Yes',
          retryAfterInterval: 30 * 24, //in hours
        });

        this.notificarePlugin.onReady = () => {
          this.isReady = true;
        };

        this.notificarePlugin.didRegisterDevice = () => {
          this.accountUtils.retrieve().then((account) => {
            if (account?.email && account?.name) {
              this.notificarePlugin.registerDevice(
                account?.email,
                account?.name
              );
              this.notificarePlugin.clearTags().then(() => {
                let tags = [];
                tags.push(`tag_plan_${account.plan}`);
                tags.push(`tag_country_${account.billing_info.country}`);
                if (account.preferences.currency) {
                  tags.push(
                    `tag_prefs_currency_${account.preferences.currency}`
                  );
                }
                if (account.preferences.language) {
                  tags.push(
                    `tag_prefs_language_${account.preferences.language}`
                  );
                }
                if (account.preferences.time_zone) {
                  tags.push(
                    `tag_prefs_time_zone_${account.preferences.time_zone}`
                  );
                }
                if (account.preferences.units) {
                  tags.push(`tag_prefs_units_${account.preferences.units}`);
                }
                this.notificarePlugin.addTags(tags);
              });
            }
          });
          //this.notificarePlugin.startLocationUpdates();
        };

        this.notificarePlugin.didOpenNotification = (notification) => {
          this.notificarePlugin.presentNotification(notification);
        };
      }
    }
  }
}
