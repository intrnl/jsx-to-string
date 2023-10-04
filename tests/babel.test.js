import * as path from 'node:path';
import * as test from 'bun:test';

import tester from 'babel-plugin-tester';

import plugin from '../src/babel/index';

Object.assign(globalThis, { describe: test.describe, it: test.it });
tester({
	plugin,
	fixtures: path.join(__dirname, 'fixtures'),
	snapshot: true,
});
