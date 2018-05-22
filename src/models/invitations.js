// @flow

import superagent from 'superagent';

import config from '../../config';

class Invitations {
  username: string;
  token: string;
  baseUrl: string;

  constructor (params: {
    token: string,
    username: string
  }) {
    this.token = params.token;
    this.username = params.username;
    this.baseUrl = config.dev.host +
      ':' + config.dev.port +
      '/' + this.username;
    console.log('baseurl:', this.baseUrl);
  }

  makeUrl (path: string): string {
    return this.baseUrl + path;
  }

  async get (params: {
    requester: string,
    token: string
  }): Promise<any> {
    const url = this.makeUrl('/invitations');
    console.info('doing invitations.get call to ', url);
    return superagent.get(url);
  }

  async create (params: {
    requestee?: string,
    requesteePryvUsername: string,
    status: string,
    campaignId: string
  }): Promise<any> {
    const url = this.makeUrl('/invitations');
    console.info('doing invitations.create call to', url, 'with params', params);
    return superagent.post(url)
      .send(params);
  }
}

export default Invitations;
