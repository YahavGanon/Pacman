'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) removeGhost(nextLocation)
        else {
            gameOver()
            return
        } 

    }

    if (nextCell === FOOD) {
        playSound()
        updateScore(1)
        gGame.foodsCount--
        console.log(gGame.foodsCount)
        if (checkVictory()) gameOver2()
    }

    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        superPowerMode()


        updateScore(1)
        gGame.foodsCount--
        console.log(gGame.foodsCount)
        if (checkVictory()) gameOver2()

    }
    if (nextCell === CHERRY) {
        playSound()
        updateScore(10)
        
        console.log(gGame.foodsCount)
        if (checkVictory()) gameOver2()
    }



    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}

function superPowerMode() {
    gPacman.isSuper = true
    gRemovedGhosts = []
    setTimeout(() => {
        gPacman.isSuper = false
        gGhosts = gGhosts.concat(gRemovedGhosts)
        console.log('gGhostsAfter5Sec:', gGhosts)
    }, 5000)
}
