import Service from '@ember/service';

export default class NotificareService extends Service {
  notificare = null;

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
        code = "xxx";
        cloud = 'cloud';
      }
    }
    let response = await fetch(`https://${cloud}.notifica.re/api/download/demo/code/${code}`);
    let result = await response.json();
  }
}
