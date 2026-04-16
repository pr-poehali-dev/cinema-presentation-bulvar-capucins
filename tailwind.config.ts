import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				display: ['Cormorant Garamond', 'serif'],
				heading: ['Oswald', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				film: {
					gold: '#C9A84C',
					dark: '#0A0A0A',
					charcoal: '#1A1A1A',
					smoke: '#2C2C2C',
					ash: '#8A8A8A',
					cream: '#F0E8D8',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(40px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'zoom-slow': {
					from: { transform: 'scale(1)' },
					to: { transform: 'scale(1.08)' }
				},
				'slide-reveal': {
					from: { clipPath: 'inset(0 100% 0 0)' },
					to: { clipPath: 'inset(0 0% 0 0)' }
				},
				'letterbox-in': {
					from: { transform: 'scaleY(0)', opacity: '0' },
					to: { transform: 'scaleY(1)', opacity: '1' }
				},
				'title-flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' },
					'75%': { opacity: '0.95' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 1s ease-out forwards',
				'fade-in': 'fade-in 1.5s ease-out forwards',
				'zoom-slow': 'zoom-slow 8s ease-in-out infinite alternate',
				'slide-reveal': 'slide-reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards',
				'title-flicker': 'title-flicker 4s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
