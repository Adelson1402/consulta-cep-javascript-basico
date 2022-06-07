function hiddenFields(){
    const toHide =  document.getElementsByClassName('hidden');

    document.getElementById('spinner').hidden = true;

    for(let e of toHide){
     e.hidden = true;
    }
     
 }

 function loading(){
     const body = document.getElementsByClassName('div-form');

     for(let b of body){
     
      b.style.display = "none";

      document.getElementById('spinner').hidden = false;

    }
 }

 function showBody(){
     const body = document.getElementsByClassName('div-form');

     for(let b of body){
     
      b.style.display = "";

      document.getElementById('spinner').hidden = true;

    }
 }


 function ShowFields(json){
    const toHide =  document.getElementsByClassName('hidden');


    if(!json.logradouro && !json.uf){
     alert('CEP NÃO ENCONTRADO\n FAÇA OUTRA BUSCA');
     return;
    }

    loading();

     setTimeout(function(){
         showBody();
     },2000);

    

    for(let e of toHide){
     e.hidden = false;
    }

        document.getElementById('rua').value = json.logradouro;
        document.getElementById('bairro').value = json.bairro;
        document.getElementById('cidade').value = json.localidade;
        document.getElementById('uf').value = json.uf;
        document.getElementById('ibge').value = json.ibge;
     
 }

 function isLetter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
 }

 function isDigit(str) {
     return str.length === 1 && str.match(/[0-9]/i);
 }    

 async function getCep(value){

     for (let c of value) {
         
         if (!isDigit(c)) {
             alert('o cep não pode conter caracteres especiais ou letras!');
             return;
         }
     }

     if(value == undefined || value.length === 0 ||  value.length < 8){
         alert('Preencha o campo de cep, o mesmo deve conter 8 digitos');
         return;
     }


    const response =  await fetch('https://viacep.com.br/ws/'+value+'/json/');

    if (response.ok) {
   
        let json = await response.json();

         ShowFields(json);


     } else {
       alert("HTTP-Error: " + response.status);
     }
}