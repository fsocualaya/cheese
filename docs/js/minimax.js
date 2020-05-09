let minimax = function (depth, is_max) {
    count++;
    if(depth === 0){
        return -get_board_value(game.board());
    }

    let possible_moves = game.ugly_moves();
    let best_score;

    if(is_max){
        best_score = -9999;
        for(let i=0;i<possible_moves.length;i++){
            game.ugly_move(possible_moves[i]);
            best_score = Math.max(best_score, minimax(depth-1, !is_max));
            game.undo();
        }
    }else{
        best_score = 9999;
        for(let i=0;i<possible_moves.length;i++){
            game.ugly_move(possible_moves[i]);
            best_score = Math.min(best_score, minimax(depth-1, !is_max));
            game.undo();
        }
    }

    return best_score;
};

let mm_best_move = function (){
    count = 0;
    let best_score = -9999;
    let move;
    let possible_moves = game.ugly_moves();

    for(let i=0;i<possible_moves.length;i++){
        game.ugly_move(possible_moves[i]);
        let score = minimax(ORIGINAL_DEPTH-1, false);
        // console.log(possible_moves[i], score);
        game.undo();
        if(score >= best_score){
            best_score = score;
            move = possible_moves[i];
        }
    }
    console.log(count, best_score);
    game.ugly_move(move);
    board.position(game.fen());
};

