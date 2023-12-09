import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';

const saveStateToLocalStorage = () => {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formData));
};

const fillFormFields = () => {
  const savedData = localStorage.getItem(storageKey);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    form.elements.email.value = parsedData.email;
    form.elements.message.value = parsedData.message;
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  console.log('Submitted:', {
    email: form.elements.email.value,
    message: form.elements.message.value,
  });
  localStorage.removeItem(storageKey);
  form.reset();
};

form.addEventListener('input', throttle(saveStateToLocalStorage, 500));
form.addEventListener('submit', handleSubmit);

document.addEventListener('DOMContentLoaded', fillFormFields);

