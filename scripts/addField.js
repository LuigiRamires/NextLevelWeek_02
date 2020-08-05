// Procurar o botão "+ Novo Horário"
// Quando clicar no botão, executar uma ação
    // Ação: Duplicar os campos
    // Depois de duplicar os campos, adicione eles visualmente na página.

    document.querySelector('#add-time') // 1° Passo - Procurar o botão
    .addEventListener('click', cloneField) // 2° Passo - Adicionar um "Ouvidor de Eventos".
    
    // 3 ° Passo - Criação da função que será chamada quando o botão for cliado
    function cloneField(){
            
        // 4° Passo - Acabamos de copiar todo o conteúdo da DIV que deve ser duplicada
        const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

        
        // 5° Passo - Antes de inserir na página, limpar os campos. Isso serve para serem "novos".
        const fields = newFieldContainer.querySelectorAll('input')
    
        // 6° Passo - Para cada campo, pegue ele e mude seu valor para vazio.
        fields.forEach(function(field){
            field.value = ""
        })
        
        // 7° Passo - Definir aonde será inserido o próximo bloco de horários. No caso, abaixo do último existente.
        document.querySelector('#schedule-items').appendChild(newFieldContainer)

    }
