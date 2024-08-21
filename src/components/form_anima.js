
const FormAnimacion = (event) => {
  event.preventDefault();
  const form = event.target;
  form.style.animation = 'destroy 0.5s forwards';

  setTimeout(() => {
    form.style.animation = 'reappear 0.5s forwards';
  }, 500);
};

export default FormAnimacion