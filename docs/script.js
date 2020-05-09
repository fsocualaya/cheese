let board = null;
const game = new Chess();
const whiteSquareGrey = '#a9a9a9';
const blackSquareGrey = '#696969';

// variables for search algorithms
let count;
const ORIGINAL_DEPTH = 3;
const BOARD_SIDE = 8;
const MAX = 9999;
const MIN = -9999;

function removeGreySquares () {
  $('#chessboard .square-55d63').css('background', '')
}

function greySquare (square) {
  const $square = $('#chessboard .square-' + square);

  let background = whiteSquareGrey;
  if ($square.hasClass('black-3c85d')) {
    background = blackSquareGrey
  }

  $square.css('background', background)
}

function onDragStart (source, piece) {
  // do not pick up pieces if the game is over
  if (game.game_over())
    return false;

  // or if it's not that side's turn
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  removeGreySquares();

  // see if the move is legal
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null)
    return 'snapback';

  const algorithm = $("input[name=algorithm]:checked").attr('id');

  if(algorithm === 'minimax')
    window.setTimeout(mm_best_move, 250);
  else if(algorithm === 'alpha-beta-prunning')
    window.setTimeout(ab_best_move, 250);
}

function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  const moves = game.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0)
    return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (let i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
}

function onMouseoutSquare (square, piece) {
  removeGreySquares()
}

function onSnapEnd () {
  board.position(game.fen())
}

// Utilitarians for both search functions
let get_board_value =  function(board){
  let value = 0;
  for (let i = 0; i < BOARD_SIDE; i++) {
    for (let j = 0; j < BOARD_SIDE; j++) {
      value += get_piece_value(board[i][j]);
    }
  }
  return value;
};

let get_piece_value =  function(piece){
  if(piece != null){
    let piece_value = 0;
    switch(piece.type){
      case 'p':
        piece_value = 10;
        break;
      case 'r':
        piece_value = 50;
        break;
      case 'n':
        piece_value = 30;
        break;
      case 'b':
        piece_value = 30;
        break;
      case 'q':
        piece_value = 90;
        break;
      case 'k':
        piece_value = 900;
        break;
    }
    return piece.color === 'w' ? piece_value : -piece_value;
  }
  return 0;
};

const config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
};
board = Chessboard('chessboard', config)
