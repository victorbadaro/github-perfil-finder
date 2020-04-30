const inputGithubUsername = document.querySelector('input[name=github-username]')
const buttonSearch = document.querySelector('button')

buttonSearch.addEventListener('click', () => {
    const githubUsername = inputGithubUsername.value

    if(githubUsername) {
        NProgress.start()
        axios.get(`https://api.github.com/users/${githubUsername}`)
            .then(response => {
                console.log(response)
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