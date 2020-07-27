import BankOCR from '../lib/bank_ocr'
import {AccountFileReader} from '../lib/account_file_reader'

describe('BankOCR', ()=>{
	let subject = new BankOCR()
	// TODO find out a better way to test the yargs setup
	// Those test make sure the CLI interface will call to the right objects

	test('Run should not crash', ()=> {
		subject.run()
	})

	test('Parse should ask the AccountFileReader to parse a given filename', ()=> {
		let fakeAccountFileReader = new AccountFileReader()
		spyOn(fakeAccountFileReader, 'parseScannedFile')
		let subject = new BankOCR(fakeAccountFileReader)
		let accountFile = './test/fixtures/dummy_accounts_file.txt'

		subject.parseAccountFile({filename: accountFile})

		expect(fakeAccountFileReader.parseScannedFile).toHaveBeenCalledWith(accountFile)
	})
})
