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
		<div>
			Allowed Range (dont touch it if u're unsure):
			<input type="number" v-model="allowedRange" />
		</div>
	</template>
	<template v-else>
		<!-- If i was fanatical about "single-responsiblity" i'd move it in separate component, but i'll
		keep it here since i'm a sane person -->
		<div class="calculatedTextContainer" v-if="calculatedTextfile.length > 0">
			{{ calculatedTextfile }}
			<img @click="putCalculatedStyleInClipboard" class="copyIcon" src="./assets/icons/copy_icon.svg" />
		</div>
		<button @click="calcFinalFile">Get new stylesheet</button>
	</template>
	<color-group
		v-for="(group, index) in dividedColors"
		:key="index"
		:index="index"
		:group="group"
		@shifted-colors="this.shiftedColors[index] = $event"
	/>
</template>

<script>
import sortHex from "./helpers/sortHex.js";
import colorutil from "color-util";
import ColorGroup from "./components/ColorGroup.vue";

export default {
	name: "App",
	components: {
		ColorGroup
	},
	data() {
		return {
			allowedRange: 0.05,
			sourceText: ``,
			calculatedTextfile: ``,
			dividedColors: [],
			shiftedColors: [],
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
			this.shiftedColors.forEach((group) => {
				group.forEach((color) => {
					const hexBefore = color.initialHex;
					const hexNow = colorutil.rgb.to.hex(colorutil.hsl.to.rgb(color.hsl));
					result = result.replaceAll(hexBefore, hexNow);
				});
			});
			this.calculatedTextfile = result;
		},
		putCalculatedStyleInClipboard() {
			navigator.clipboard.writeText(this.calculatedTextfile);
		}
	}
};
</script>

<style scoped>
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

.copyIcon {
	height: 10vh;
	width: 10vw;
	position: absolute;
	top: 10vh;
	right: 3vw;
	opacity: 0.8;
}
.copyIcon:hover {
	opacity: 1;
	cursor: pointer;
}
.copyIcon:active {
	filter: drop-shadow(0.5rem 0.5rem 1rem black);
}
</style>
