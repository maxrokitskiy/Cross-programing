const readlineSync = require('readline-sync');
function RandomArr(arr) {
    arr[0] = Math.floor(Math.random() * Math.floor(9))
    for (let i = 1; i <= 3; i++) {
		while (arr[i] == arr[i - 1] || arr[i] == arr[i - 2] || arr[i] == arr[i - 3] || arr[i] == arr[i - 4]) {
			arr[i] = Math.floor(Math.random() * Math.floor(9))
		}
	}
	return arr
}
let bulls = 0
let cows = 0
let rounds = 0
let player_1 = []
let player_2 = []
player_1 = RandomArr(player_1)

function check_in(arr) {
    for (let i = 1; i <= 3; i++) {
        if (arr[i] == arr[i - 1] || arr[i] == arr[i - 2] || arr[i] == arr[i - 3] || arr[i] == arr[i - 4]) {
            console.log(`Figures in number must be different. Try again `)
            console.log('')
            return true
        }
    }
    return false
}

function Check_the_arrow() {
 bulls = 0
 cows = 0
 player_2 = []
    do {
        player_2 = readlineSync.question('Your number (length qual to 4): ')
    } while (player_2.length != 4 || check_in(player_2))

   for (var i = 0; i <= 3; i++) {
        for (var j = 0; j <= 3; j++) {
            if (player_2[i] == player_1[j] & i == j) {
                bulls++
            } else if (player_2[i] == player_1[j]) {
                cows++
            }
        }
    } 
 rounds++
 console.log(`Bulls:${bulls} Cows:${cows}`)
 console.log('')
}

while (bulls != 4) {
    Check_the_arrow()
}
console.log(`You WIN !!! Rounds:${rounds}`)




