import {FIXTURE_ACCOUNT_000000000, FIXTURE_ACCOUNT_123456789} from './fixtures/dummy_account_numbers'
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
	FIXTURE_DIGIT_9
} from './fixtures/digits'

import {AccountFileReader} from '../lib/account_file_reader'

describe('AccountFileReader', ()=>{
	let subject = new AccountFileReader()
	describe('Should split account number in sepaparate digit string', ()=>{
		test('Split account 123456789', ()=>{
			let accountScanToSplit = FIXTURE_ACCOUNT_123456789

			let digits = subject.splitAccountScanToDigitString(accountScanToSplit)

			expect(digits[0]).toBe(FIXTURE_DIGIT_1)
			expect(digits[1]).toBe(FIXTURE_DIGIT_2)
			expect(digits[2]).toBe(FIXTURE_DIGIT_3)
			expect(digits[3]).toBe(FIXTURE_DIGIT_4)
			expect(digits[4]).toBe(FIXTURE_DIGIT_5)
			expect(digits[5]).toBe(FIXTURE_DIGIT_6)
			expect(digits[6]).toBe(FIXTURE_DIGIT_7)
			expect(digits[7]).toBe(FIXTURE_DIGIT_8)
			expect(digits[8]).toBe(FIXTURE_DIGIT_9)
		})

		test('Split account 000000000', ()=>{
			let accountScanToSplit = FIXTURE_ACCOUNT_000000000

			let digits = subject.splitAccountScanToDigitString(accountScanToSplit)

			expect(digits[0]).toBe(FIXTURE_DIGIT_0)
			expect(digits[1]).toBe(FIXTURE_DIGIT_0)
			expect(digits[2]).toBe(FIXTURE_DIGIT_0)
			expect(digits[3]).toBe(FIXTURE_DIGIT_0)
			expect(digits[4]).toBe(FIXTURE_DIGIT_0)
			expect(digits[5]).toBe(FIXTURE_DIGIT_0)
			expect(digits[6]).toBe(FIXTURE_DIGIT_0)
			expect(digits[7]).toBe(FIXTURE_DIGIT_0)
			expect(digits[8]).toBe(FIXTURE_DIGIT_0)
		})
	})

	describe('Should resolve scanned digit to a number', ()=>{
		test('Resolve 0', ()=>{
			let digitToResolve = FIXTURE_DIGIT_0

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(0)
		})

		test('Resolve 1', ()=>{
			let digitToResolve = FIXTURE_DIGIT_1

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(1)
		})

		test('Resolve 2', ()=>{
			let digitToResolve = FIXTURE_DIGIT_2

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(2)
		})

		test('Resolve 3', ()=>{
			let digitToResolve = FIXTURE_DIGIT_3

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(3)
		})


		test('Resolve 4', ()=>{
			let digitToResolve = FIXTURE_DIGIT_4

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(4)
		})


		test('Resolve 5', ()=>{
			let digitToResolve = FIXTURE_DIGIT_5

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(5)
		})


		test('Resolve 6', ()=>{
			let digitToResolve = FIXTURE_DIGIT_6

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(6)
		})


		test('Resolve 7', ()=>{
			let digitToResolve = FIXTURE_DIGIT_7

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(7)
		})


		test('Resolve 8', ()=>{
			let digitToResolve = FIXTURE_DIGIT_8

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(8)
		})


		test('Resolve 9', ()=>{
			let digitToResolve = FIXTURE_DIGIT_9

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe(9)
		})

	})
})
