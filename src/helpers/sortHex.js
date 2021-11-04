import colorutil from "color-util";

function sortHex(colors, allowedRange) {
	const regexToGrabColors = /"#......"/gm;
	function convertHexToHSL(hexFormattedColor) {
		const rgb = colorutil.hex.to.rgb(hexFormattedColor);
		const hsl = colorutil.rgb.to.hsl(rgb);
		return { hex: hexFormattedColor, hsl: hsl };
	}
	function splitArrIntoGroups(arrSortedByHue) {
		let dividedArr = [];
		while (arrSortedByHue.length > 0) {
			const arrSortedByCounter = sortRanges(calculatePossibleHueRanges(arrSortedByHue));
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
	function calculatePossibleHueRanges(colorsSortedByHue) {
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
		return colorsToSortByRange.sort(function (a, b) {
			return b.counter - a.counter;
		});
	}
	const themeColorsSet = new Set([]);
	colors.match(regexToGrabColors).forEach((matchingColor) => {
		themeColorsSet.add(matchingColor.slice(1, matchingColor.length - 1));
	});
	const themeColors = Array.from(themeColorsSet).map((color) => {
		return convertHexToHSL(color);
	});
	const sortedColorsByHue = sortColorByHue(themeColors);
	const result = splitArrIntoGroups(sortedColorsByHue);
	return result;
}

export default sortHex;
