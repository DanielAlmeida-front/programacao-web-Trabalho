           
                            let listagem = document.querySelector(".listagem")
                            let idLivro = document.getElementById("idLivro")
                            let tituloLivro= document.getElementById("tituloLivro")
                            let autorLivro = document.getElementById("autorLivro")

                            let listLivros = document.getElementById("listLivros")
                            let addLivros = document.getElementById("addLivros")
                            let modLivros = document.getElementById("modLivros")
                            let rmvLivros = document.getElementById("rmvLivros")

                            addLivros.addEventListener("click",()=>{
                                    let livro = {
                                                    id:idLivro.value,
                                                    titulo: tituloLivro.value,
                                                    autor: autorLivro.value
                                                }

                            fetch("https://livros.acilab.com.br/api/livros",{
                            method: "POST",
                            headers:{
                                "Content-Type":"application/json"
                            }, 
                            body:JSON.stringify(livro)
                        })
                            .then(response=>response.json())
                            .then(dados=>{
                                console.log("Livro adicionado com sucesso",dados)
                            })
                             .then(()=>{
                                carregarLivros()
                            })
                             .catch(error => {
                            console.log("Erro:", error)
                            })
                               })
                        rmvLivros.addEventListener("click",()=>{
                            fetch(`https://livros.acilab.com.br/api/livros/${idLivro.value}`,{
                                method:"DELETE",
                        })
                        .then(response => response.json())
                        .then(dados =>{
                            console.log("Livro removido:", dados)
                        })
                        .then(()=>{
                                carregarLivros()
                            })
                         .catch(error => {
                            console.log("Erro:", error)
                        })
                    })
                        modLivros.addEventListener("click",()=>{
                                 let livro = {
                                    titulo: tituloLivro.value,
                                    autor: autorLivro.value
                                            }
                            fetch(`https://livros.acilab.com.br/api/livros/${idLivro.value}`,{
                                method:"PUT",
                             headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(livro)
                                })
                             .then(response => response.json())
                        .then(dados =>{
                            console.log("livro modificado:", dados)
                        })
                        .then(()=>{
                                carregarLivros()
                            })
                         .catch(error => {
                            console.log("Erro:", error)
                        })

                        })
                            function carregarLivros(){
                            fetch("https://livros.acilab.com.br/api/livros",{
                                method:"GET",
                                headers:{"Content-Type": "application/json"

                                }
                            })
                            .then(response => response.json())

                            .then(dados=>{ 
                                let html =`
                                <table border="2">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Titulo</th>
                                            <th>Autor</th>
                                            <th>ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                     `
                                dados.forEach((livro,index) =>{
                                    html += `
                                    <tr>
                                        <td>${index+1}</td>
                                        <td>${livro.titulo}</td>
                                        <td>${livro.autor}</td>
                                        <td>${livro.id}</td>
                                    </tr>
                                    `

                               })
                            html +=`
                               </tbody>
                            </table>
                                `
                            listagem.innerHTML= html
                            })
                            .catch(error =>{
                                console.log("Erro:",error)
                            })
                    }