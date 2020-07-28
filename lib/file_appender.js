import fs from 'fs'

export class FileAppender {
	constructor(filename){
		this.file = fs.openSync(filename, 'a')
		this.firstLine = true
	}


	append(line) {
		if(!this.firstLine){
			line = '\n' + line
		}
		this.firstLine = false
		fs.appendFileSync(this.file, line, 'utf8')
	}

	close(){
		fs.closeSync(this.file)
	}
}
