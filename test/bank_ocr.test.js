import BankOCR from '../lib/bank_ocr'
import {AccountFileReader} from '../lib/account_file_reader'

describe('BankOCR', ()=>{
	let subject = new BankOCR()
	// TODO find out a better way to test the yargs setup
	// Those test make sure the CLI interface will call to the right objects

	test('Run should not crash', ()=> {
		subject.run()
	})

	describe('Parse', ()=>{
		test('Should ask the AccountFileReader to parse a given filename', ()=> {
			let fakeAccountFileReader = new AccountFileReader()
			spyOn(fakeAccountFileReader, 'parseScannedFile')
			let subject = new BankOCR(fakeAccountFileReader)
			let accountFile = './test/fixtures/dummy_accounts_file.txt'

			subject.parseAccountFile({filename: accountFile})

			expect(fakeAccountFileReader.parseScannedFile).toHaveBeenCalledWith(accountFile)
		})

	})

	describe('Validate', ()=>{
		let originalLog = console.log
		beforeEach(() => {
			console.log = jasmine.createSpy('log')
		})

		afterEach(() => {
			console.log = originalLog
		})

		test('Should print invalid if the given account number is invalid', ()=> {
			let subject = new BankOCR()
			let invalidAccountNumber = '664371495'

			subject.validateAccountNumber({accountNumber: invalidAccountNumber})

			expect(console.log).toHaveBeenCalledWith('invalid')
		})

		test('Should print valid if the given account number is valid', ()=> {
			let subject = new BankOCR()
			let invalidAccountNumber = '457508000'

			subject.validateAccountNumber({accountNumber: invalidAccountNumber})

			expect(console.log).toHaveBeenCalledWith('valid')
		})

		//Since account number can start with zeros we cannot let yargs convert to number
		//or the prefixing zeros will be trimmed
		test('Should throw when a non string number is passed', ()=>{
			let accountNumber = 100000051

			expect(()=>{subject.validateAccountNumber({accountNumber: accountNumber})}).toThrow()
		})
	})
})
