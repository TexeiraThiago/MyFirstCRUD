// global variables
let globalNames = [];
let inputName = null;
let isEditing = false;
let currentIndex = null;
window.addEventListener('load', () => {
  /* First prenvet form from submit on enter butto 
  Because the crud is in a form*/
  preventSubmit();

  inputName = document.querySelector('#data');
  activateInput();
  render();
});

function preventSubmit() {
  // capture form
  let form = document.querySelector('form');
  //create an event the prevent the submit on enter
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

function activateInput() {
  inputName.focus();
  inputName.addEventListener('keyup', (event) => {
    /*when want to submit when the key Enter is up
    so capture the event through the debbug browser */

    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      // after press enter, shearch for  event.target.value to capture the string and test if insertion or editions
      if (isEditing) {
        editNames(event.target.value);
      } else {
        insertNames(event.target.value);
      }
      render();
      isEditing = false;
    } else if (event.target.value.trim() === '' && event.key === 'Enter') {
      clearInput();
    }
  });
}

function editNames(newName) {
  globalNames[currentIndex] = newName;
}

function insertNames(typedName) {
  globalNames.push(typedName);
}

function render() {
  let lista = document.querySelector('#user');
  lista.innerHTML = '';
  let ul = document.createElement('ul');

  for (let i = 0; i < globalNames.length; i++) {
    let li = document.createElement('li');
    let currentName = globalNames[i];
    let span = createSpan(currentName, i);
    let button = createButton(i);
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  lista.appendChild(ul);
  clearInput();

  function createButton(index) {
    let button = document.createElement('button');
    button.classList.add('dButton');
    button.textContent = 'X';

    button.addEventListener('click', () => {
      globalNames.splice(index, 1);
      //must re-render after change de ul
      render();
    });

    return button;
  }

  function createSpan(name, index) {
    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', () => {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    });

    return span;
  }
}

function clearInput() {
  inputName.value = '';
}
