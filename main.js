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

let screen = {
    h_char_count: 16,
    w_char_count: 6,
}
let attempts = 4;
let chars_count = screen.w_char_count * screen.h_char_count;


let password_arr;
$.ajax({
	url: '/main.php',
    type: "POST",
    cache: false,
	dataType: 'json',
	success: function(data){
        password_arr = data;
        console.log(password_arr)
        console.log(password_arr[0].length)
        main_render();
	}
});
//await variant
/*
(async () => {
    const res = await fetch('/main.php', {
      headers: { Accept: 'application/json' },
    });
    const json = await res.json();
    Object.entries(json).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  })();
*/

function randomChar() {
    let fillers = {
      '1':'(',
      '2':')',
      '3':'<',
      '4':'>',
      '5':'{',
      '6':'}',
      '7':'[',
      '8':']',
      '9':'=',
      '10':'_',
      '11':'-',
      '12':'.',
      '13':'/',
      '14':'$',
      '15':'@',
      '16':';',
      '17':':',
      '18':'"',
      '19':'%',
      '20':'^',
      '21':'&',
      '22':'|',
      '23':',',
      '24':'*'
    };
    var random = Math.floor(Math.random()*24 + 1);
    return fillers[random.toString()];
  }

// text style opts
let char_w = ctx.measureText('@');
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

function render_pass(){
    let h_str = 140;
    let w_str = 100;
    for (let i = 0; i < chars_count; i++) {

        if(i%6 == 0 && i >= 6){
            h_str += 26;
            w_str = 100;
        }
        ctx.fillText(randomChar(), w_str, h_str);
        
        w_str+=16;
        
    }
    h_str = 140;
    w_str = 380;
    for (let i = 0; i < chars_count; i++) {

        if(i%6 == 0 && i >= 6){
            h_str += 26;
            w_str = 380;
        }
        ctx.fillText(randomChar(), w_str, h_str);
        
        w_str+=16;
        
    }
}

function main_render(){
   
    render_text_terminal();
    render_pass();
    
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    requestAnimationFrame(draw);
}
