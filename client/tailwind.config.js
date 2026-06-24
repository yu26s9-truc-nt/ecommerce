/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // convenience named colors (still available)
                dpink: "#DA1884",
                dpink2: "#FF4FB0",
                dpinkLt: "#FFE6F2",
                dorange: "#FF671F",
                dbrown: "#2A1810",
                dmute: "#6B5A52",
                dline: "#F1E6EC",

                // semantic tokens mapped to CSS variables with sensible fallbacks
                primary: "var(--primary, #DA1884)",
                "primary-foreground": "var(--primary-foreground, #ffffff)",

                secondary: "var(--secondary, #F3E8EC)",
                "secondary-foreground": "var(--secondary-foreground, #6B5A52)",

                accent: "var(--accent, #FF4FB0)",
                "accent-foreground": "var(--accent-foreground, #ffffff)",

                destructive: "var(--destructive, #ef4444)",
                "destructive-foreground":
                    "var(--destructive-foreground, #ffffff)",

                muted: "var(--muted, #f3e8ec)",
                "muted-foreground": "var(--muted-foreground, #6b5a52)",

                border: "var(--border, #F1E6EC)",
                input: "var(--input, #fff)",
                ring: "var(--ring, #F1E6EC)",
            },
            fontFamily: {
                display: ['"Lilita One"', "system-ui", "sans-serif"],
                sans: ["Montserrat", "system-ui", "sans-serif"],
            },
            boxShadow: {
                tile: "0 6px 18px -10px rgba(42,24,16,.18)",
                pop: "0 20px 50px -20px rgba(218,24,132,.55)",
            },
        },
    },
    plugins: [],
};
