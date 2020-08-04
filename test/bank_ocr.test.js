import BankOCR from '../lib/bank_ocr'
import {AccountFileReader} from '../lib/account_file_reader'

describe('BankOCR', ()=>{
	const subject = new BankOCR()
	// TODO find out a better way to test the yargs setup
	// Those test make sure the CLI interface will call to the right objects

	test('Run should not crash', ()=> {
		subject.run()
	})

	describe('Parse', ()=>{
		test('Should ask the AccountFileReader to parse a given filename', ()=> {
			const fakeAccountFileReader = new AccountFileReader()
			spyOn(fakeAccountFileReader, 'parseScannedFile')
			const subject = new BankOCR(fakeAccountFileReader)
			const accountFile = './test/fixtures/dummy_accounts_file.txt'

			subject.parseAccountFile({inputFilename: accountFile})

			expect(fakeAccountFileReader.parseScannedFile).toHaveBeenCalled()
			//Make sure the first argument was the account file name
			expect(fakeAccountFileReader.parseScannedFile.calls.argsFor(0)[0]).toEqual(accountFile)
		})

	})

	describe('Validate', ()=>{
		const originalLog = console.log
		beforeEach(() => {
			console.log = jasmine.createSpy('log')
		})

		afterEach(() => {
			console.log = originalLog
		})

		test('Should print invalid if the given account number is invalid', ()=> {
			const subject = new BankOCR()
			const invalidAccountNumber = '664371495'

			subject.validateAccountNumber({accountNumber: invalidAccountNumber})

			expect(console.log).toHaveBeenCalledWith('invalid')
		})

		test('Should print valid if the given account number is valid', ()=> {
			const subject = new BankOCR()
			const invalidAccountNumber = '457508000'

			subject.validateAccountNumber({accountNumber: invalidAccountNumber})

			expect(console.log).toHaveBeenCalledWith('valid')
		})
	})
})
