export class AccountFileReader {
	splitAccountScanToDigitString(accountScan) {
		let lines = accountScan.split('\n')
			.map((line) => line.match(/.{1,3}/g)) // Sub split lines every 3 characters
		let digitParts1 = lines[0]
		let digitParts2 = lines[1]
		let digitParts3 = lines[2]
		let digits = digitParts1.map((_, i) => [digitParts1[i], digitParts2[i], digitParts3[i]].join(''))
		return digits
	}
}
