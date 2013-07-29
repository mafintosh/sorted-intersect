var noobj = {};

var gallop = function(list, val, offset) {
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

		return mid;
	}

	return val > list[low] ? low+1 : low;
};

var intersect = function(lists, opts) {
	opts = opts || noobj;

	var result = [];
	var offsets = [];
	var limit = opts.limit || Infinity;
	var first = lists[0];

	for (var i = 0; i < lists.length; i++) offsets[i] = 0;

	if (opts.offset) offsets[0] = opts.offset;
	if (opts.marker !== undefined) {
		offsets[0] = gallop(first, opts.marker, offsets[0]);
		if (offsets[0] < first.length && first[offsets[0]] === opts.marker) offsets[0]++;
	}

	if (lists.length === 1) return first.slice(offsets[0], offsets[0]+limit);

	while (result.length < limit) {
		for (var j = 0; j < lists.length-1; j++) {
			var listA = lists[j];
			var listB = lists[j+1];
			var offsetA = offsets[j];
			var offsetB = offsets[j+1];

			var found = false;

			while (offsetA < listA.length && offsetB < listB.length) {
				var valA = listA[offsetA];
				var valB = listB[offsetB];

				if (valA > valB) {
					offsetB = gallop(listB, valA, offsetB);
					continue;
				}
				if (valB > valA) {
					offsetA = gallop(listA, valB, offsetB);
					continue;
				}

				offsets[j] = offsetA;
				offsets[j+1] = offsetB;
				found = true;
				break;
			}

			if (!found) return result;
		}

		result.push(lists[0][offsets[0]]);
		for (var i = 0; i < offsets.length; i++) offsets[i]++;
	}

	return result;
};

module.exports = intersect;