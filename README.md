# sorted-intersect

Intersect sorted lists using merge intersection with galloping lookahead.

	npm install sorted-intersect

It is useful if you want to (efficiently) intersect large, sorted lists.

## Usage

It is easy to use

``` js
var intersect = require('sorted-intersect');

var intersection = intersect([
	[4,6,7,8,9,10], // these lists should be sorted
	[6,7,8,10],
	[7,8,10],
	[4,5,6,7,8,9,10,11,12]
]);

console.log(intersection); // prints [7,8,10]
```

`intersect(lists, options)` takes an optional second parameter
which can contain the following options

``` js
{
	limit: number, // limit the result to this number
	marker: value, // start the intersection a this value,
	offsets: []    // use these list offsets (mutates the array)
}
```

## License

MIT
