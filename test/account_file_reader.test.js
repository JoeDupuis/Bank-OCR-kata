import {
	FIXTURE_ACCOUNT_000000000,
	FIXTURE_ACCOUNT_123456789,
	FIXTURE_ACCOUNT_49006771X
} from './fixtures/dummy_account_numbers'

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
} from './fixtures/digits'

import {AccountFileReader} from '../lib/account_file_reader'

describe('AccountFileReader', ()=>{
	const subject = new AccountFileReader()
	describe('SplitAccountScanToDigitString should split account number in sepaparate digit string', ()=>{
		test('Split account 123456789', ()=>{
			const accountScanToSplit = FIXTURE_ACCOUNT_123456789

			const digits = subject.splitAccountScanToDigitStrings(accountScanToSplit)

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
			const accountScanToSplit = FIXTURE_ACCOUNT_000000000

			const digits = subject.splitAccountScanToDigitStrings(accountScanToSplit)

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

	describe('ResolveDigits should resolve scanned account number to an array of digit', ()=>{
		test('Resolve 123456789', ()=>{
			const accountScanToResolve = FIXTURE_ACCOUNT_123456789

			const digits = subject.resolveDigits(accountScanToResolve).map(digit => digit.digit)

			expect(digits).toStrictEqual([1,2,3,4,5,6,7,8,9])
		})

		test('Resolve 000000000', ()=>{
			const accountScanToResolve = FIXTURE_ACCOUNT_000000000

			const digits = subject.resolveDigits(accountScanToResolve).map(digit => digit.digit)

			expect(digits).toStrictEqual([0,0,0,0,0,0,0,0,0])
		})

		test('Resolve 49006771?', ()=>{
			const accountScanToResolve = FIXTURE_ACCOUNT_49006771X

			const digits = subject.resolveDigits(accountScanToResolve).map(digit => digit.digit)

			expect(digits).toStrictEqual([4,9,0,0,6,7,7,1,NaN])
		})

	})

	describe('ParseScannedFile should parse the account number from a scanned file and pass them to the given callback', ()=>{
		test('Print the account number validity status next to the account number', ()=>{
			const accountFile = './test/fixtures/dummy_accounts_file.txt'
			const fakeCallback = jasmine.createSpy('fakeCallback')

			subject.parseScannedFile(accountFile, fakeCallback)

			expect(fakeCallback).toHaveBeenCalledTimes(7)
			expect(fakeCallback.calls.argsFor(0)[0]).toBe( '711111111') //valid
			expect(fakeCallback.calls.argsFor(1)[0]).toBe( '777777177') //valid
			expect(fakeCallback.calls.argsFor(2)[0]).toBe( '711111111') //valid with one substitution
			expect(fakeCallback.calls.argsFor(3)[0]).toBe( '222222222	ERR') //invalid
			expect(fakeCallback.calls.argsFor(4)[0]).toBe( "100000051	AMB	['100000061', '100000851']") //Ambiguous
			expect(fakeCallback.calls.argsFor(5)[0]).toBe( '49006771?	ILL') //unreadable
			expect(fakeCallback.calls.argsFor(6)[0]).toBe( '1234?678?	ILL') //unreadable
		})
	})
})
