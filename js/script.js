function limpa_formulario_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}
     
function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";
            document.getElementById('ibge').value="...";

            //Sincroniza com a API https://viacep.com.br/.
            script = `https://viacep.com.br/ws/${cep}/json/`;
            
            let request = new XMLHttpRequest();
            request.open('GET', script);

            request.onload = function(){
                //convertendo formato json para objeto javascript.
                let endereco = JSON.parse(request.responseText);
                //campos
                let rua = document.getElementById('rua');
                rua.value = endereco.logradouro;
                
                let bairro = document.getElementById('bairro');
                bairro.value = endereco.bairro;
                
                let localidade = document.getElementById('cidade');
                localidade.value = endereco.localidade;
                
                let uf = document.getElementById('uf');
                uf.value = endereco.uf;
                
                let ibge = document.getElementById('ibge');
                ibge.value = endereco.ibge;
            }
            request.send();
           
        }else {
            //cep é inválido.
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {
        //cep sem valor, limpa formulário.
        limpa_formulario_cep();
    }
};
