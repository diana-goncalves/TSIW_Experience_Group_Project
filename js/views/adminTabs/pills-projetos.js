import * as Project from "../../models/ProjectModel.js"

Project.init()

// Para o futuro: substituir locaction.reload(); e adicionar edição de imagens

// Variavel criada para distinguir entre editar e adicionar projeto
let currentEditingProject = null;

// Form submit para editar e adicionar projetos
function submitForm() {
    document.querySelector("#formProjetos").addEventListener("submit",(event) => {
        event.preventDefault();

        const imgData = document.querySelector("#fileInputProjects").files[0];
        
        // Guardar valores dos inputs
        const projectData = {
            name: document.querySelector("#formNomeP").value,
            link: document.querySelector("#formLinkP").value,
            author: document.querySelector("#formAuthorP").value,
            msgProjects: document.querySelector("#formMsgP").value,
        }
        
        if (imgData) {
            // Criar instancia do file reader que converte a imagem para string
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // Adicionar imagem ao projectData
                projectData.photo = reader.result;

                submitProject(projectData);
                
            })

            reader.readAsDataURL(imgData);

        } else {
            // Se não tiver imagem
            projectData.photo = null;

            submitProject(projectData);
        }
        
    });
    
}

function submitProject(projectData) {
    try {
        
        if (currentEditingProject) {
            // Editar projeto 

            Project.editProject(currentEditingProject, projectData);
            alert("Projeto editado com sucesso!");
            location.reload();

        } else {
            // Adicionar projeto

            Project.addProject(projectData.name, projectData.photo, projectData.link, projectData.author, projectData.msgProjects);
            alert("Projeto adicionado com sucesso!");
            location.reload();
        }

        // limpar variavel que "avisa" se é para editar ou adicionar projeto
        currentEditingProject = null;

    } catch (error) {
        alert(error.message);
    
        location.reload();
    }
}

// FALTA EDITAR IMAGEM

function editProject(projectName) {
    
    const project = Project.getProjectByName(projectName);

    if (project) {
        currentEditingProject = projectName;
        
        document.querySelector("#formNomeP").value = project.name;
        document.querySelector("#formLinkP").value = project.link;
        document.querySelector("#formAuthorP").value = project.author;
        document.querySelector("#formMsgP").value = project.msgProjects;
        
    }
   
    // adicionar botão para cancelar edição

    const cancelEditP = document.querySelector("#cancelEditProject");
    
    // adicionar botão para dar reset ao form
    cancelEditP.style.display = "block";

    // remover botão depois de dar reset
    cancelEditP.addEventListener("click", () => {
        cancelEditP.style.display = "none";
        currentEditingProject = null;
    })

}

// Form submit para editar e adicionar projetos

function renderTableProjects(projects = []) {
    
    const tabelaProjects = document.querySelector("#table-projetos");
    
    // Limpar tabela primeiro
    tabelaProjects.innerHTML = "";
    
    // Caso não encontre users ( filtro não encontra nenhum nome igual )
    if (projects.length === 0) {
        tabelaProjects.innerHTML = 
        `
            <tr>
                <td colspan="7" style="text-align:center;">Não foram encontrados projetos!</td>
            </tr>
        `
        return;
    }
    
    projects.forEach(project => {
        
        tabelaProjects.innerHTML += 
        `
            <tr>
                <td>${project.author}</td>
                <td>${project.name}</td>
                <td>${project.msgProjects}</td>
                <td style="text-align: center;">${project.link ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;">${project.photo ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;">${project.state}</td>
                <td style="text-align: center;">
                    
                    <div class="dropdown">
                        
                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false"  style="color:var(--color-yellow);border:0;">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item removeP" id="${project.name}"">Remover</a></li>
                            <li><a class="dropdown-item editarP" id="${project.name}">Editar</a></li>
                            <li><a class="dropdown-item publicarP" id="${project.name}">Publicar</a></li>
                            <li><a class="dropdown-item destacarP" id="${project.name}">Destacar</a></li> 
                            <li><a class="dropdown-item ocultarP" id="${project.name}">Ocultar</a></li>
                        </ul>

                    </div>
                   
                </td>
            </tr>
        `
    });

    // Clicar no botão remover PROJETO

    const btnsRemoveP = document.getElementsByClassName("removeP");

    for (const button of btnsRemoveP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo remover o projeto?")) {
                Project.removeProjects(button.id);
                location.reload();
            }
        })
    }

    // Clicar no botão editar 

    const btnsEditarP = document.getElementsByClassName("editarP");

    for (const button of btnsEditarP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo editar o projeto?")) {
                editProject(button.id);
            }
        })
    }

    // Clicar no botão publicar - NAO IMPLEMENTADO

    const btnsPublicarP = document.getElementsByClassName("publicarP");

    for (const button of btnsPublicarP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo publicar o projeto?")) {
                postProject(button.id);
            }
        })
    }

    // Clicar no botão ocultar - NAO IMPLEMENTADO

    const btnsOcultarP = document.getElementsByClassName("ocultarP");

    for (const button of btnsOcultarP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo ocultar o projeto?")) {
                hideProject(button.id);   
            }
        })
    }

     // Clicar no botão destacar - NAO IMPLEMENTADO

     const btnsDestacarP = document.getElementsByClassName("destacarP");

     for (const button of btnsDestacarP) {
         button.addEventListener("click", () => {
             if(confirm("Queres mesmo destacar o projeto?")) {
                highlightProject(button.id);
             }
         })
     }

    submitForm();

}

renderTableProjects(Project.getProjects());

// Procurar projeto pelo nome automatico
const filterInputProjects = document.querySelector("#procuraProjetos");

filterInputProjects.addEventListener("input", () => {
    renderTableProjects(Project.getProjects(filterInputProjects.value));
})

// Clicar no botão organizar
let isSorted = false;
const orderButtonProjects = document.querySelector("#btnOrderProjetos");

orderButtonProjects.addEventListener("click", () => {
    
    if(isSorted) {
        // Caso já tenham clicado para organizar, tirar o sort
        renderTableProjects(Project.getProjects(filterInputProjects.value));
    } else {
        // Organizar a lista de projetos filtrados, se não houver filtros organiza APENAS a tabela
        renderTableProjects(Project.sortProjects(Project.getProjects(filterInputProjects.value)));
    }
    
    isSorted = !isSorted;

})

function postProject(projectName) {

    editState(projectName,"Publicado");

    alert("Projeto publicado com sucesso!");
    
    location.reload();

}

function hideProject(projectName) {
    
    editState(projectName,"Oculto");

    alert("Projeto ocultado com sucesso!");

    location.reload();

}

function highlightProject(projectName) {

    editState(projectName,"Destacado");

    alert("Projeto destacado com sucesso!");

    location.reload();

}

function editState(projectName, newState) {
    const project = Project.getProjectByName(projectName);

    if(project) {
        // Alterar state na local storage para publicado

        let projects = JSON.parse(localStorage.getItem("projects"));
        
        let ProjectIndex = projects.findIndex(project => project.name === projectName);

        if (ProjectIndex !== -1) {
            projects[ProjectIndex].state = newState;
        }
        
        localStorage.setItem("projects", JSON.stringify(projects));
    }
}
