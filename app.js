/*
class Falo4Terminal{
    static #name = 'name'
    
    constructor(){
        this.opts = 'name';

    }

    static getname(){
        console.log( this.#name )
    }
}

Falo4Terminal.getname();
*/
import { randomChar, randomIntFromInterval } from "./models/randomChar.js";




const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let w = innerWidth;
let h = innerHeight;
window.onresize = function(){
    w = innerWidth;
    h = innerHeight;
}


let password_arr;
let matrix = {};
let chanks_opacity = 0;

let screen = {
    h_char_count: 16,
    w_char_count: 6,
    words_count: 0,
    words_length: 0,
    password: undefined,
}
let attempts = 4;
// let chars_count = screen.w_char_count * screen.h_char_count;
let chars_count = (screen.w_char_count * screen.h_char_count);

$.ajax({
	url: '/main.php',
    type: "POST",
    cache: false,
	dataType: 'json',
	success: function(data){
        password_arr = data;
        screen.words_count = password_arr.length - 1;
        screen.words_length = password_arr[0].length;
        screen.password = password_arr[password_arr.length - 1];

        console.log(screen.words_count);

        screen_mtrix();
        draw();
        canvas.addEventListener('mousemove', color_chanks);
	}
});

// text style opts
ctx.font = "18px sans-serif";
ctx.strokeStyle = "green";
ctx.fillStyle = "#02a504";




function render_text_terminal(){
    ctx.fillText('Добро пожаловать в сеть "Робко Индастриз(ТМ)"', 20, 30);
    ctx.fillText('Требуется пароль', 20, 58);
    let text_attempts_width = ctx.measureText('Осталось попыток:');

    ctx.fillText('Осталось попыток:', 20, 96);

    for (let i = 0; i < attempts; i++) {
        ctx.fillRect(text_attempts_width.width + 40 + i*25, 80, 16, 18);
    }

    for (let i = 0; i < screen.h_char_count; i++) {
        ctx.fillText('0xF000', 20, 140 + i*26);
        ctx.fillText('0xF000', 300, 140 + i*26);

    }
}

function screen_mtrix(){
    let start_words = [];
    
    for (let i = 0; i < screen.words_count; i++) {
        let start_pos = randomIntFromInterval(1, chars_count - screen.words_length)
        // start_words[i] = randomIntFromInterval(1, chars_count - screen.words_length)
        if( !start_words.includes(start_pos) ){
            start_words[i] = start_pos;
        }
    }
    console.log(start_words);

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
    
    for (let i = 0; i < screen.words_count; i++) {
        matrix[start_words[i]].char = start_words[i];
    }

    
console.log(matrix);
}

function render_pass(matrix){

    for (let key in matrix) {

        ctx.fillText(matrix[key].char, matrix[key].x, matrix[key].y);

        ctx.save();
        ctx.fillStyle = `rgba(2, 165, 4, ${matrix[key].opacity})`;
        // ctx.fillStyle = `rgba(2, 165, 4, 1)`;
        ctx.fillRect(matrix[key].x, matrix[key].y - 14, matrix[key].char_w + 4, 18)
        ctx.restore();

        ctx.fillStyle = `rgba(2, 165, 4, 1)`;


    }

}


function main_render(){
    render_text_terminal();
    render_pass(matrix);
}

// let layerX = '';
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    main_render();

    // ctx.fillText(layerX, 600, 100);
    requestAnimationFrame(draw);
}

function color_chanks(e){
    for(let key in matrix){
        if( e.layerX - 4 >= matrix[key].x && 
            e.layerX - 4 <= matrix[key].x + matrix[key].char_w &&
            e.layerY >= matrix[key].y - 12 &&
            e.layerY <= matrix[key].y + 12
        ){
            matrix[key].opacity = 1;
        }else{
            matrix[key].opacity = 0;
        }
        
    }
    
    // layerX = e.layerX - 4;
}
