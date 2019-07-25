const Agent = require('ai-agents').Agent;

var Hex = require("./HexGame");
const Score = require("./BoardScore.js");

class HexAgent extends Agent {

    constructor(value) {
        super(value);
    }
    
    /**
     * return a new move. The move is an array of two integers, representing the
     * row and column number of the hex to play. If the given movement is not valid,
     * the Hex controller will perform a random valid movement for the player
     * Example: [1, 1]
     */
    send() {
        let board = this.perception;
        let size = board.length;
        let available = getEmptyHex(board);
        let nTurn = size * size - available.length;
        if (nTurn == 0) { // First move
            return [Math.floor(size / 2), Math.floor(size / 2) - 1];
        } else if (nTurn == 1){
            return [Math.floor(size / 2), Math.floor(size / 2)];
        }

        let move = available[0];
        return [Math.floor (move / board.length), move % board.length];
    }
	
	

}

module.exports = HexAgent;

/**
	funcion poda alpha beta

¨*/

function alphaBetaPrunedMiniMax(board, maximizingPlayer, depth, alpha, beta){
		if (depth == 0 && Hex.goalTest(board)) {
	            return getHeuristicScore(board,this.getID());
	        }
	    if (getEmptyHex(board).length !== 0) {
	            if (maximizingPlayer) {
	                var bestValue = Double.NEGATIVE_INFINITY;
	                for (move in getEmptyHex(board)) {
	                	let updatedBoard = this.perception;
	                    bestValue = max(bestValue, alphaBetaPrunedMiniMax(updatedBoard,false, depth-1, alpha,beta));
	                    alpha = max(alpha, bestValue);
	                    if (beta <= alpha) {
	                        break;
	                    }
	                }
	                return bestValue;
	                } else {
	                var bestValue = Double.POSITIVE_INFINITY;
	                for (move in getEmptyHex(board)) {
	                    let updatedBoard = this.perception;
	                    bestValue = min(bestValue, alphaBetaPrunedMiniMax(updatedBoard,false, depth-1, alpha,beta));
	                    beta = min(beta, bestValue);
	                    if (beta <= alpha) {
	                        break;
	                    }
	                }
	                return bestValue;
	            }
	        } else {
	        	getHeuristicScore(board,this.getID());
	        }
    }


function getHeuristicScore(board,player){
	return Score(board,player);
}

/**
 * Return an array containing the id of the empty hex in the board
 * id = row * size + col;
 * @param {Matrix} board 
 */
function getEmptyHex(board) {
    let result = [];
    let size = board.length;
    for (let k = 0; k < size; k++) {
        for (let j = 0; j < size; j++) {
            if (board[k][j] === 0) {
                result.push(k * size + j);
            }
        }
    }
    return result;
}

