<template>
	Allowed Range:
	<input type="number" v-model="allowedRange" />
	Hue:
	<input type="number" v-model="hueValue" />
	Saturation:
	<input type="number" v-model="saturationValue" />
	Lightness:
	<input type="number" v-model="lightnessValue" />
	Alpha:
	<input type="number" v-model="alphaValue" />
	<div>
		<h1>Before:</h1>
		<div class="colorSquare" v-for="color in themeColors" :key="color" :style="`background-color: ${color}`"></div>
	</div>
	<div>
		<h1>After:</h1>
		<!-- <div
			class="colorSquare"
			v-for="(color, index) in colorsSplittedByHueRangesToCSSHSL"
			:key="index"
			:style="`background-color: ${color.hsl}`"
		/> -->
	</div>
</template>

<script>
import colorutil from "color-util";
import theme from "./theme";

export default {
	name: "App",
	data() {
		return {
			allowedRange: 0.05,
			themeColors: ["#000000"],
			hueValue: 0,
			saturationValue: 0,
			lightnessValue: 0,
			alphaValue: 1
		};
	},
	mounted() {
		const regexToGrabColors = /"#......"/gm;
		const themeColorsSet = new Set([]);
		theme.match(regexToGrabColors).forEach((matchingColor) => {
			themeColorsSet.add(matchingColor.slice(1, matchingColor.length - 1));
		});
		this.themeColors = Array.from(themeColorsSet);

		this.colorsSplittedAndSorted.forEach((color) => {
			console.log(color.counter);
		});
	},
	methods: {
		convertToHSL(hexFormatedColor) {
			const rgb = colorutil.hex.to.rgb(hexFormatedColor);
			const hsl = colorutil.rgb.to.hsl(rgb);
			hsl.h += this.hueValue / 100;
			hsl.s += this.saturationValue / 100;
			hsl.l += this.lightnessValue / 100;
			hsl.a += this.alphaValue / 10;
			return { hex: hexFormatedColor, hsl: hsl };
		},
		convertToCSSHSL(hexHslPair) {
			return colorutil.hsl.to.csshsl(hexHslPair.hsl);
		},
		groupColor(hexHslPair) {
			return hexHslPair.sort(function (a, b) {
				return a.hsl.h - b.hsl.h;
			});
		},
		splitColorsByHueRanges(colorsSortedByHue) {
			const rangeArr = [];
			colorsSortedByHue.forEach((color, index) => {
				let counter = 0;
				for (let i = index + 1; i < colorsSortedByHue.length; i++) {
					const nextColor = colorsSortedByHue[i];
					if (color.hsl.h - nextColor.hsl.h < -this.allowedRange) {
						break;
					}
					counter++;
				}

				for (let i = index - 1; i != -1; i--) {
					const previousColor = colorsSortedByHue[i];
					if (color.hsl.h - previousColor.hsl.h > this.allowedRange) {
						break;
					}
					counter++;
				}
				rangeArr.push({ ...color, counter: counter });
			});
			return rangeArr;
		},
		sortRanges(colorsToSortByRange) {
			return colorsToSortByRange.sort(function (a, b) {
				return a.counter - b.counter;
			});
		}
	},
	computed: {
		turnedColor() {
			return this.themeColors.map((color) => {
				return this.convertToHSL(color);
			});
		},
		sortedByHue() {
			return this.groupColor(this.turnedColor);
		},
		colorsSplittedByHueRanges() {
			return this.splitColorsByHueRanges(this.sortedByHue);
		},
		colorsSplittedAndSorted() {
			return this.sortRanges(this.colorsSplittedByHueRanges);
		}
	}
};
</script>

<style scoped>
.colorSquare {
	width: 25px;
	height: 25px;
	display: inline-flex;
}
</style>
