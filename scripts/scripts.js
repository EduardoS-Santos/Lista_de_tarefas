//input.value.length<35

let imput = document.querySelector(".imput");
let botao = document.querySelector(".botao");
let bloco = document.querySelector(".container");
let local = document.querySelector(".bloco");

const validateinput = () => imput.value.trim().length > 0;

const addTask = () => {
  const inputvalido = validateinput();

  if (!inputvalido) {
    return imput.classList.add("erro");
  }

  //   Automatically create task list items
  const itemLista = document.createElement("div");
  itemLista.classList.add("item-lista");

  const rocket = document.createElement("button");
  rocket.classList.add("material-symbols-outlined");
  rocket.classList.add("rocket");
  rocket.innerText = "rocket_launch";

  rocket.addEventListener("click", () => {
    conclusao(itemLista, item, rocket);
  });

  const item = document.createElement("p");
  item.classList.add("item");
  item.innerText = imput.value;

  const trash = document.createElement("button");
  trash.classList.add("material-symbols-outlined");
  trash.classList.add("trash");
  trash.innerText = "delete";

  trash.addEventListener("click", () => {
    deletar(itemLista, item);
  });

  bloco.appendChild(local);
  local.appendChild(itemLista);
  itemLista.appendChild(rocket);
  itemLista.appendChild(item);
  itemLista.appendChild(trash);

  imput.value = "";

  dadosDoNavegador();
};

// Mark a task as complete and deselect if it is complete
const conclusao = (itemLista, item, rocket) => {
  const tarefa = itemLista.childNodes[1];

  while (item == tarefa) {
    if (tarefa.isSameNode(item)) {
      itemLista.classList.toggle("concluido");
      tarefa.classList.toggle("completo");
      rocket.classList.toggle("arte");
    }

    dadosDoNavegador();

    return;
  }
};

//deletes task
const deletar = (itemLista, item) => {
  const tarefa = itemLista.childNodes[1];

  while (item == tarefa) {
    if (tarefa.isSameNode(item)) {
      itemLista.remove();
      dadosDoNavegador();
    }

    return;
  }
};

//removes the "error" class from the empty input
const changes = () => {
  const inputvalido = validateinput();

  if (inputvalido) {
    return imput.classList.remove("erro");
  }
};

//saves the data to LocalStorage
const dadosDoNavegador = () => {
  const tarefa = local.childNodes;

  const tarefasDoLocalStorage = [...tarefa].map((itemLista) => {
    const itens = itemLista.childNodes[1];
    const completados = itens.classList.contains("completo");

    return { descricao: itens.innerText, completados };
  });

  localStorage.setItem("tarefa", JSON.stringify(tarefasDoLocalStorage));
};

//reloads data from LocalStorage
const recarregamantoLocalStorage = () => {
  const salvas = JSON.parse(localStorage.getItem("tarefa"));

  if (!salvas) return;
  for (let index = 0; index < salvas.length; index++) {
    const itemLista = document.createElement("div");
    itemLista.classList.add("item-lista");

    const rocket = document.createElement("button");
    rocket.classList.add("material-symbols-outlined");
    rocket.classList.add("rocket");
    rocket.innerText = "rocket_launch";

    rocket.addEventListener("click", () => {
      conclusao(itemLista, item, rocket);
    });

    const item = document.createElement("p");
    item.classList.add("item");
    item.innerText = salvas[index].descricao;

    if (salvas[index].completados) {
      itemLista.classList.toggle("concluido");
      item.classList.toggle("completo");
      rocket.classList.toggle("arte");
    }

    const trash = document.createElement("button");
    trash.classList.add("material-symbols-outlined");
    trash.classList.add("trash");
    trash.innerText = "delete";

    trash.addEventListener("click", () => {
      deletar(itemLista, item);
    });

    bloco.appendChild(local);
    local.appendChild(itemLista);
    itemLista.appendChild(rocket);
    itemLista.appendChild(item);
    itemLista.appendChild(trash);
  }
};
recarregamantoLocalStorage();

botao.addEventListener("click", () => addTask());
imput.addEventListener("change", () => changes());
