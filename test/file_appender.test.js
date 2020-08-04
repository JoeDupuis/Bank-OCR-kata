import tmp from 'tmp'
import fs from 'fs'
import {FileAppender} from '../lib/file_appender'

describe('FileAppender', ()=>{
	describe('Append', ()=>{
		let tmpfile
		beforeEach(() => {
			tmpfile = tmp.fileSync()
		})
		afterEach(() => {
			tmpfile.removeCallback()
		})

		test('Should append the given line at the of the file', ()=>{
			const dummyFile = tmpfile.name
			const subject = new FileAppender(dummyFile)

			subject.append('a test line')
			subject.append('another test line')
			const content = fs.readFileSync(dummyFile, 'utf8')

			expect(content).toBe('a test line\nanother test line')
		})
	})
})
