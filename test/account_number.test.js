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

			expect(result).toBe('00000000?	ILL')
		})
	})
})
