<template>
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
		<div
			class="colorSquare"
			v-for="(color, index) in turnedColor"
			:key="index"
			:style="`background-color: ${color}`"
		></div>
	</div>
</template>

<script>
import colorutil from "color-util";
import theme from "./theme";

/*
coloR
*/

export default {
	name: "App",
	data() {
		return {
			allowedRange: 0.1,
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
	},
	methods: {
		convertToHSL(hexFormatedColor) {
			const rgb = colorutil.hex.to.rgb(hexFormatedColor);
			const hsl = colorutil.rgb.to.hsl(rgb);
			hsl.h += this.hueValue / 100;
			hsl.s += this.saturationValue / 100;
			hsl.l += this.lightnessValue / 100;
			hsl.a += this.alphaValue / 10;
			return hsl; // return colorutil.hsl.to.csshsl(hsl);
		},
		groupColor(HSLFormattedColor) {
			return HSLFormattedColor.sort(function (a, b) {
				return a.h - b.h;
			});
		},
		splitColorsByHueRanges(arrayWithSortedHSL) {
			let highestAmountOfColorsInRange = 0;
			function callee(element, propIndex) {
				let localIndex = 0;
				let amountOfColorsInRangeOfCurrentRing = 0;
				while (
					element.h - arrayWithSortedHSL[propIndex + localIndex].h < this.allowedRange ||
					element.h - arrayWithSortedHSL[propIndex - localIndex].h > -this.allowedRange
				) {
					amountOfColorsInRangeOfCurrentRing++;
					localIndex++;
				}
				return amountOfColorsInRangeOfCurrentRing;
			}
			for (let index = 0; index < arrayWithSortedHSL.length; index++) {
				const element = arrayWithSortedHSL[index];
				if (highestAmountOfColorsInRange < callee(element, index)) {
					highestAmountOfColorsInRange++;
				}
			}
		}
	},
	computed: {
		turnedColor() {
			return this.themeColors.map((color) => {
				return this.convertToHSL(color);
			});
		},
		sortedHSL() {
			return this.groupColor(this.turnedColor);
		},
		colorsSplittedByHueRanges() {
			return this.splitColorsByHueRanges(this.sortedHSL);
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
