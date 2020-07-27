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
	describe('SplitAccountScanToDigitString should split account number in sepaparate digit string', ()=>{
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

	describe('ResolveDigit should resolve scanned digit to an integer', ()=>{
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

	describe('ResolveDigits should resolve scanned account number to an array of digit', ()=>{
		test('Resolve 123456789', ()=>{
			let accountScanToResolve = FIXTURE_ACCOUNT_123456789

			let digits = subject.resolveDigits(accountScanToResolve)

			expect(digits).toStrictEqual([1,2,3,4,5,6,7,8,9])
		})

		test('Resolve 000000000', ()=>{
			let accountScanToResolve = FIXTURE_ACCOUNT_000000000

			let digits = subject.resolveDigits(accountScanToResolve)

			expect(digits).toStrictEqual([0,0,0,0,0,0,0,0,0])
		})

	})

	describe('ParseScannedFile should parse the account number from a scanned file', ()=>{
		let originalLog = console.log
		beforeEach(() => {
			console.log = jasmine.createSpy('log')
		})

		afterEach(() => {
			console.log = originalLog
		})

		test('Parse account number file file and print account number to console', ()=>{
			let accountFile = './test/fixtures/dummy_accounts_file.txt'

			subject.parseScannedFile(accountFile)

			expect(console.log.calls.argsFor(0)[0]).toEqual( '000000000')
			expect(console.log.calls.argsFor(1)[0]).toEqual( '111111111')
			expect(console.log.calls.argsFor(2)[0]).toEqual( '222222222')
			expect(console.log.calls.argsFor(3)[0]).toEqual( '333333333')
			expect(console.log.calls.argsFor(4)[0]).toEqual( '444444444')
			expect(console.log.calls.argsFor(5)[0]).toEqual( '555555555')
			expect(console.log.calls.argsFor(6)[0]).toEqual( '666666666')
			expect(console.log.calls.argsFor(7)[0]).toEqual( '777777777')
			expect(console.log.calls.argsFor(8)[0]).toEqual( '888888888')
			expect(console.log.calls.argsFor(9)[0]).toEqual( '999999999')
			expect(console.log.calls.argsFor(10)[0]).toEqual('123456789')
		})

	})

	describe('validateAccountNumberArray returns the validity of an account number array', ()=>{
		test('Should return false if the account number is not valid', ()=>{
			let invalidAccountNumber = [6,6,4,3,7,1,4,9,5] //664371495

			let valid = subject.validateAccountNumberArray(invalidAccountNumber)

			expect(valid).toBe(false)
		})

		test('Should return true if the account number is valid', ()=>{
			let validAccountNumber = [4,5,7,5,0,8,0,0,0] //457508000

			let valid = subject.validateAccountNumber(validAccountNumber)

			expect(valid).toBe(true)
		})
	})
})
