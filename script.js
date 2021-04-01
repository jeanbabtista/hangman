const game = new Game('caralalal')

document.addEventListener('DOMContentLoaded', async () => {
    const getRandomWord = async () => (await (await fetch('https://random-words-api.vercel.app/word')).json())[0].word.toLowerCase()
    
    const setLoadingScreen = () => {
        document.getElementById('game').classList.add('hidden')
        document.getElementById('loading').classList.remove('hidden')
    }

    const setGameScreen = () => {
        document.getElementById('loading').classList.add('hidden')
        document.getElementById('game').classList.remove('hidden')
    }

    setLoadingScreen()

    const word = await getRandomWord()
    console.log(word)

    setGameScreen()
    
    const game = new Game(word)
    game.init()
})