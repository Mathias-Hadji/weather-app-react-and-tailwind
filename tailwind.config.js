/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                gradientBg: "url('/src/assets/img/bg.png')",
            },
            keyframes: {
                shake: {
                    "0%": {
                        transform: "translate(3px, 0)",
                    },
                    "50%": {
                        transform: "translate(-3px, 0)",
                    },
                    "100%": {
                        transform: "translate(0, 0)",
                    },
                },

                fadeDown: {
                  "0%" : {
                    opacity: "0",
                    transform: "translate(0, -20px)"
                  },
                  "100%" : {
                    opacity: "100",
                    transform: "translate(0, 0)"
                  }
                }
            },
            
            animation: {
                shake: "shake 150ms 2 linear",
                fadeDown: "fadeDown 500ms ease-in-out"
            },
        },
    },
    plugins: [],
};
