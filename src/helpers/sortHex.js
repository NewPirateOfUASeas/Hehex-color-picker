import colorutil from "color-util";
import { remove } from "lodash";
function convertHexToHSL(hexFormattedColor) {
	let rgb;
	if (hexFormattedColor.length > 8) {
		let hexAsArr = [hexFormattedColor.slice(0, 7), "0x" + hexFormattedColor.slice(-2)];
		rgb = colorutil.hex.to.rgb(hexAsArr[0], eval(hexAsArr[1]));
	} else {
		rgb = colorutil.hex.to.rgb(hexFormattedColor);
	}
	const hsl = colorutil.rgb.to.hsl(rgb);
	return { hex: hexFormattedColor, hsl: hsl };
}
function splitArrIntoGroups(arrSortedByHue, allowedRange) {
	let dividedArr = [];
	while (arrSortedByHue.length > 0) {
		const arrSortedByCounter = sortRanges(calculatePossibleHueRanges(arrSortedByHue, allowedRange));
		const index = arrSortedByCounter[0].index;
		const startingPoint = arrSortedByCounter[0].minIndex + index;
		//it's still summed because minIndex is negative number
		const endingPoint = arrSortedByCounter[0].maxIndex + index;
		const range = endingPoint - startingPoint > 0 ? endingPoint - startingPoint : 1;
		const splice = arrSortedByHue.splice(startingPoint, range);
		dividedArr.push(splice);
	}
	return dividedArr;
}
function sortColorByHue(colorsToSortByHue) {
	return colorsToSortByHue.sort(function (a, b) {
		return b.hsl.h - a.hsl.h;
	});
}
function calculatePossibleHueRanges(colorsSortedByHue, allowedRange) {
	const rangeArr = [];
	colorsSortedByHue.forEach((color, index) => {
		let counter = 0;
		let maxIndex = 0;
		let minIndex = 0;
		for (let i = index + 1; i < colorsSortedByHue.length; i++) {
			const nextColor = colorsSortedByHue[i];
			if (color.hsl.h - nextColor.hsl.h > allowedRange) {
				break;
			}
			counter++;
			maxIndex += 1;
		}
		for (let i = index - 1; i > -1; i--) {
			const previousColor = colorsSortedByHue[i];
			if (color.hsl.h - previousColor.hsl.h < -allowedRange) {
				break;
			}
			counter++;
			minIndex -= 1;
		}
		rangeArr.push({
			hex: color.hex,
			hsl: color.hsl,
			counter: counter,
			maxIndex: maxIndex,
			minIndex: minIndex,
			index: index
		});
	});
	return rangeArr;
}
function sortRanges(colorsToSortByRange) {
	return colorsToSortByRange.sort((a, b) => {
		return b.counter - a.counter;
	});
}
function sortOutGrayishColors(colorsSortedByRange, lowestSaturationAllowed, lowestLightnessAllowed) {
	const grayishColorsArr = [];
	for (let index = 0; index < colorsSortedByRange.length; index++) {
		const group = colorsSortedByRange[index];
		const grayishColors = remove(group, (color) => {
			return color.hsl.s < lowestSaturationAllowed || color.hsl.l < lowestLightnessAllowed;
		});
		grayishColorsArr.push(grayishColors);
	}
	return grayishColorsArr.concat(colorsSortedByRange);
}
export default function sortHex(
	allowedRange,
	grabbedColors,
	lowestSaturationAllowed = 0.17,
	lowestLightnessAllowed = 0.1
) {
	const themeColorsSet = new Set([]);
	grabbedColors.forEach((matchingColor) => {
		themeColorsSet.add(matchingColor);
	});
	const themeColors = Array.from(themeColorsSet).map((color) => {
		return convertHexToHSL(color);
	});
	const sortedColorsByHue = sortColorByHue(themeColors);
	const splittedIntoGroups = splitArrIntoGroups(sortedColorsByHue, allowedRange);
	const sortedOutGrayishColors = sortOutGrayishColors(
		splittedIntoGroups,
		lowestSaturationAllowed,
		lowestLightnessAllowed
	);
	// Removes empty arrays.
	// Empty arrays appear because _remove() function
	// does not remove arrays of length 1 after removing a single element in it
	remove(sortedOutGrayishColors, (color) => {
		return color.length === 0;
	});
	return sortedOutGrayishColors;
}
