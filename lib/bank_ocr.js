import Yargs from 'yargs'
import {AccountFileReader} from './account_file_reader'
export default class BankOCR {
	constructor(accountFileReader = new AccountFileReader()){
		this.accountFileReader = accountFileReader
	}

	run(){
		Yargs.command(['parse [filename]'],
					  'Parse an account number file and print the results',
					  yargs => {
						  yargs.positional('filename', {
							  describe: 'Path of the ocr file',
							  type: 'string'})
					  },
					  this.parseAccountFile.bind(this))
			.command(['validate [accountNumber]'],
					 'Verify the validity of the given account number',
					 yargs => {
						 yargs.positional('accountNumber', {
							 describe: 'Account number to validate',
							 type: 'string'})
					 },
					 this.validateAccountNumber.bind(this))
			.version(false)
			.argv
	}

	validateAccountNumber(argv) {
		let accountNumber = argv.accountNumber
		if(typeof accountNumber !== 'string') throw new TypeError('validateAccountNumber expect a string')
		let valid = this.accountFileReader.validateAccountNumber(accountNumber)
		console.log(valid ? 'valid' : 'invalid')
	}

	parseAccountFile(argv) {
		this.accountFileReader.parseScannedFile(argv.filename)
	}
}
