import {Digit} from '../lib/digit'

describe('Digit', ()=>{
	describe('Constructor', ()=>{
		test('Should resolve to the next possibile digit when there is only one and digit failed to resolve', ()=>{
			const subject = new Digit(NaN, [5])

			const digit = subject.digit

			expect(digit).toBe(5)
		})

		test('Should not resolve missing digit if more than one other possibility', ()=>{
			const subject = new Digit(NaN, [5,1])

			const digit = subject.digit

			expect(Number.isNaN(digit)).toBe(true)
		})
	})

	describe('Readable', ()=>{
		test('Return true if the digit is a number', ()=>{
			const meaninglessNumber = 12
			const subject = new Digit(meaninglessNumber)

			const result = subject.readable

			expect(result).toBe(true)
		})

		test('Return false if the digit is not a number', ()=>{
			const notANumber = 'meaningless string'
			const subject = new Digit(notANumber)

			const result = subject.readable

			expect(result).toBe(false)
		})
	})
})
