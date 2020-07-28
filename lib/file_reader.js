import LineByLine from 'n-readlines'
export class FileReader {
	constructor(filename) {
		this.eof = false
		this.file = new LineByLine(filename)
		this.eofCheckLineBuffer
	}

	readLine() {
		let line = this.getNextLine()
		if(!line) this.eof = true
		return line.toString()
	}

	getNextLine(){
		let line = this.eofCheckLineBuffer || this.file.next()
		this.eofCheckLineBuffer = null
		return line
	}

	reachedEOF(){
		if(!this.eof) {
			this.eofCheckLineBuffer = this.getNextLine()
			this.eof = !this.eofCheckLineBuffer
		}
		return this.eof
	}
}
