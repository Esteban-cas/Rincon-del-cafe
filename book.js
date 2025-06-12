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
                <div class="book-card" id="book-card">
                <h2>${el.titulo}. Publicado: ${el.publishingYear}</h2>
                <p>${el.autor}</p>
                <p>${el.genero}</p>
                <img src="${el.imagenPortada}">
                <p>${el.descripcion}</p>
                <p>${el.editorial}</p>
                <p>páginas: ${el.paginas}</p>
                <p>ISBN: ${el.isbn}</p>
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