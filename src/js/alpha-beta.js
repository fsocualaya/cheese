let alpha_beta =  function (depth, alpha, beta, is_max) {
    let possible_moves = game.ugly_moves();
    if(depth === 0 || possible_moves.length === 0)
        return -get_board_value(game.board());

    if(is_max){
        for(let move of possible_moves){
            game.ugly_move(move);
            alpha = Math.max(alpha, alpha_beta(depth-1, alpha, beta, !is_max));
            game.undo();
            if(beta <= alpha)
                break;
        }
        return alpha;
    }else{
        for(let move of possible_moves){
            game.ugly_move(move);
            beta = Math.min(beta, alpha_beta(depth-1, alpha, beta, !is_max));
            game.undo();
            if(beta <= alpha )
                break;
        }
        return beta;
    }
};

let ab_best_move = function () {
    let best_score = -Infinity;
    let possible_moves = game.ugly_moves();
    let best_move;
    for(let move of possible_moves){
        game.ugly_move(move);
        let score = alpha_beta(ORIGINAL_DEPTH, -Infinity, Infinity, false);
        game.undo();
        if(score >= best_score) {
            best_score = score;
            best_move = move;
        }
    }
    console.log(count, best_score);
    game.ugly_move(best_move);
    board.position(game.fen());
};
