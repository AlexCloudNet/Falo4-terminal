function screen_mtrix(){

    let h_str = 140;
    let w_str = 100;

    for (let i = 0; i < chars_count; i++) {
        let char = randomChar();
        let char_w = ctx.measureText(char).width;

        if(i%screen.w_char_count == 0 && i >= screen.w_char_count){
            h_str += 26;
            w_str = 100;
        }
        matrix[i] = {
            x: w_str,
            y: h_str,
            opacity: chanks_opacity,
            color: `rgba(2, 165, 4, 0)`,
            char: char,
            char_w: char_w
        } 

        w_str+=20;
    }

    h_str = 140;
    w_str = 380;
    for (let i = 0; i < chars_count; i++) {
        let char = randomChar();
        let char_w = ctx.measureText(char).width;

        if(i%screen.w_char_count == 0 && i >= screen.w_char_count){
            h_str += 26;
            w_str = 380;
        }
        matrix[i + chars_count] = {
            x: w_str,
            y: h_str,
            opacity: chanks_opacity,
            color: `rgba(2, 165, 4, 0)`,
            char: char,
            char_w: char_w
        } 
        
        w_str+=20;
        
    }

}