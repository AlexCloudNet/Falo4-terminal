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