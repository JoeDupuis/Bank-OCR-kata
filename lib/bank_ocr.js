import Yargs from 'yargs'
import {AccountFileReader} from './account_file_reader'
import {FileAppender} from '../lib/file_appender'

export default class BankOCR {
	constructor(accountFileReader = new AccountFileReader()){
		this.accountFileReader = accountFileReader
	}

	run(){
		Yargs.command(['parse [inputFilename] [outputFilename]'],
					  'Parse an account number file and print the results',
					  yargs => {
						  yargs.positional('inputFilename', {
							  describe: 'Path of the ocr file',
							  type: 'string'})

						  yargs.positional('outputFilename', {
							  describe: 'Path of the output file. Will print to terminal if omitted.',
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
		let parseCallback = console.log

		if(argv.outputFilename) {
			let fileAppender = new FileAppender(argv.outputFilename)
			parseCallback = fileAppender.append.bind(fileAppender)
		}

		this.accountFileReader.parseScannedFile(argv.inputFilename, parseCallback)
	}
}
