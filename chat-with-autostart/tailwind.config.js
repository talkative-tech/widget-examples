// tailwind.config.js
module.exports = {
	mode: "jit", // enable tailwind just in time
	purge: ["./index.html"],
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),

	],
};
