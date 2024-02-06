'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '❤️'
const CHERRY = '🍒'
const ADD_BALL_FREQ = 15000

// Model
const gGame = {
    score: 0,
    isOn: false,
    foodsCount: 60
}
var gBoard

function onInit() {
    hideModal()
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true

    gBallInterval = setInterval(addCherry, ADD_BALL_FREQ)


    // moveGhosts()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD


            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][1] = SUPERFOOD
    board[8][8] = SUPERFOOD
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom

    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
}


function showModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

function checkVictory() {
    return gGame.foodsCount === 0
}

function gameOver2() {
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    showModal()
}

function getEmptyPos() {
    const emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell !== WALL) {
                emptyPoss.push({ i, j })
            }
        }
    }

    const randIdx = getRandomInt(0, emptyPoss.length)
    return emptyPoss[randIdx]
}

function addCherry() {
    const emptyPos = getEmptyPos()
    if (!emptyPos) return
    gBoard[emptyPos.i][emptyPos.j] = CHERRY
    renderCell(emptyPos, CHERRY)
}

function playSound() {
    const sound = new Audio('sound/sound.mp4')
    sound.play()
}

