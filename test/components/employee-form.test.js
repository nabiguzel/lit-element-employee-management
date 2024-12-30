import {assert, fixture} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../../src/components/employee-form.js';

suite('EmployeeForm', () => {
  let element;

  setup(async () => {
    element = await fixture(html`<employee-form></employee-form>`);
    await element.updateComplete;
  });

  test('renders form correctly', () => {
    const form = element.shadowRoot.querySelector('form');
    assert.exists(form, 'Form should exist');

    const inputs = form.querySelectorAll('input');
    assert.isAtLeast(inputs.length, 1, 'Form should have input elements');
  });

  test('renders required fields', () => {
    const form = element.shadowRoot.querySelector('form');
    
    const nameInput = form.querySelector('input[name="name"]');
    const positionInput = form.querySelector('input[name="position"]');
    const departmentInput = form.querySelector('input[name="department"]');
    
    assert.exists(nameInput, 'Name input should exist');
    assert.exists(positionInput, 'Position input should exist');
    assert.exists(departmentInput, 'Department input should exist');
  });

  test('updates form data on input change', async () => {
    const form = element.shadowRoot.querySelector('form');
    const nameInput = form.querySelector('input[name="name"]');
    
    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    await element.updateComplete;

    const formData = new FormData(form);
    assert.equal(formData.get('name'), 'John Doe');
  });

  test('shows validation messages for required fields', async () => {
    const form = element.shadowRoot.querySelector('form');
    
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await element.updateComplete;

    const validationMessage = element.shadowRoot.querySelector('.validation-message');
    assert.exists(validationMessage, 'Validation message should be shown');
  });

  test('emits submit event with form data', async () => {
    const form = element.shadowRoot.querySelector('form');
    
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = 'Test Value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    let submitEventFired = false;
    element.addEventListener('employee-submit', (e) => {
      submitEventFired = true;
      assert.exists(e.detail, 'Event should contain form data');
    });

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await element.updateComplete;

    assert.isTrue(submitEventFired, 'Submit event should be fired');
  });
});