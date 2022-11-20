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
import { randomChar, randomIntFromInterval, randomIntervalException } from "./models/randomChar.js";




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

    let chanks_arr = Array.from(Array(chars_count*2).keys());
    console.log(chanks_arr)

    for (let i = 0; i < screen.words_count; i++) {
        let start_pos = chanks_arr[
            Math.floor(Math.random()*(chanks_arr.length - screen.words_length))
        ];

        let chars_arr = [];
        let highEnd = start_pos+screen.words_length - 1;
        let lowEnd = start_pos;
        for (let i = lowEnd; i <= highEnd; i++) {
            chars_arr.push(i);
        }
        start_words.push(chars_arr);

        for (let j = 0; j < start_words.length; j++) {
            chanks_arr = chanks_arr.filter(i => !start_words[j].includes(i)); 
        }

    }

    console.log(chanks_arr);


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

    let password_obj = {};
    for (let i = 0; i < screen.words_count; i++) {
        let arr_num = start_words[i];
        let arr_w = Array.from(password_arr[i]);
        let data_obj = {};
        arr_num.forEach(function(item, i) {
            data_obj[item] = arr_w[i];
        });
        password_obj[password_arr[i]] = data_obj;
    }
    
        
    for (let key in password_obj) {
        if (password_obj.hasOwnProperty.call(password_obj, key)) {
            for (let k in password_obj[key]) {
                matrix[k].char = password_obj[key][k];
                matrix[k].isWord = true;
                matrix[k].char_range = Object.keys(password_obj[key]);
                matrix[k].rect_w = matrix[k].char_range[matrix[k].char_range.length -1];

            }
            
            
        }
    }


console.log(password_obj);
console.log(matrix);

}

let rect_opacity_flag = false;
let rect_opacity = {
    chanks: undefined,
    opacity: 0,
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
    if(rect_opacity_flag){
        rect_opacity.chanks.forEach(elem=>{
            ctx.fillRect(matrix[elem].x, matrix[elem].y - 14, 10, 18)
        })
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
    let x_off = 4,
        y_off = 12;
        
    for(let key in matrix){
        
        if( e.layerX - x_off >= matrix[key].x && 
            e.layerX - x_off <= matrix[key].x + matrix[key].char_w &&
            e.layerY >= matrix[key].y - 12 &&
            e.layerY <= matrix[key].y + 12
        ){
            matrix[key].opacity = 1;
                if(matrix[key].isWord){
                    rect_opacity_flag = true;
                    rect_opacity.chanks = matrix[key].char_range;
                }else{
                    rect_opacity_flag = false;
                }
        }else{
            matrix[key].opacity = 0;
        }
        
    }
    
    // layerX = e.layerX - 4;
}
