const hangman = new Hangman('black')
const keyboard = document.getElementById('keyboard')
const hidden_chars = document.getElementById('hidden-chars')
const warning = document.getElementById('warning')
const over_text = document.getElementById('over-text')

const modal = document.getElementById('over-modal')
const instance = M.Modal.init(modal, { preventScrolling: true, dismissible: false })

class Game {
    constructor(word) {
        this.word = word
        
        this.keys = [
            ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            ['y', 'x', 'c', 'v', 'b', 'n', 'm']
        ]

        this.char = ''
        this.history = []
        this.fails = 0
        this.correct = 0
        this.tries = 0
        this.isOver = false
    }

    init() {
        this.create()

        Array.from(document.getElementsByClassName('key')).forEach(key => {
            key.addEventListener('click', (e) => {
                e.target.classList.add('clicked')
                this.handleKeyPress(e)
            })
        })

        this.boundEventListener = this.handleKeyPress.bind(this)
        window.addEventListener('keypress', this.boundEventListener)
    }

    handleKeyPress(e) {
        this.char = e.type === 'keypress' ? e.key : e.target.innerHTML
        this.tries++

        if (e.type === 'keypress') {
            const key_div = Array.from(document.getElementsByClassName('key')).filter(key => key.innerHTML === this.char)[0]
            if (key_div) key_div.classList.add('clicked')
        }

        if (!this.isValidKey()) {
            warning.innerHTML = `Error: character ${this.char} is invalid`
            return
        }

        if (this.isInHistory()) {
            warning.innerHTML = 'You have already entered that.'
            return
        }

        this.history.push(this.char)
        this.updateHistory()

        if (this.isInWord()) {
            this.correct++
            warning.innerHTML = 'Correct.'
            this.getIndexesOf().forEach(index => document.getElementsByClassName('hidden-char')[index].innerHTML = this.char)
        }
        else {
            this.fails++
            warning.innerHTML = 'Wrong choice.'
            this.handleHangman()
        }

        if (this.win() || this.lose()) {
            this.isOver = true
        }

        if (this.isOver)
            this.handleGameOver()
    }

    create() {
        hangman.drawHang()
        this.createKeyboard()
        this.createHiddenChars()
    }

    createKeyboard() {
        this.keys.forEach(line => {
            const row = document.createElement('div')
            row.classList.add('row')
            keyboard.append(row)

            const line_div = document.createElement('div')
            line_div.classList.add('line')
            row.append(line_div)

            line.forEach(key => {
                const key_div = document.createElement('div')
                key_div.classList.add('z-depth-1')
                key_div.classList.add('key')
                key_div.innerHTML = key
                line_div.append(key_div)
            })
        })
    }

    createHiddenChars() {
        Array.from(this.word).forEach(() => {
            const el = document.createElement('div')
            el.innerHTML = '_'
            el.classList.add('hidden-char')
            el.classList.add('z-depth-1')
            hidden_chars.append(el)
        })
    }

    updateHistory() {
        const span = document.createElement('span')
        const before = document.getElementById('history-closed-bracket')
        span.innerHTML = this.history[this.history.length - 1]
        span.classList.add('history-char')
        span.classList.add('light-blue-text')
        span.classList.add('text-lighten-5')
        before.parentNode.insertBefore(span, before)
    }

    handleGameOver() {
        // lock keys
        Array.from(document.getElementsByClassName('key')).forEach(key => key.classList.add('locked'))

        // update modal
        over_text.innerHTML = this.win() ? `You won in ${this.tries} tries!` : (this.lose() ? `You lost. The correct word was <strong>${this.word}</strong>` : '')
        modal.classList.add(this.win() ? 'green' : (this.lose() ? 'red' : ''))
        instance.open()

        window.removeEventListener('keypress', this.boundEventListener)
    }

    isValidKey = () => this.keys.some(row => row.includes(this.char))

    isInHistory = () => this.history.includes(this.char)

    isInWord = () => this.word.includes(this.char)

    getIndexesOf() {
        const arr = []
        Array.from(this.word).forEach((char, i) => { if (char === this.char) arr.push(i) })
        return arr
    }

    handleHangman() {
        switch (this.fails) {
            case 1: hangman.drawHead(); break
            case 2: hangman.drawBody(); break
            case 3: hangman.drawLeftLeg(); break
            case 4: hangman.drawRightLeg(); break
            case 5: hangman.drawLeftArm(); break
            case 6: hangman.drawRightArm(); break
        }
    }

    win = () => this.correct === [... new Set(Array.from(this.word))].length

    lose = () => this.fails === 6
}