import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {
  configure,
  launch,
  fetchApplication,
  setLogLevel,
  onReady,
  logCustom,
  fetchTags,
  addTags,
  removeTag,
  clearTags,
  fetchUserData,
  updateUserData,
  fetchDoNotDisturb,
  updateDoNotDisturb,
  clearDoNotDisturb,
  getCurrentDevice,
  registerDevice,
} from 'notificare-web/core';
import {
  onNotificationOpened,
  onNotificationActionOpened,
  enableRemoteNotifications,
  disableRemoteNotifications,
  hasRemoteNotificationsEnabled,
  getAllowedUI,
} from 'notificare-web/push';
import { presentNotification, presentAction } from 'notificare-web/push-ui';
import {
  enableLocationUpdates,
  onLocationUpdated,
  disableLocationUpdates,
  hasLocationServicesEnabled,
} from 'notificare-web/geo';
import {
  onMessagePresented,
  onMessageFinishedPresenting,
  onMessageFailedToPresent,
  onActionExecuted,
  onActionFailedToExecute,
  setMessagesSuppressed,
} from 'notificare-web/in-app-messaging';
import {
  fetchInbox,
  openInboxItem,
  removeInboxItem,
  markInboxItemAsRead,
  markAllInboxItemsAsRead,
  clearInbox,
  onBadgeUpdated,
} from 'notificare-web/inbox';
import { fetchAssets } from 'notificare-web/assets';

export default class NotificareService extends Service {
  @tracked badge = 0;
  @tracked location;

  async configure() {
    let code = 'gpyqx52r9n6ktoloowqexkpq',
      cloud = 'cloud-test',
      host = document.location.host.split('.');

    if (host.length > 1) {
      if (host[1] === 'demo-test') {
        code = host[0];
        cloud = 'cloud-test';
      } else if (host[1] === 'demo') {
        code = host[0];
        cloud = 'cloud';
      } else {
        code = 'xxx';
        cloud = 'cloud';
      }
    }
    let response = await fetch(
      `https://${cloud}.notifica.re/api/download/demo/code/${code}`
    );
    let result = await response.json();
    configure({
      useTestEnvironment: true,
      applicationKey: result?.demo?.applicationKey,
      applicationSecret: result?.demo?.applicationSecret,
    });
  }

  async launch() {
    //setLogLevel('debug');

    onReady((app) => {
      //console.log(app);
    });

    onNotificationOpened((notification) => {
      presentNotification(notification);
    });

    onNotificationActionOpened((notification, action) => {
      presentAction(notification, action);
    });

    onMessagePresented((message) => {
      //console.log(message);
    });

    onMessageFinishedPresenting((message) => {
      //console.log(message);
    });

    onMessageFailedToPresent((message) => {
      //console.log(message);
    });

    onActionExecuted((message) => {
      //console.log(message);
    });

    onActionFailedToExecute((message) => {
      //console.log(message);
    });

    onBadgeUpdated((badge) => {
      this.badge = badge;
    });

    onLocationUpdated((location) => {
      this.location = location;
    });

    await launch();
  }

  async fetchApplication() {
    return await fetchApplication();
  }

  suppressMessages(...args) {
    setMessagesSuppressed(...args);
  }

  async enableRemoteNotifications() {
    return await enableRemoteNotifications();
  }
  async disableRemoteNotifications() {
    return await disableRemoteNotifications();
  }

  hasRemoteNotificationsEnabled() {
    return hasRemoteNotificationsEnabled();
  }

  async registerDevice(id, name) {
    return await registerDevice({
      userId: id,
      userName: name,
    });
  }

  getCurrentDevice() {
    return getCurrentDevice();
  }

  getAllowedUI() {
    return getAllowedUI();
  }

  presentNotification(notification) {
    presentNotification(notification);
  }

  async enableLocationUpdates() {
    return enableLocationUpdates();
  }

  hasLocationServicesEnabled() {
    return hasLocationServicesEnabled();
  }

  async disableLocationUpdates() {
    return disableLocationUpdates();
  }

  async fetchDoNotDisturb() {
    return fetchDoNotDisturb();
  }

  async updateDoNotDisturb(dnd) {
    return updateDoNotDisturb(dnd);
  }

  async clearDoNotDisturb() {
    return clearDoNotDisturb();
  }

  async fetchAssets(name) {
    return await fetchAssets(name);
  }

  async fetchInbox(since, skip, limit) {
    return await fetchInbox({
      since: since,
      skip: skip,
      limit: limit,
    });
  }

  async openInboxItem(item) {
    return await openInboxItem(item);
  }

  async removeInboxItem(item) {
    return await removeInboxItem(item);
  }

  async markInboxItemAsRead(item) {
    return await markInboxItemAsRead(item);
  }

  async markAllInboxItemsAsRead() {
    return await markAllInboxItemsAsRead();
  }

  async clearInbox() {
    return await clearInbox();
  }

  async logCustomEvent(name, data) {
    return await logCustom(name, data);
  }

  async fetchTags() {
    return await fetchTags();
  }

  async addTags(tags) {
    return await addTags(tags);
  }

  async removeTag(tag) {
    return await removeTag(tag);
  }

  async clearTags() {
    return await clearTags();
  }

  async fetchUserData() {
    return await fetchUserData();
  }

  async updateUserData(userData) {
    return await updateUserData(userData);
  }
}
