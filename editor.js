import { renderEditForm } from './put.js';

const apiUrl = "https://localhost:7092/api/book"
const container = document.getElementById("books-container")

fetch(apiUrl)
    .then(data => {
        if (!data.ok) {
            throw new Error("Network error")
        }

        return data.json();
    })
    .then(res => {
        console.log(res);

        res.forEach(el => {
            const card = `                
                <div class="book-card" data-id="${el.id}">
                    <h2>${el.titulo}. Publicado: ${el.publishingYear}</h2>
                    <p>${el.autor}</p>
                    <p>${el.genero}</p>
                    <img src="${el.imagenPortada}">
                    <p>${el.descripcion}</p>
                    <p>${el.editorial}</p>
                    <p>páginas: ${el.paginas}</p>
                    <p>ISBN: ${el.isbn}</p>

                    <div class="button-group">
                        <button class="edit" data-id="${el.id}">Editar</button>
                        <button class="delete" data-id="${el.id}">Borrar</button>
                    </div>

                    <div class="edit-form-container" style="display: none;"></div>
                </div>
            `
            container.insertAdjacentHTML("beforeend", card)

        });

    })


    .catch(err => {
        console.error("Error fetching the data", err);

        container.innerHTML = `
         <p style="color:red;">Something went wrong, try again later </p> 
        `
    })


container.addEventListener("click",async (event) => {
    const editBtn = event.target.closest(".edit");
    const deleteBtn = event.target.closest(".delete");

    if (editBtn) {
        // Cierra cualquier formulario abierto
        document.querySelectorAll('.edit-form-container').forEach(container => {
            container.innerHTML = '';
            container.style.display = 'none';
        });

        const bookCard = editBtn.closest(".book-card");
        const id = bookCard.dataset.id;
        const formContainer = bookCard.querySelector(".edit-form-container");

        fetch(`https://localhost:7092/api/book/${id}`)
            .then(res => res.json())
            .then(bookData => {
                formContainer.innerHTML = "";
                formContainer.style.display = "block";
                renderEditForm(bookData, formContainer);
            })
            .catch(err => {
                console.error("Error cargando el libro para editar", err);
            });
    }

    if (deleteBtn) {
        const bookId = deleteBtn.getAttribute("data-id")
        try {
            const response = await fetch(apiUrl + `/${bookId}`, {
                method : "DELETE"
            })
            if (!response.ok) {
                alert("failed")
            }else{
                window.location.reload()
            }
    

        } catch (error) {
            alert('It was not able to delete')
        }
    }
}) 