
const studentsList = document.querySelector('#student-list')



function renderStudents(doc){
    let list     = document.createElement("li");
    let idturma  = document.createElement("span")
    let nome     = document.createElement("span")
    let cpf      = document.createElement("span")
    let rg       = document.createElement("span")
    let telAluno = document.createElement("span")
    let telResp  = document.createElement("span")
    let email    = document.createElement("span")
    let dataNasc = document.createElement("span")

    let excluir  = document.createElement("div")

    excluir.textContent = 'X'

    list.setAttribute('data-id', doc.id)
    idturma.textContent  = doc.data().id_turma
    nome.textContent     = doc.data().nome   
    cpf.textContent      = doc.data().cpf
    rg.textContent       = doc.data().rg
    telAluno.textContent = doc.data().telAluno
    telResp.textContent  = doc.data().telResp
    email.textContent    = doc.data().email
    dataNasc.textContent = doc.data().datanasc
    
    list.appendChild(idturma)
    list.appendChild(nome)
    list.appendChild(cpf)
    list.appendChild(rg)
    list.appendChild(telAluno)
    list.appendChild(telResp)
    list.appendChild(email)
    list.appendChild(dataNasc)
    list.appendChild(excluir)

    excluir.addEventListener('click', (event) => {
        event.stopPropagation()

        let id = event.target.parentElement.getAttribute('data-id')
        db.collection('alunos').doc(id).delete()
        .then(()=>{window.location.reload()})        
})

    studentsList.appendChild(list)
}



db.collection('alunos')
    .get()
    .then(
        (snapshot) => {
            snapshot.docs.forEach(doc => {
                renderStudents(doc)
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
