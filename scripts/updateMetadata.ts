import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface ProgramOptions {
    inFile: string,
    descriptionREADMEFile: string,
    outFile?: string,
}

async function readCommandLineOptions(): Promise<ProgramOptions> {
	const options = await yargs(hideBin(process.argv))
		.option('inFile', {
			description: 'Input metadata file',
			type: 'string',
			default: './build/extension/metadata.json',
		})
		.option('descriptionREADMEFile', {
			description: 'README file for description',
			type: 'string',
			default: './extension_page.md',
		})
		.option('outFile', {
			description: 'Output metadada file, if not provided input file is modified',
			type: 'string',
			requiresArg: false,
		})
		.help()
		.parse();

	return options;
}

async function main() {
	const options = await readCommandLineOptions();
	options.outFile = options.outFile ?? options.inFile;

	const metadada =  JSON.parse(fs.readFileSync(options.inFile, 'utf8'));
	const description = fs.readFileSync(options.descriptionREADMEFile, 'utf8');

	metadada['description'] = description;

	fs.writeFileSync(options.outFile, JSON.stringify(metadada, null, 2));
}

main();