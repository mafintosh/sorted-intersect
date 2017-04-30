var intersect = require('./index');
var assert = require('assert');

assert.deepEqual(intersect([
	[1,2,3],
	[1,2,4],
	[4,5,6]
]), []);

assert.deepEqual(intersect([
	[1,2,3],
	[2,3,4],
	[0,1,2,3,4]
]), [2,3]);

assert.deepEqual(intersect([
	[1,2,3],
	[1,2,3],
	[1,2,3]
]), [1,2,3]);

assert.deepEqual(intersect([
	[1,2,3,4,5],
	[1,2,3],
	[5,6,7,8],
	[9,10,11,12]
]), []);

assert.deepEqual(intersect([
	[1,3],
	[1,2,3],
	[1,2,3],
	[1,2,4]
]), [1]);

assert.deepEqual(intersect([
	[1,3,4,5],
	[3,4,5],
	[2,3,4,5,6,7]
], {marker:3}), [4,5]);

assert.deepEqual(intersect([
	[1,3,4,5],
	[3,4,5],
	[2,3,4,5,6,7]
], {marker:2}), [3,4,5]);

assert.deepEqual(intersect([
	[1,2],
	[3,4],
	[5,6],
	[7,8]
]), []);

assert.deepEqual(intersect([
	[1,2,3],
	[1,2,3],
	[1,2,3]
], {limit:2}), [1,2]);
