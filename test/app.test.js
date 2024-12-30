import {assert, fixture} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('App', () => {
  test('renders correctly', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    await el.updateComplete;
    assert.exists(el);
  });
}); 