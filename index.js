var noobj = {};

var gallop = function(list, val, offset, skip) {
	if (offset >= list.length) return list.length;

	var inc = 1;
	var low = offset;
	var high = offset+inc;
	var mid;

	while (high < list.length && list[high] < val) {
		low = high;
		high += inc;
		inc *= 2;
	}

	if (high >= list.length) high = list.length-1;

	while (low < high) { // binary search
		mid = (low + high) >> 1;
		if (val < list[mid]) {
			high = mid-1;
			continue;
		}
		if (val > list[mid]) {
			low = mid+1;
			continue;
		}

		return mid + skip;
	}

	if (list[low] > val) return low;
	if (list[low] === val) return low+skip;

	return low+1;
};

var intersect = function(lists, opts) {
	opts = opts || noobj;

	var result = [];
	var offsets = opts.offsets || [];
	var limit = opts.limit || Infinity;
	var first = lists[0];

	for (var i = offsets.length; i < lists.length; i++) offsets[i] = 0;

	if (opts.offset) offsets[0] = opts.offset;
	if (opts.marker !== undefined) offsets[0] = gallop(first, opts.marker, offsets[0], 1);

	if (!lists.length) return result;
	if (lists.length === 1) return first.slice(offsets[0], offsets[0]+limit);

	var matches = 0;
	while (result.length < limit) {
		for (var j = 0; j < lists.length-1; j++) {
			var listA = lists[j];
			var listB = lists[j+1];
			var offsetA = offsets[j];
			var offsetB = offsets[j+1];
			var done = true;

			while (offsetA < listA.length && offsetB < listB.length) {
				var valA = listA[offsetA];
				var valB = listB[offsetB];

				if (valA > valB) {
					matches = 0;
					offsetB = gallop(listB, valA, offsetB, 0);
					continue;
				}
				if (valB > valA) {
					matches = 0;
					offsetA = gallop(listA, valB, offsetA, 0);
					continue;
				}

				offsets[j] = offsetA;
				offsets[j+1] = offsetB;
				done = false;

				if (++matches === lists.length) {
					matches = 0;
					result.push(lists[0][offsets[0]]);
					for (var i = 0; i < offsets.length; i++) offsets[i]++;
				}

				break;
			}

			if (done) return result;
		}
	}

	return result;
};

module.exports = intersect;