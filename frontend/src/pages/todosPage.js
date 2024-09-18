export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const form = document.createElement("form");
  form.classList.add("mb-4");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const titleInput = document.getElementById("todoTitle").value;
    const completedInput = document.getElementById("todoCompleted").checked;

    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: titleInput, completed: completedInput, owner: 1 }),
      credentials: "include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al crear el todo");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Todo creado:", data);
      alert("Todo creado exitosamente");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al crear el todo");
    });
  });

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "todoTitle";
  titleInput.placeholder = "Título del Todo";
  titleInput.classList.add("border", "p-2", "mb-2", "w-full");

  const completedInput = document.createElement("input");
  completedInput.type = "checkbox";
  completedInput.id = "todoCompleted";

  const completedLabel = document.createElement("label");
  completedLabel.setAttribute("for", "todoCompleted");
  completedLabel.textContent = "Completado";
  completedLabel.classList.add("ml-2");

  const submitButton = document.createElement("button");
  submitButton.textContent = "Agregar Todo";
  submitButton.classList.add("bg-blue-500", "text-white", "p-2", "rounded");

  form.appendChild(titleInput);
  form.appendChild(completedInput);
  form.appendChild(completedLabel);
  form.appendChild(submitButton);

  const table = document.createElement("table");
  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(form);
  container.appendChild(table);

  const modal = document.createElement("div");
  modal.classList.add("fixed", "inset-0", "bg-black", "bg-opacity-50", "hidden", "justify-center", "items-center");
  
  const modalContent = document.createElement("div");
  modalContent.classList.add("bg-white", "p-5", "rounded", "shadow-lg");

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Editar Todo";
  modalContent.appendChild(modalTitle);

  const modalTitleInput = document.createElement("input");
  modalTitleInput.type = "text";
  modalTitleInput.placeholder = "Nuevo título";
  modalTitleInput.classList.add("border", "p-2", "w-full", "mb-2");

  const modalCompletedInput = document.createElement("input");
  modalCompletedInput.type = "checkbox";
  const modalCompletedLabel = document.createElement("label");
  modalCompletedLabel.textContent = "Completado";
  modalCompletedLabel.classList.add("ml-2");

  const modalSubmitButton = document.createElement("button");
  modalSubmitButton.textContent = "Guardar Cambios";
  modalSubmitButton.classList.add("bg-blue-500", "text-white", "p-2", "rounded");

  modalContent.appendChild(modalTitleInput);
  modalContent.appendChild(modalCompletedInput);
  modalContent.appendChild(modalCompletedLabel);
  modalContent.appendChild(modalSubmitButton);
  modal.appendChild(modalContent);
  container.appendChild(modal);

  const openModal = (todo) => {
    modalTitleInput.value = todo.title;
    modalCompletedInput.checked = todo.completed;
    modal.classList.remove("hidden");

    modalSubmitButton.onclick = () => {
      fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: modalTitleInput.value,
          completed: modalCompletedInput.checked,
          owner: todo.owner,
        }),
        credentials: 'include'
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el todo');
        }
        return response.json();
      })
      .then(() => {
        alert('Todo actualizado exitosamente');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error al actualizar el todo');
      });
    };
  };

  fetch("http://localhost:4000/todos", {
    credentials: "include"
  })
  .then((response) => response.json())
  .then((data) => {
    data.todos.forEach((todo) => {
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.classList.add("border", "px-4", "py-2");
      td1.textContent = todo.id;

      const td2 = document.createElement("td");
      td2.classList.add("border", "px-4", "py-2");
      td2.textContent = todo.title;

      const td3 = document.createElement("td");
      td3.classList.add("border", "px-4", "py-2");
      td3.textContent = todo.completed ? "Sí" : "No";

      const td4 = document.createElement("td");
      td4.classList.add("border", "px-4", "py-2");
      td4.textContent = todo.owner;

      const td5 = document.createElement("button");
      td5.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "flex", "items-center");
      td5.textContent = "Borrar";
      td5.addEventListener('click', () => {
        fetch(`http://localhost:4000/todos/${todo.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log('Éxito:', data);
          alert('Recurso eliminado exitosamente');
          window.location.reload()
        })
        .catch(error => {
          console.error('Hubo un problema con la solicitud:', error);
          alert('Error al eliminar el recurso');
        });
      });

      const td6 = document.createElement("button");
      td6.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "my-2", "flex", "items-center");
      td6.textContent = "Editar";
      td6.addEventListener('click', () => openModal(todo));

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tbody.appendChild(tr);
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });

  return container;
};
