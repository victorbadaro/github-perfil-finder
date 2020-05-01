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

                for(let item of response.data.items) {
                    const resultElement = document.createElement('div')
                    const avatarImgElement = document.createElement('img')
                    const rightSection = document.createElement('section')
                    const githubUserElement = document.createElement('div')
                    const githubUserLinkElement = document.createElement('a')
                    const resultText = document.createTextNode(item.login)

                    avatarImgElement.src = item.avatar_url
                    avatarImgElement.alt = `Imagem do perfil de ${item.login}`
                    
                    githubUserLinkElement.href = item.html_url
                    githubUserLinkElement.target = '_blank'
                    githubUserLinkElement.title = `Visitar o perfil de ${item.login} no Github`
                    githubUserLinkElement.appendChild(resultText)
                    
                    githubUserElement.appendChild(document.createTextNode('Github Username: '))
                    githubUserElement.appendChild(githubUserLinkElement)
                    
                    rightSection.appendChild(githubUserElement)

                    axios.get(`https://api.github.com/users/${item.login}`)
                        .then(response => {                            
                            const repoElement = document.createElement('div')
                            const repoLinkElement = document.createElement('a')
                            const resultText = document.createTextNode(response.data.public_repos)
        
                            repoLinkElement.href = `${item.html_url}?tab=repositories`
                            repoLinkElement.target = '_blank'
                            repoLinkElement.title = `Repositórios públicos de ${response.data.name}`
                            repoLinkElement.appendChild(resultText)
        
                            repoElement.appendChild(document.createTextNode('Repositórios: '))
                            repoElement.appendChild(repoLinkElement)

                            rightSection.appendChild(repoElement)
                        })
                        .catch(error => {
                            console.log(`Erro ao buscar os dados do(s) repositório(s) do usuário`)
                        })
    
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