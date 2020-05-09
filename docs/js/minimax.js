let minimax = function (depth, is_max) {
    count++;
    let possible_moves = game.ugly_moves();
    if(depth === 0 || possible_moves.length === 0){
        return -get_board_value(game.board());
    }

    let best_score;

    if(is_max){
        best_score = MIN;
        for(let move of possible_moves){
            game.ugly_move(move);
            best_score = Math.max(best_score, minimax(depth-1, !is_max));
            game.undo();
        }
    }else{
        best_score = MAX;
        for(let move of possible_moves){
            game.ugly_move(move);
            best_score = Math.min(best_score, minimax(depth-1, !is_max));
            game.undo();
        }
    }
    return best_score;
};

let mm_best_move = function (){
    count = 0;
    let best_score = MIN;
    let move;
    let possible_moves = game.ugly_moves();

    for(let possible_move of possible_moves){
        game.ugly_move(possible_move);
        let score = minimax(ORIGINAL_DEPTH-1, false);
        // console.log(possible_moves[i], score);
        game.undo();
        if(score >= best_score){
            best_score = score;
            move = possible_move;
        }
    }
    console.log(count, best_score);
    game.ugly_move(move);
    board.position(game.fen());
};

