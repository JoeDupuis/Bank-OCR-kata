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
	FIXTURE_DIGIT_1_SUPERFLUOUS,
	FIXTURE_DIGIT_5_MISSING,
	FIXTURE_BROKEN_DIGIT
} from './fixtures/digits'
import {DigitScan} from '../lib/digit_scan'


describe('DigitScan', ()=>{
	describe('ResolvePossibleDigits should return all digits that are 1 segment away from the given segments', ()=>{
		test('Missing one segment', ()=>{
			const digitToResolve = FIXTURE_DIGIT_5_MISSING
			const subject = new DigitScan(digitToResolve)

			const digits = subject.resolvePossibleDigits()

			expect(digits).toStrictEqual([5])
		})

		test('One Superfluous segment', ()=>{
			const digitToResolve = FIXTURE_DIGIT_1_SUPERFLUOUS
			const subject = new DigitScan(digitToResolve)

			const digits = subject.resolvePossibleDigits()

			expect(digits).toStrictEqual([1])
		})

	})

	describe('ResolveDigit', ()=>{
		test('Resolving broken digit should return NaN', ()=>{
			const digitToResolve = FIXTURE_BROKEN_DIGIT
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(Number.isNaN(digit)).toBe(true)
		})

		test('Resolve 0', ()=>{
			const digitToResolve = FIXTURE_DIGIT_0
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(digit).toBe(0)
		})

		test('Resolve 1', ()=>{
			const digitToResolve = FIXTURE_DIGIT_1
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(digit).toBe(1)
		})

		test('Resolve 2', ()=>{
			const digitToResolve = FIXTURE_DIGIT_2
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(digit).toBe(2)
		})

		test('Resolve 3', ()=>{
			const digitToResolve = FIXTURE_DIGIT_3
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(digit).toBe(3)
		})

		test('Resolve 4', ()=>{
			const digitToResolve = FIXTURE_DIGIT_4
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(digit).toBe(4)
		})

		test('Resolve 5', ()=>{
			const digitToResolve = FIXTURE_DIGIT_5
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(digit).toBe(5)
		})

		test('Resolve 6', ()=>{
			const digitToResolve = FIXTURE_DIGIT_6
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(digit).toBe(6)
		})

		test('Resolve 7', ()=>{
			const digitToResolve = FIXTURE_DIGIT_7
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(digit).toBe(7)
		})

		test('Resolve 8', ()=>{
			const digitToResolve = FIXTURE_DIGIT_8
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

			expect(digit).toBe(8)
		})

		test('Resolve 9', ()=>{
			const digitToResolve = FIXTURE_DIGIT_9
			const subject = new DigitScan(digitToResolve)

			const digit = subject.resolveDigit()

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


			expect(new DigitScan(validInput1).parseToSegments()).toStrictEqual(0b000000000)
			expect(new DigitScan(validInput2).parseToSegments()).toStrictEqual(0b000100000)
			expect(new DigitScan(validInput3).parseToSegments()).toStrictEqual(0b010010000)
			expect(new DigitScan(validInput4).parseToSegments()).toStrictEqual(0b010000010)
		})
	})

	describe('SegmentDiffCount returns the difference count between two segments', ()=>{
		test('With 2 difference (3 vs 8)', ()=> {
			const otherSegments = new DigitScan(FIXTURE_DIGIT_8).parseToSegments()
			const subject = new DigitScan(FIXTURE_DIGIT_3)

			const result = subject.segmentDiffCount(otherSegments)

			expect(result).toBe(2)
		})

		test('With 1 difference (1 vs 7)', ()=> {
			const otherSegments = new DigitScan(FIXTURE_DIGIT_7).parseToSegments()
			const subject = new DigitScan(FIXTURE_DIGIT_1)

			const result = subject.segmentDiffCount(otherSegments)

			expect(result).toBe(1)
		})

	})

	describe('validateDigitString', ()=>{
		test('Should return true for all possible digit', ()=>{
			expect(new DigitScan(FIXTURE_DIGIT_0).validateDigitString()).toBe(true)
			expect(new DigitScan(FIXTURE_DIGIT_1).validateDigitString()).toBe(true)
			expect(new DigitScan(FIXTURE_DIGIT_2).validateDigitString()).toBe(true)
			expect(new DigitScan(FIXTURE_DIGIT_3).validateDigitString()).toBe(true)
			expect(new DigitScan(FIXTURE_DIGIT_4).validateDigitString()).toBe(true)
			expect(new DigitScan(FIXTURE_DIGIT_5).validateDigitString()).toBe(true)
			expect(new DigitScan(FIXTURE_DIGIT_6).validateDigitString()).toBe(true)
			expect(new DigitScan(FIXTURE_DIGIT_7).validateDigitString()).toBe(true)
			expect(new DigitScan(FIXTURE_DIGIT_8).validateDigitString()).toBe(true)
			expect(new DigitScan(FIXTURE_DIGIT_9).validateDigitString()).toBe(true)
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


			expect(()=>{new DigitScan(invalidInput1).validateDigitString()}).toThrow()
			expect(()=>{new DigitScan(invalidInput2).validateDigitString()}).toThrow()
			expect(()=>{new DigitScan(invalidInput3).validateDigitString()}).toThrow()
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

			expect(new DigitScan(validInput1).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput2).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput3).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput4).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput5).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput6).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput7).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput8).validateDigitString()).toBe(true)
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


			expect(()=>{new DigitScan(invalidInput1).validateDigitString()}).toThrow()
			expect(()=>{new DigitScan(invalidInput2).validateDigitString()}).toThrow()
			expect(()=>{new DigitScan(invalidInput3).validateDigitString()}).toThrow()
			expect(()=>{new DigitScan(invalidInput4).validateDigitString()}).toThrow()
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


			expect(new DigitScan(validInput1).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput2).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput3).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput4).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput5).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput6).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput7).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput8).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput9).validateDigitString()).toBe(true)
			expect(new DigitScan(validInput10).validateDigitString()).toBe(true)
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


			expect(()=>{new DigitScan(invalidInput1).validateDigitString()}).toThrow()
			expect(()=>{new DigitScan(invalidInput2).validateDigitString()}).toThrow()
		})
	})
})
