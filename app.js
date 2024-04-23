const studentsList = document.querySelector('#student-list')



function renderStudents(doc){
    let list    = document.createElement("li");
    let titulo  = document.createElement("span")
    let autor   = document.createElement("span")
    let excluir = document.createElement("div")

    excluir.textContent = 'X'

    list.setAttribute('data-id', doc.id)
    titulo.textContent = doc.data().titulo
    autor.textContent = doc.data().autor   
    
    list.appendChild(titulo)
    list.appendChild(autor)
    list.appendChild(excluir)

    excluir.addEventListener('click', (event) => {
        event.stopPropagation()

        let id = event.target.parentElement.getAttribute('data-id')
        // alert(id)
        db.collection('aluno').doc(id).delete()
        .then(()=>{window.location.reload()})
        
        
        
})

    livroList.appendChild(list)
}



db.collection('alunos')
    .get()
    .then(
        (snapshot) => {
            // console.log(snapshot.docs)
            snapshot.docs.forEach(doc => {
                renderBook(doc)
            });
        }
    )

//--------------------------

const form = document.querySelector('#add-student-form')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    db.collection('alunos')
        .add({
            id_turma: form.idturma.value,
            nome: form.name.value,
            cpf: form.cpf.value,
            rg: form.rg.value,
            telAluno: form.telStudent.value,
            telResp: form.telResp.value,
            email: form.email.value,
            datanasc: form.brnDate.value
        })
        .then(()=>{
            form.idturma.value = ""
            form.name.value = ""
            form.cpf.value = ""
            form.rg.value = ""
            form.telStudent.value = ""
            form.telResp.value = ""
            form.email.value = ""
            form.brnDate.value = ""
            window.location.reload()
        })
})
