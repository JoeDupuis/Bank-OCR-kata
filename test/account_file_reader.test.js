import {FIXTURE_ACCOUNT_000000000, FIXTURE_ACCOUNT_123456789} from './fixtures/dummy_account_numbers'
import {FIXTURE_ACCOUNT_49006771X} from './fixtures/invalid_dummy_account_numbers'
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

import {AccountFileReader} from '../lib/account_file_reader'

describe('AccountFileReader', ()=>{
	let subject = new AccountFileReader()
	describe('SplitAccountScanToDigitString should split account number in sepaparate digit string', ()=>{
		test('Split account 123456789', ()=>{
			let accountScanToSplit = FIXTURE_ACCOUNT_123456789

			let digits = subject.splitAccountScanToDigitStrings(accountScanToSplit)

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

			let digits = subject.splitAccountScanToDigitStrings(accountScanToSplit)

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

	describe('ResolveDigit should resolve scanned digit to an integer or missing character symbol', ()=>{
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

		test('Resolve broken digit', ()=>{
			let digitToResolve = FIXTURE_BROKEN_DIGIT

			let digit = subject.resolveDigit(digitToResolve)

			expect(digit).toBe('?')
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

		test('Resolve 49006771?', ()=>{
			let accountScanToResolve = FIXTURE_ACCOUNT_49006771X

			let digits = subject.resolveDigits(accountScanToResolve)

			expect(digits).toStrictEqual([4,9,0,0,6,7,7,1,'?'])
		})

	})

	describe('ParseScannedFile should parse the account number from a scanned file and pass them to the given callback', ()=>{
		test('Parse account number file and print account number to console', ()=>{
			let accountFile = './test/fixtures/dummy_accounts_file.txt'
			let fakeCallback = jasmine.createSpy('fakeCallback')

			subject.parseScannedFile(accountFile, fakeCallback)

			expect(fakeCallback).toHaveBeenCalledTimes(11)
			expect(fakeCallback.calls.argsFor(0)[0]).toContain( '000000000')
			expect(fakeCallback.calls.argsFor(1)[0]).toContain( '111111111')
			expect(fakeCallback.calls.argsFor(2)[0]).toContain( '222222222')
			expect(fakeCallback.calls.argsFor(3)[0]).toContain( '333333333')
			expect(fakeCallback.calls.argsFor(4)[0]).toContain( '444444444')
			expect(fakeCallback.calls.argsFor(5)[0]).toContain( '555555555')
			expect(fakeCallback.calls.argsFor(6)[0]).toContain( '666666666')
			expect(fakeCallback.calls.argsFor(7)[0]).toContain( '777777777')
			expect(fakeCallback.calls.argsFor(8)[0]).toContain( '888888888')
			expect(fakeCallback.calls.argsFor(9)[0]).toContain( '999999999')
			expect(fakeCallback.calls.argsFor(10)[0]).toContain('123456789')
		})


		test('Print the account number validity status next to the account number', ()=>{
			let accountFile = './test/fixtures/validation_dummy_account_file.txt'
			let fakeCallback = jasmine.createSpy('fakeCallback')

			subject.parseScannedFile(accountFile, fakeCallback)

			expect(fakeCallback).toHaveBeenCalledTimes(5)
			expect(fakeCallback.calls.argsFor(0)[0]).toBe( '711111111') //valid
			expect(fakeCallback.calls.argsFor(1)[0]).toBe( '777777177') //valid
			expect(fakeCallback.calls.argsFor(2)[0]).toBe( '100000051	ERR') //invalid
			expect(fakeCallback.calls.argsFor(3)[0]).toBe( '49006771?	ILL') //unreadable
			expect(fakeCallback.calls.argsFor(4)[0]).toBe( '1234?678?	ILL') //unreadable
		})
	})
})
