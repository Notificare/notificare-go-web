import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class FetchService extends Service {
  @service session;
  namespace = '/api/v2';

  get headers() {
    let headers = new window.Headers();
    if (this.session.isAuthenticated) {
      headers.append(
        'Authorization',
        'Bearer ' + this.session.data.authenticated.auth_token
      );
    }
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  head(url, data, headers, signal) {
    let endpoint = this.namespace + url;
    if (data) {
      let qs = Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');
      endpoint = endpoint + '?' + qs;
    }
    return this._makeRequest(endpoint, {
      headers: headers ? headers : this.headers,
      method: 'HEAD',
      ...signal,
    });
  }

  request(url, data, format, headers, signal) {
    let endpoint = this.namespace + url;
    if (data) {
      let qs = Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');
      endpoint = endpoint + '?' + qs;
    }
    return this._makeRequest(
      endpoint,
      {
        headers: headers ? headers : this.headers,
        method: 'GET',
        ...signal,
      },
      format
    );
  }

  post(url, data, format, headers, signal) {
    let endpoint = this.namespace + url;
    return this._makeRequest(
      endpoint,
      {
        headers: headers ? headers : this.headers,
        method: 'POST',
        body: data?.data ? data.data : null,
        ...signal,
      },
      format
    );
  }

  upload(method, url, data, signal) {
    let endpoint = this.namespace + url;
    let headers = this.headers;
    headers.delete('Content-Type');
    return this._makeRequest(endpoint, {
      headers: headers,
      method: method || 'POST',
      body: data?.data ? data.data : null,
      ...signal,
    });
  }

  put(url, data, format, headers, signal) {
    let endpoint = this.namespace + url;
    return this._makeRequest(
      endpoint,
      {
        headers: headers ? headers : this.headers,
        method: 'PUT',
        body: data?.data ? data.data : null,
        ...signal,
      },
      format
    );
  }

  del(url, data, headers, signal) {
    let endpoint = this.namespace + url;
    if (data) {
      let qs = Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');
      endpoint = endpoint + '?' + qs;
    }
    return this._makeRequest(endpoint, {
      headers: headers ? headers : this.headers,
      method: 'DELETE',
      ...signal,
    });
  }

  external(method, url, data, format, headers, signal) {
    let body;
    if (method === 'HEAD' || method === 'GET' || method === 'DELETE') {
      if (data) {
        let qs = Object.keys(data)
          .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
          .join('&');
        url = url + '?' + qs;
      }
    } else {
      body = {
        body: data?.data ? data.data : null,
      };
    }
    return this._makeRequest(
      url,
      {
        headers: headers ? headers : this.headers,
        method: method,
        ...body,
        ...signal,
      },
      format
    );
  }

  _makeRequest(endpoint, options, responseFormat) {
    return fetch(endpoint, options).then((response) => {
      if (response.ok) {
        if (options.method === 'HEAD') {
          return response.headers;
        } else {
          if (response.status === 204) {
            return '';
          } else {
            if (responseFormat === 'blob') {
              return response.blob();
            } else if (responseFormat === 'text') {
              return response.text();
            } else {
              return response.json();
            }
          }
        }
      } else {
        return response.json().then((response) => {
          return Promise.reject({
            status: response.status,
            payload: response,
          });
        });
      }
    });
  }
}
