import '@testing-library/jest-dom';
import { isEven, countVowels, countConsonants} from './utils/utils'

describe('Executing utils function', () => {

  describe('isEven function', ()=>{
    
    test( 'Given a number, return if this number is even ', ()=>{
      let even = isEven(3);
      expect(even).toBe(false)
    });
    test( 'Given a number, return if this number is odd ', ()=>{
      let odd = isEven(2);
      expect(odd).toBe(true)
    });
    test( 'Given a number, return if this number is typeof boolean ', ()=>{
      let even = isEven(1);
      expect(typeof even).toBe('boolean')
    });
    
  });

  describe('countVowels function', ()=>{
    
    test( 'Given a string, count the number of vowels', ()=>{
      let result = countVowels('abc');
      expect(result).toBe(1)
    });
    test( 'Given a string, count the number of consonants', ()=>{
      let result = countConsonants('abc');
      expect(result).toBe(2)
    });
    
  });


    
});
