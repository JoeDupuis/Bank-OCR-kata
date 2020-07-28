import {AccountNumber} from '../lib/account_number'
describe('AccountNumber', ()=>{
	describe('ToString', ()=>{
		test('Should return just the account number if valid', ()=>{
			let subject = AccountNumber.fromString('000000051')
			expect(subject.valid).toBe(true)

			let result = subject.toString()

			expect(result).toBe('000000051')
		})

		test('Should return the account number and ERR status if invalid', ()=>{
			let subject = AccountNumber.fromString('000000001')
			expect(subject.valid).toBe(false)

			let result = subject.toString()

			expect(result).toBe('000000001	ERR')
		})

		test('Should return the account number and ILL number could not be read', ()=>{
			let subject = AccountNumber.fromString('00000000?')

			let result = subject.toString()


			expect(result).toBe('00000000?	ILL')		})
	})

	describe('Readable', ()=>{
		test('Should return true if all the digit are integers', ()=>{
			let subject = AccountNumber.fromString('123456789')

			let result = subject.readable

			expect(result).toBe(true)
		})

		test('Should return false if any digit is not an integer', ()=>{
			let subject = AccountNumber.fromString('12345678A')

			let result = subject.readable

			expect(result).toBe(false)
		})
	})


	describe('valid', ()=>{
		test('Should return true if the number pass the checksum', ()=>{
			let validAccount = '000000051'
			let subject = AccountNumber.fromString(validAccount)

			let result = subject.valid

			expect(result).toBe(true)
		})

		test('Should return false if the number pass the checksum', ()=>{
			let invalidAccount = '100000051'
			let subject = AccountNumber.fromString(invalidAccount)

			let result = subject.valid

			expect(result).toBe(false)
		})

		test('Should return false if the number is unreadable', ()=>{
			let unreadableAccountNumber = '12345678A'
			let subject = AccountNumber.fromString(unreadableAccountNumber)

			let result = subject.valid

			expect(result).toBe(false)
		})
	})

	describe('StatusString', ()=>{
		test('Should return an empty string if account is valid', ()=>{
			let validAccount = '000000051'
			let subject = AccountNumber.fromString(validAccount)

			let result = subject.statusString

			expect(result).toBe('')
		})

		test('Should return ERR if account is invalid', ()=>{
			let invalidAccount = '100000051'
			let subject = AccountNumber.fromString(invalidAccount)

			let result = subject.statusString

			expect(result).toBe('ERR')
		})

		test('Should return ILL if the account number is unreadable', ()=>{
			let unreadableAccountNumber = '12345678A'
			let subject = AccountNumber.fromString(unreadableAccountNumber)

			let result = subject.statusString

			expect(result).toBe('ILL')
		})
	})

	describe('Digit', ()=>{
		test('Should return the digit at the given index', ()=>{
			let meaninglessAccountNumber = '321456987'
			let subject = AccountNumber.fromString(meaninglessAccountNumber)

			let digit0 = subject.digit(0)
			let digit1 = subject.digit(1)
			let digit2 = subject.digit(2)
			let digit3 = subject.digit(3)
			let digit4 = subject.digit(4)
			let digit5 = subject.digit(5)
			let digit6 = subject.digit(6)
			let digit7 = subject.digit(7)
			let digit8 = subject.digit(8)

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
})
