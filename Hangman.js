const canvas = document.getElementById('hangman')
const ctx = canvas.getContext('2d')

canvas.width = 400
canvas.height = 400

const drawRotatedRect = (x, y, width, height, degrees, color) => {
    // https://stackoverflow.com/questions/17125632/html5-canvas-rotate-object-without-moving-coordinates
    ctx.save() // first save the untranslated/unrotated context
    ctx.beginPath()
    ctx.translate(x + width / 2, y + height / 2) // move the rotation point to the center of the rect
    ctx.rotate(degrees * Math.PI / 180) // rotate the rect
    ctx.rect(-width / 2, -height / 2, width, height) // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore() // restore the context to its untranslated/unrotated state
}

class Hangman {
    constructor(color) {
        this.color = color

        this.width = 8
        this.body_height = 120

        this.head_radius = 30
        this.hang_width = this.width
        this.top_offset = this.hang_width + this.head_radius
    }

    drawHang() {
        const width = this.hang_width
        const height = canvas.height - width

        ctx.beginPath()
        ctx.rect(0, 0, width, height)
        ctx.arc(width / 2, height, width / 2, 0, Math.PI * 2)
        ctx.rect(0, 0, canvas.width / 2 + this.width, width)
        ctx.arc(canvas.width / 2 + this.width, this.width / 2, this.width / 2, 0, Math.PI * 2)
        ctx.rect(canvas.width / 2, this.hang_width, 2, this.head_radius)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    drawHead() {
        const x_offset = canvas.width / 2 // center
        const y_offset = this.head_radius + this.top_offset // on top
        const radius = this.head_radius

        ctx.beginPath()
        ctx.arc(x_offset, y_offset, radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    drawBody() {
        const x_offset = canvas.width / 2 - this.width // center
        const y_offset = this.head_radius * 2 + this.top_offset - 10 // below head
        const width = this.width * 2
        const height = this.body_height

        ctx.beginPath()
        ctx.rect(x_offset, y_offset, width, height)
        ctx.arc(canvas.width / 2, y_offset + height, width / 2, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    drawLeftLeg() {
        const x_offset = canvas.width / 2 - this.width / 2 // center
        const y_offset = this.head_radius * 2 + this.body_height + this.top_offset // below body
        const width = this.width
        const height = this.body_height * 3 / 4

        const angle = 25
        const x = 20
        const y = 20

        drawRotatedRect(x_offset - x, y_offset - y, width, height, angle, this.color)
    }

    drawRightLeg() {
        const x_offset = canvas.width / 2 - this.width / 2 // center
        const y_offset = this.head_radius * 2 + this.body_height + this.top_offset // below body
        const width = this.width
        const height = this.body_height * 3 / 4

        const angle = 25
        const x = 20
        const y = 20

        drawRotatedRect(x_offset + x, y_offset - y, width, height, -angle, this.color)
    }

    drawLeftArm() {
        const x_offset = canvas.width / 2 - this.width / 2 // center
        const y_offset = this.head_radius * 2 + this.top_offset // in the middle of the body
        const width = this.width
        const height = this.body_height * 3 / 4

        const angle = 120
        const x = 45
        const y = 20

        drawRotatedRect(x_offset - x, y_offset - y, width, height, angle, this.color)
    }

    drawRightArm() {
        const x_offset = canvas.width / 2 - this.width / 2 // center
        const y_offset = this.head_radius * 2 + this.top_offset // in the middle of the body
        const width = this.width
        const height = this.body_height * 3 / 4

        const angle = 120
        const x = 45
        const y = 20

        drawRotatedRect(x_offset + x, y_offset - y, width, height, -angle, this.color)
    }
}