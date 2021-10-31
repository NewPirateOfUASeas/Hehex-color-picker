<template>
	<template v-if="sourceText.length < 1">
		<div
			class="dragndropContainer"
			:class="{ dragOver: isDragover }"
			@drag.prevent.stop=""
			@dragstart.prevent.stop=""
			@dragend.prevent.stop="isDragover = false"
			@dragover.prevent.stop="isDragover = true"
			@dragenter.prevent.stop="isDragover = true"
			@dragleave.prevent.stop="isDragover = false"
			@drop.prevent.stop="upload"
		>
			<h5>Drop your file here</h5>
		</div>
		<p>Or select file from here</p>
		<input type="file" @change="upload" />
	</template>
	<template v-else>
		<div class="calculatedTextContainer" v-if="calculatedTextfile.length > 0">
			{{ calculatedTextfile }}
		</div>
		<button @click="calcFinalFile">Get new stylesheet</button>
	</template>
	Allowed Range:
	<input type="number" v-model="allowedRange" />
	<div v-for="(group, index) in dividedColors" :key="index">
		<h2>Group {{ index + 1 }}:</h2>
		<!-- <template name="placeholders for now">
			<input type="number" v-model="allowedRange" />
			Hue:
			<input type="number" v-model="hueValue" />
			Saturation:
			<input type="number" v-model="saturationValue" />
			Lightness:
			<input type="number" v-model="lightnessValue" />
			Alpha:
			<input type="number" v-model="alphaValue" />
		</template> -->
		<div
			class="colorSquare"
			v-for="(color, index) in group"
			:key="index"
			:style="`background-color: ${color.csshsl}`"
		/>
	</div>
</template>

<script>
import sortHex from "./sortHex.js";
import colorutil from "color-util";

export default {
	name: "App",
	data() {
		return {
			allowedRange: 0.05,
			sourceText: ``,
			calculatedTextfile: ``,
			dividedColors: [],
			alphaValue: 1,
			isDragover: false
		};
	},
	methods: {
		upload($event) {
			this.isDragover = false;
			const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];
			const reader = new FileReader();
			reader.onload = (file) => {
				this.sourceText = file.target.result;
				this.dividedColors = sortHex(file.target.result, this.allowedRange);
			};
			reader.readAsText(files[0]);
		},
		calcFinalFile() {
			let result = this.sourceText;
			this.dividedColors.forEach((group) => {
				group.forEach((color) => {
					const hexBefore = color.hex;
					const hexNow = colorutil.rgb.to.hex(colorutil.hsl.to.rgb(color.hsl));
					result = result.replaceAll(hexBefore, hexNow);
				});
			});
			this.calculatedTextfile = result;
		}
	},
	computed: {
		
	}
};
</script>

<style scoped>
.colorSquare {
	width: 25px;
	height: 25px;
	display: inline-flex;
}
.dragndropContainer {
	border: 2px solid rgb(126, 233, 126);
	min-width: 250px;
	width: 15%;
	min-height: 300px;
	max-height: 25%;
	display: flex;
	justify-content: center;
}
.dragOver {
	background-color: rgba(124, 185, 124, 0.527);
}
.dragndropContainer > h5 {
	text-align: center;
}
.calculatedTextContainer {
	width: 95%;
	margin-top: 5%;
	margin-bottom: 5%;
	margin-left: auto;
	margin-right: auto;
	height: 30vh;
	overflow: auto;
	border: 2px solid black;
}
</style>
