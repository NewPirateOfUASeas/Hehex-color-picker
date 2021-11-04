import colorlab from "colorlab";
import convert from "color-convert";

function parseHexColors(fileWithColors) {
	const regexToGrabColors = /"#......"/gm;
	const themeColorsSet = new Set([]);
	fileWithColors.match(regexToGrabColors).forEach((matchingColor) => {
		themeColorsSet.add(matchingColor.slice(1, matchingColor.length - 1));
	});
	const themeColors = Array.from(themeColorsSet).map((color) => {
		return { hex: color, elementCloseEnoughTo: [] };
	});
	return themeColors;
}

function sortHexByCIEDE2000(hexArr, allowedRange) {
	const hexArrSplittedByRanges = hexArr.splice();
	while (hexArr.length > 0) {
		let index = 0;
		const firstColor = hexArr[0]; //this variable wont be static because array shifts
		for (let i = index + 1; i < hexArr.length; i++) {
			const nextColor = hexArr[i];
			const firstColorInLab = new colorlab.CIELAB(...convert.hex.lab.raw(firstColor.hex));
			const secondColorInLab = new colorlab.CIELAB(...convert.hex.lab.raw(nextColor.hex));
			if (colorlab.CIEDE2000(firstColorInLab, secondColorInLab) < allowedRange) {
				firstColor.elementCloseEnoughTo.push(nextColor);
				nextColor.elementCloseEnoughTo.push(firstColor);
			}
		}
		hexArrSplittedByRanges.push(hexArr.shift());
		index++;
	}
	return hexArrSplittedByRanges;
}

function sortColorsByRangeLength(colorsToSortByRange) {
	return colorsToSortByRange.sort(function (a, b) {
		return b.elementCloseEnoughTo.length - a.elementCloseEnoughTo.length;
	});
}

function splitIntoGroups(sortedByRangesColors) {
	const arrSplittedIntoGroups = [];
	while (sortedByRangesColors.length > 0) {
		const biggestGroup = sortedByRangesColors.shift();
		biggestGroup.range = [biggestGroup.hex];
		biggestGroup.elementCloseEnoughTo.forEach((element) => {
			const getThisElement = sortedByRangesColors.findIndex((color) => {
				element.hex === color.hex;
			});
			const spliced = sortedByRangesColors.splice(getThisElement, 1);
			if (spliced.length > 0) {
				biggestGroup.range.push(spliced[0].hex);
			}
		});
		arrSplittedIntoGroups.push(biggestGroup.range);
	}
	return arrSplittedIntoGroups;
}

function splitParsedColor(file, allowedRange) {
	const parsedColors = parseHexColors(file);
	const sortedByCIEDE2000 = sortHexByCIEDE2000(parsedColors, allowedRange);
	const sortedByRangeLength = sortColorsByRangeLength(sortedByCIEDE2000);
	const finallyGrouppedArray = splitIntoGroups(sortedByRangeLength);
	return finallyGrouppedArray;
}

export default splitParsedColor;
