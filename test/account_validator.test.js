import {AccountValidator} from '../lib/account_validator'
describe('AccountValidator', ()=>{
	const subject = new AccountValidator()
	describe('validate', ()=>{
		test('Should return true if the number pass the checksum', ()=>{
			const validAccount = [0,0,0,0,0,0,0,5,1] // 000000051

			const result = subject.validate(validAccount)

			expect(result).toBe(true)
		})

		test('Should return false if the number pass the checksum', ()=>{
			const invalidAccount = [1,0,0,0,0,0,0,5,1] // 100000051

			const result = subject.validate(invalidAccount)

			expect(result).toBe(false)
		})

		test('Should return false if the number is unreadable', ()=>{
			const unreadableAccountNumber = [1,2,3,4,5,6,7,8,'A'] //12345678A

			const result = subject.validate(unreadableAccountNumber)

			expect(result).toBe(false)
		})
	})
})
