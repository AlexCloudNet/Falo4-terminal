export function randomChar() {
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
    let random = Math.floor(Math.random()*24 + 1);
    return fillers[random.toString()];
  }

export function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomIntervalException(min, max, exclude = []){
  let num = Math.floor(Math.random() * (max - min + 1 - exclude.length) + min);
  exclude
    .slice()
    .sort((a, b) => a - b)
    .every((exeption) => exeption <= num && (num++, true));
  return num;
};

/*
    while(start_words.length < 5){
        let start_pos = randomIntFromInterval(1, chars_count*2 - screen.words_length)
        let start_pos_char_arr = [];
        let found = false;

        for (let i = 0; i < start_words.length; i++) {
            for (let j = 0; j < screen.words_length; j++) {
                if(start_words[i] === start_pos){
                    found = true;
                    break;
                }
            }
        }
        
        if(!found){
            let arr = [];
            for (let j = 0; j < screen.words_length; j++) {
                arr.push(start_pos+j); 
            }
            start_words.push(arr);
            
        }
    }
*/