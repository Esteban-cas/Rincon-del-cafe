export function renderEditForm(bookData, container) { 
    const form = document.createElement('form');
    form.classList.add('edit-form');

    form.innerHTML = `
        <label>Título: <input type="text" name="titulo" id="bookTitle" value="${bookData.titulo}"></label>
        <label>Año: <input type="number" name="publishingYear" id="bookYear" value="${bookData.publishingYear}"></label>
        <label>Autor: <input type="text" name="autor" id="bookAuthor" value="${bookData.autor}"></label>
        <label>Género: <input type="text" name="genero" id="bookGenre" value="${bookData.genero}"></label>
        <label>Portada: <input type="text" name="imagenPortada" id="bookImage" value="${bookData.imagenPortada}"></label>
        <label>Descripción: <input type="text" name="descripcion" id="bookDescription" value="${bookData.descripcion}"></label>
        <label>Editorial: <input type="text" name="editorial" id="bookEditorial" value="${bookData.editorial}"></label>
        <label>Páginas: <input type="number" id="bookPages" name="paginas" value="${bookData.paginas}"></label>
        <label>ISBN: <input type="number" id="bookIsbn" name="isbn" value="${bookData.isbn}"></label>
        <button type="submit">Guardar</button>
    `;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const payload = {
            id: bookData.id,
            titulo: form.querySelector('input[name="titulo"]').value,
            publishingYear: parseInt(form.querySelector('input[name="publishingYear"]').value),
            autor: form.querySelector('input[name="autor"]').value,
            genero: form.querySelector('input[name="genero"]').value,
            imagenPortada: form.querySelector('input[name="imagenPortada"]').value,
            descripcion: form.querySelector('input[name="descripcion"]').value,
            editorial: form.querySelector('input[name="editorial"]').value,
            paginas: parseInt(form.querySelector('input[name="paginas"]').value),
            isbn: form.querySelector('input[name="isbn"]').value
        };

        try {
            const res = await fetch(`https://localhost:7092/api/book/${bookData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Libro actualizado exitosamente. Puede que necesites esperar unos segundos, para visualizar lo");
                form.remove(); 
            } else {
                alert("Error al actualizar el libro.");
            }
        } catch (error) {
            console.error("Error actualizando libro", error);
        }
    }); 

    container.appendChild(form);
}


