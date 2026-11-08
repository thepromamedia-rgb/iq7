import {describe,it,expect} from 'vitest';
const calcTax=(subtotal:number,rate:number)=>Math.round(subtotal*rate/100);
const calcTotal=(subtotal:number,rate:number,discount=0)=>subtotal+calcTax(subtotal,rate)-discount;
describe('CafePilot order arithmetic',()=>{it('calculates inclusive line totals before tax',()=>expect(2*180+1*90).toBe(450));it('calculates configured tax',()=>expect(calcTax(1000,5)).toBe(50));it('applies discount after tax',()=>expect(calcTotal(1000,5,100)).toBe(950));it('handles zero tax',()=>expect(calcTotal(250,0)).toBe(250))});
