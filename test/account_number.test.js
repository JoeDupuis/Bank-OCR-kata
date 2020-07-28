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

	describe('Redable', ()=>{
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
})
