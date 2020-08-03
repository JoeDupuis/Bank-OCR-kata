import {
	FIXTURE_DIGIT_0,
	FIXTURE_DIGIT_1,
	FIXTURE_DIGIT_2,
	FIXTURE_DIGIT_3,
	FIXTURE_DIGIT_4,
	FIXTURE_DIGIT_5,
	FIXTURE_DIGIT_6,
	FIXTURE_DIGIT_7,
	FIXTURE_DIGIT_8,
	FIXTURE_DIGIT_9,
	FIXTURE_BROKEN_DIGIT
} from './fixtures/digits'
import {Digit} from '../lib/digit'


describe('Digit', ()=>{
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
	describe('ResolveDigit should return the integer matching the scan passed to the constructor', ()=>{
		test('Resolving broken digit should return NaN', ()=>{
			let digitToResolve = FIXTURE_BROKEN_DIGIT
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(Number.isNaN(digit)).toBe(true)
		})

		test('Resolve 0', ()=>{
			let digitToResolve = FIXTURE_DIGIT_0
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(0)
		})

		test('Resolve 1', ()=>{
			let digitToResolve = FIXTURE_DIGIT_1
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(1)
		})

		test('Resolve 2', ()=>{
			let digitToResolve = FIXTURE_DIGIT_2
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(2)
		})

		test('Resolve 3', ()=>{
			let digitToResolve = FIXTURE_DIGIT_3
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(3)
		})

		test('Resolve 4', ()=>{
			let digitToResolve = FIXTURE_DIGIT_4
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(4)
		})

		test('Resolve 5', ()=>{
			let digitToResolve = FIXTURE_DIGIT_5
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(5)
		})

		test('Resolve 6', ()=>{
			let digitToResolve = FIXTURE_DIGIT_6
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(6)
		})

		test('Resolve 7', ()=>{
			let digitToResolve = FIXTURE_DIGIT_7
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(7)
		})

		test('Resolve 8', ()=>{
			let digitToResolve = FIXTURE_DIGIT_8
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(8)
		})

		test('Resolve 9', ()=>{
			let digitToResolve = FIXTURE_DIGIT_9
			let subject = Digit.fromDigitScan(digitToResolve)

			let digit = subject.resolveDigit()

			expect(digit).toBe(9)
		})
	})


	describe('parseToSegments', ()=>{
		test('Should convert input string to binary integer where spaces are 0/false and segments are 1/true', ()=>{
			const validInput1 =
				'   ' +
				'   ' +
				'   '

			const validInput2 =
				'   ' +
				'|  ' +
				'   '

			const validInput3 =
				' _ ' +
				' _ ' +
				'   '

			const validInput4 =
				' _ ' +
				'   ' +
				' _ '


			expect(Digit.parseToSegments(validInput1)).toStrictEqual(0b000000000)
			expect(Digit.parseToSegments(validInput2)).toStrictEqual(0b000100000)
			expect(Digit.parseToSegments(validInput3)).toStrictEqual(0b010010000)
			expect(Digit.parseToSegments(validInput4)).toStrictEqual(0b010000010)

		})

	})

	describe('validateDigitString', ()=>{
		test('Should return true for all possible digit', ()=>{
			expect(Digit.validateDigitString(FIXTURE_DIGIT_0)).toBe(true)
			expect(Digit.validateDigitString(FIXTURE_DIGIT_1)).toBe(true)
			expect(Digit.validateDigitString(FIXTURE_DIGIT_2)).toBe(true)
			expect(Digit.validateDigitString(FIXTURE_DIGIT_3)).toBe(true)
			expect(Digit.validateDigitString(FIXTURE_DIGIT_4)).toBe(true)
			expect(Digit.validateDigitString(FIXTURE_DIGIT_5)).toBe(true)
			expect(Digit.validateDigitString(FIXTURE_DIGIT_6)).toBe(true)
			expect(Digit.validateDigitString(FIXTURE_DIGIT_7)).toBe(true)
			expect(Digit.validateDigitString(FIXTURE_DIGIT_8)).toBe(true)
			expect(Digit.validateDigitString(FIXTURE_DIGIT_9)).toBe(true)
		})

		test('Should throw if character 2 5 and 8 are anything except underscore or spaces', ()=>{
			const invalidInput1 =
				' | ' +
				'   ' +
				'   '

			const invalidInput2 =
				'   ' +
				' ? ' +
				'   '

			const invalidInput3 =
				'   ' +
				'   ' +
				' A '


			expect(()=>{Digit.validateDigitString(invalidInput1)}).toThrow()
			expect(()=>{Digit.validateDigitString(invalidInput2)}).toThrow()
			expect(()=>{Digit.validateDigitString(invalidInput3)}).toThrow()
		})


		test('Should return true for any combination of spaces or underscore on character 2 5 and 8', ()=>{
			const validInput1 =
				' _ ' +
				'   ' +
				'   '

			const validInput2 =
				'   ' +
				' _ ' +
				'   '

			const validInput3 =
				'   ' +
				'   ' +
				' _ '


			const validInput4 =
				' _ ' +
				' _ ' +
				'   '

			const validInput5 =
				' _ ' +
				'   ' +
				' _ '

			const validInput6 =
				' _ ' +
				' _ ' +
				'   '

			const validInput7 =
				' _ ' +
				' _ ' +
				' _ '


			const validInput8 =
				'   ' +
				'   ' +
				'   '

			expect(Digit.validateDigitString(validInput1)).toBe(true)
			expect(Digit.validateDigitString(validInput2)).toBe(true)
			expect(Digit.validateDigitString(validInput3)).toBe(true)
			expect(Digit.validateDigitString(validInput4)).toBe(true)
			expect(Digit.validateDigitString(validInput5)).toBe(true)
			expect(Digit.validateDigitString(validInput6)).toBe(true)
			expect(Digit.validateDigitString(validInput7)).toBe(true)
			expect(Digit.validateDigitString(validInput8)).toBe(true)
		})


		test('Should throw if character 4 6 7 and 9 are anything except pipe symbol or spaces', ()=>{
			const invalidInput1 =
				'   ' +
				'_  ' +
				'   '

			const invalidInput2 =
				'   ' +
				'  ?' +
				'   '

			const invalidInput3 =
				'   ' +
				'   ' +
				'1  '

			const invalidInput4 =
				'   ' +
				'   ' +
				'  _'


			expect(()=>{Digit.validateDigitString(invalidInput1)}).toThrow()
			expect(()=>{Digit.validateDigitString(invalidInput2)}).toThrow()
			expect(()=>{Digit.validateDigitString(invalidInput3)}).toThrow()
			expect(()=>{Digit.validateDigitString(invalidInput4)}).toThrow()
		})

		test('Should return true for any combination of spaces or pipe symbol on character 4 6 7 and 9', ()=>{
			const validInput1 =
				'   ' +
				'   ' +
				'   '

			const validInput2 =
				'   ' +
				'|  ' +
				'   '

			const validInput3 =
				'   ' +
				'| |' +
				'   '


			const validInput4 =
				'   ' +
				'|  ' +
				'|  '

			const validInput5 =
				'   ' +
				'|  ' +
				'  |'

			const validInput6 =
				'   ' +
				'  |' +
				'   '

			const validInput7 =
				'   ' +
				'  |' +
				'|  '


			const validInput8 =
				'   ' +
				'  |' +
				'  |'

			const validInput9 =
				'   ' +
				'   ' +
				'|  '

			const validInput10 =
				'   ' +
				'   ' +
				'| |'


			expect(Digit.validateDigitString(validInput1)).toBe(true)
			expect(Digit.validateDigitString(validInput2)).toBe(true)
			expect(Digit.validateDigitString(validInput3)).toBe(true)
			expect(Digit.validateDigitString(validInput4)).toBe(true)
			expect(Digit.validateDigitString(validInput5)).toBe(true)
			expect(Digit.validateDigitString(validInput6)).toBe(true)
			expect(Digit.validateDigitString(validInput7)).toBe(true)
			expect(Digit.validateDigitString(validInput8)).toBe(true)
			expect(Digit.validateDigitString(validInput9)).toBe(true)
			expect(Digit.validateDigitString(validInput10)).toBe(true)
		})


		test('Should throw if characters 1 and 3 are not spaces', ()=>{
			const invalidInput1 =
				'_  ' +
				'   ' +
				'   '

			const invalidInput2 =
				'  |' +
				'   ' +
				'   '


			expect(()=>{Digit.validateDigitString(invalidInput1)}).toThrow()
			expect(()=>{Digit.validateDigitString(invalidInput2)}).toThrow()
		})
	})
})
