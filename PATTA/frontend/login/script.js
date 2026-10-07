// Mostrar/ocultar senha
document.querySelectorAll('.olho').forEach(botao => {
  botao.addEventListener('click', () => {
    const input = botao.parentElement.querySelector('input');
    const icone = botao.querySelector('i');
    const mostrar = input.type === 'password';

    input.type = mostrar ? 'text' : 'password';
    icone.className = mostrar ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
  });
});

// Máscara de telefone
const telefone = document.getElementById('telefone');

if (telefone) {
  telefone.addEventListener('input', () => {
    const n = telefone.value.replace(/\D/g, '').slice(0, 11);
    telefone.value = n
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  });
}

// Marca o campo como inválido
function validar(id, valido) {
  document.getElementById(id).parentElement.classList.toggle('erro', !valido);
  return valido;
}

const emailValido = v => /^\S+@\S+\.\S+$/.test(v);
const valor = id => document.getElementById(id).value;

// Login
const formEntrar = document.getElementById('form-entrar');

if (formEntrar) {
  formEntrar.addEventListener('submit', e => {
    e.preventDefault();
    const ok = [
      validar('email', emailValido(valor('email'))),
      validar('senha', valor('senha') !== '')
    ].every(Boolean);

    if (ok) alert('Login válido!');
  });
}

// Cadastro
const formCriar = document.getElementById('form-criar');

if (formCriar) {
  formCriar.addEventListener('submit', e => {
    e.preventDefault();
    const ok = [
      validar('nome', valor('nome').trim().length > 2),
      validar('email', emailValido(valor('email'))),
      validar('telefone', valor('telefone').replace(/\D/g, '').length >= 10),
      validar('senha', valor('senha').length >= 6),
      validar('confirmar', valor('confirmar') === valor('senha') && valor('confirmar') !== '')
    ].every(Boolean);

    if (!document.getElementById('termos').checked) {
      return alert('É preciso concordar com os termos de uso.');
    }
    if (ok) alert('Conta criada!');
  });
}