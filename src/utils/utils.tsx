export const isEven = (number:number): boolean=>{
    return number % 2 === 0 ? true: false;
}

export const countVowels = (string:string):number =>{
    const match = string.toLowerCase().replaceAll(' ', '').match(/[aeiou]/gi);
    return match!== null?match.length: 0 ;
}

export const countConsonants = (string:string):number =>{
    const match = string.toLowerCase().replaceAll(' ', '').match(/[^aeiou]/gi);
    return match !== null?match.length: 0 ;
}


