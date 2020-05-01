const inputGithubUsername = document.querySelector('input[name=github-username]')
const buttonSearch = document.querySelector('button')
const contentElement = document.querySelector('.content')

buttonSearch.addEventListener('click', () => {
    const githubUsername = inputGithubUsername.value

    if(githubUsername) {
        NProgress.start()
        axios.get(`https://api.github.com/search/users?q=${githubUsername} in:login`)
            .then(response => {
                contentElement.innerHTML = ''
                
                for(item of response.data.items) {
                    console.log(item)
                    const resultElement = document.createElement('div')
                    const rightSection = document.createElement('section')
                    const avatarImgElement = document.createElement('img')
                    const linkElement = document.createElement('a')
                    const resultText = document.createTextNode(item.login)
    
                    avatarImgElement.src = item.avatar_url
                    avatarImgElement.alt = `Imagem do perfil de ${item.login}`
                    linkElement.href = item.html_url
                    linkElement.target = '_blank'
                    linkElement.title = `Visitar o perfil de ${item.login} no Github`

                    linkElement.appendChild(resultText)
                    rightSection.appendChild(document.createTextNode('Github Username: '))
                    rightSection.appendChild(linkElement)
    
                    resultElement.appendChild(avatarImgElement)
                    resultElement.appendChild(rightSection)
                    contentElement.appendChild(resultElement)
                }
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => {
                NProgress.done()
            })
    } else
        console.log('Digite um usuário do Github')
})

inputGithubUsername.addEventListener('keypress', function(key) {
    if(key.keyCode == 13)
        buttonSearch.click()
})