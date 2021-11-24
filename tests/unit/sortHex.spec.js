import sortHex from "@/helpers/sortHex.js";

const expectingThisResult = [
	[
		{
			hex: "#ffffff",
			hsl: {
				h: 0,
				s: 0,
				l: 1,
				a: 1
			}
		},
		{
			hex: "#000000",
			hsl: {
				h: 0,
				s: 0,
				l: 0,
				a: 1
			}
		},
		{
			hex: "#aaaaaa",
			hsl: {
				h: 0,
				s: 0,
				l: 0.6666666666666666,
				a: 1
			}
		}
	],
	[
		{
			hex: "#00000026",
			hsl: {
				h: 0,
				s: 0,
				l: 0,
				a: 0.14901960784313725
			}
		}
	]
];

describe("sortHex sorts hex colors", () => {
	it("returns colors sorted", () => {
		const colors = ["#ffffff", "#000000", "#aaaaaa", "#00000026"];
		expect(sortHex(0.05, colors)).toStrictEqual(expectingThisResult);
	});
});
