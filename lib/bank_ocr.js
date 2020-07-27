import Yargs from 'yargs'
import {AccountFileReader} from './account_file_reader'
export default class BankOCR {
	constructor(accountFileReader = new AccountFileReader()){
		this.accountFileReader = accountFileReader
	}

	run(){
		Yargs.command(['parse [filename]'], 'Parse an account number file and print the results', yargs => {
			yargs
				.positional('filename', {
					describe: 'Path of the ocr file',
					type: 'string'
				})
		}, this.parseAccountFile.bind(this))
			.version(false)
			.argv
	}

	parseAccountFile(argv) {
		this.accountFileReader.parseScannedFile(argv.filename)
	}
}
