import { expect } from 'chai';
import sinon from 'sinon';
import { LanguageManager } from './language-manager.js';

describe('LanguageManager', () => {
  let languageManager;

  beforeEach(() => {
    localStorage.clear();
    languageManager = new LanguageManager();
  });

  it('should initialize with the correct default language', () => {
    expect(languageManager.getCurrentLanguage()).to.equal('tr');
    expect(document.documentElement.lang).to.equal('tr');
  });

  it('should update the language and notify subscribers', () => {
    const callback = sinon.spy();
    languageManager.subscribe(callback);

    languageManager.setLanguage('en');

    expect(languageManager.getCurrentLanguage()).to.equal('en');
    expect(document.documentElement.lang).to.equal('en');
    expect(localStorage.getItem('preferredLanguage')).to.equal('en');
    expect(callback.calledOnceWith('en')).to.be.true;
  });

  it('should not notify subscribers if the language does not change', () => {
    const callback = sinon.spy();
    languageManager.subscribe(callback);

    languageManager.setLanguage('tr');

    expect(callback.notCalled).to.be.true;
  });

  it('should allow unsubscribing from notifications', () => {
    const callback = sinon.spy();
    const unsubscribe = languageManager.subscribe(callback);

    unsubscribe();

    languageManager.setLanguage('en');

    expect(callback.notCalled).to.be.true;
  });

  it('should dispatch a "language-changed" event when the language changes', () => {
    const eventListener = sinon.spy();
    window.addEventListener('language-changed', eventListener);

    languageManager.setLanguage('en');

    expect(eventListener.calledOnce).to.be.true;
    const eventDetail = eventListener.firstCall.args[0].detail;
    expect(eventDetail.language).to.equal('en');
  });

  it('should not dispatch a "language-changed" event if the language does not change', () => {
    const eventListener = sinon.spy();
    window.addEventListener('language-changed', eventListener);

    languageManager.setLanguage('tr');

    expect(eventListener.notCalled).to.be.true;
  });
});
