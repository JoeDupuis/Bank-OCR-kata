import {AccountNumber} from '../lib/account_number'
import {Digit} from '../lib/digit'

describe('AccountNumber', ()=>{
	describe('ToString', ()=>{
		test('Should return just the account number if valid', ()=>{
			const subject = AccountNumber.fromString('000000051')
			expect(subject.valid).toBe(true)

			const result = subject.toString()

			expect(result).toBe('000000051')
		})

		test('Should return the account number and ERR status if invalid', ()=>{
			const subject = AccountNumber.fromString('000000001')
			expect(subject.valid).toBe(false)

			const result = subject.toString()

			expect(result).toBe('000000001	ERR')
		})

		test('Should return the account number and ILL number could not be read', ()=>{
			const subject = AccountNumber.fromString('00000000?')

			const result = subject.toString()


			expect(result).toBe('00000000?	ILL')
		})

		test('Should return the account number with status AMB and an array of other possible account if number is invalid with multiple alternatives', ()=>{
			const invalidAccountNumber = '100000051'
			const altAccount1 = AccountNumber.fromString('000000000')
			const altAccount2 = AccountNumber.fromString('123456789')
			const subject = AccountNumber.fromString(invalidAccountNumber, [altAccount1, altAccount2])

			const result = subject.toString()

			expect(result).toBe("100000051	AMB	['000000000', '123456789']")
		})

		test('Should return the account number without status if valid, ignoring alternatives ', ()=>{
			const validAccountNumber = '000000051'
			const altAccount1 = AccountNumber.fromString('000000000')
			const altAccount2 = AccountNumber.fromString('123456789')
			const subject = AccountNumber.fromString(validAccountNumber, [altAccount1, altAccount2])

			const result = subject.toString()

			expect(result).toBe('000000051')
		})

		test('Should return the valid alternative if invalid and only one alternative exist.', ()=>{
			const ambiguousAccountNumbers = [AccountNumber.fromString('000000000')]
			const subject = AccountNumber.fromString('100000051', ambiguousAccountNumbers)

			const result = subject.toString()

			expect(result).toBe('000000000')
		})
	})

	describe('Readable', ()=>{
		test('Should return true if all the digit are integers', ()=>{
			const subject = AccountNumber.fromString('123456789')

			const result = subject.readable

			expect(result).toBe(true)
		})

		test('Should return false if any digit is not an integer', ()=>{
			const subject = AccountNumber.fromString('12345678A')

			const result = subject.readable

			expect(result).toBe(false)
		})
	})


	describe('valid', ()=>{
		test('Should return true if the number pass the checksum', ()=>{
			const validAccount = '000000051'
			const subject = AccountNumber.fromString(validAccount)

			const result = subject.valid

			expect(result).toBe(true)
		})

		test('Should return false if the number pass the checksum', ()=>{
			const invalidAccount = '100000051'
			const subject = AccountNumber.fromString(invalidAccount)

			const result = subject.valid

			expect(result).toBe(false)
		})

		test('Should return false if the number is unreadable', ()=>{
			const unreadableAccountNumber = '12345678A'
			const subject = AccountNumber.fromString(unreadableAccountNumber)

			const result = subject.valid

			expect(result).toBe(false)
		})
	})

	describe('StatusString', ()=>{
		test('Should return an empty string if account is valid', ()=>{
			const validAccount = '000000051'
			const subject = AccountNumber.fromString(validAccount)

			const result = subject.statusString

			expect(result).toBe('')
		})

		test('Should return ERR if account is invalid', ()=>{
			const invalidAccount = '100000051'
			const subject = AccountNumber.fromString(invalidAccount)

			const result = subject.statusString

			expect(result).toBe('ERR')
		})

		test('Should return ILL if the account number is unreadable', ()=>{
			const unreadableAccountNumber = '12345678A'
			const subject = AccountNumber.fromString(unreadableAccountNumber)

			const result = subject.statusString

			expect(result).toBe('ILL')
		})
	})

	describe('Digits', ()=>{
		test('Should return an array of integer version of the account number', ()=>{
			const meaninglessAccountNumber = '321456987'
			const subject = AccountNumber.fromString(meaninglessAccountNumber)

			const result = subject.digits()

			expect(result[0]).toBe(3)
			expect(result[1]).toBe(2)
			expect(result[2]).toBe(1)
			expect(result[3]).toBe(4)
			expect(result[4]).toBe(5)
			expect(result[5]).toBe(6)
			expect(result[6]).toBe(9)
			expect(result[7]).toBe(8)
			expect(result[8]).toBe(7)
		})
	})

	describe('Digit', ()=>{
		test('Should return the digit at the given index', ()=>{
			const meaninglessAccountNumber = '321456987'
			const subject = AccountNumber.fromString(meaninglessAccountNumber)

			const digit0 = subject.digit(0)
			const digit1 = subject.digit(1)
			const digit2 = subject.digit(2)
			const digit3 = subject.digit(3)
			const digit4 = subject.digit(4)
			const digit5 = subject.digit(5)
			const digit6 = subject.digit(6)
			const digit7 = subject.digit(7)
			const digit8 = subject.digit(8)

			expect(digit0).toBe(3)
			expect(digit1).toBe(2)
			expect(digit2).toBe(1)
			expect(digit3).toBe(4)
			expect(digit4).toBe(5)
			expect(digit5).toBe(6)
			expect(digit6).toBe(9)
			expect(digit7).toBe(8)
			expect(digit8).toBe(7)
		})
	})

	describe('FindAmbiguousAccountNumbers', ()=>{
		test('Returns list of other possible account number when changing only one segment', ()=>{
			const subject = new AccountNumber([new Digit(8, [0,6,9]),
											   new Digit(8, [0,6,9]),
											   new Digit(8, [0,6,9]),
											   new Digit(8, [0,6,9]),
											   new Digit(8, [0,6,9]),
											   new Digit(8, [0,6,9]),
											   new Digit(8, [0,6,9]),
											   new Digit(8, [0,6,9]),
											   new Digit(8, [0,6,9])])

			const result = subject.findAmbiguousAccountNumbers()
				  .map(accountNumber => accountNumber.toString())

			expect(result).toStrictEqual(['888886888', '888888880', '888888988'])
		})
	})
})
