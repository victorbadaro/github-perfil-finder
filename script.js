const inputCEP = document.querySelector('input[name=cep]')

$(inputCEP).mask('00000-000')

inputCEP.addEventListener('input', function() {
    if(this.value.length === 9)
        axios.get(`https://viacep.com.br/ws/${this.value}/json/`)
            .then(function(response) {
                console.log(response.data)
            })
            .catch(function(error) {
                console.warn(error)
            })
})