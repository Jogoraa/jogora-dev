/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
	extend: {
		fontFamily: {
			'roboto': ['Roboto', 'sans-serif'],
			'sans': ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)',
			'2xl': '1rem',
			'3xl': '1.5rem'
		},
		colors: {
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		spacing: {
			'18': '4.5rem',
			'88': '22rem',
			'128': '32rem'
		},
		backdropBlur: {
			'3xl': '64px'
		},
		boxShadow: {
			'modern': '0 10px 25px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.08)',
			'modern-hover': '0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)',
			'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
			'inner-modern': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
		},
		transitionDuration: {
			'400': '400ms',
			'600': '600ms',
			'800': '800ms',
			'1200': '1200ms'
		},
		keyframes: {
			'accordion-down': {
				from: {
					height: '0'
				},
				to: {
					height: 'var(--radix-accordion-content-height)'
				}
			},
			'accordion-up': {
				from: {
					height: 'var(--radix-accordion-content-height)'
				},
				to: {
					height: '0'
				}
			},
			'fade-in': {
				'0%': {
					opacity: '0'
				},
				'100%': {
					opacity: '1'
				}
			},
			'fade-in-up': {
				'0%': {
					opacity: '0',
					transform: 'translateY(30px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			},
			'fade-in-down': {
				'0%': {
					opacity: '0',
					transform: 'translateY(-30px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			},
			'slide-in-left': {
				'0%': {
					opacity: '0',
					transform: 'translateX(-50px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateX(0)'
				}
			},
			'slide-in-right': {
				'0%': {
					opacity: '0',
					transform: 'translateX(50px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateX(0)'
				}
			},
			'scale-in': {
				'0%': {
					opacity: '0',
					transform: 'scale(0.9)'
				},
				'100%': {
					opacity: '1',
					transform: 'scale(1)'
				}
			},
			'float': {
				'0%, 100%': {
					transform: 'translateY(0px)'
				},
				'50%': {
					transform: 'translateY(-10px)'
				}
			},
			'gradient-shift': {
				'0%': {
					'background-position': '0% 50%'
				},
				'50%': {
					'background-position': '100% 50%'
				},
				'100%': {
					'background-position': '0% 50%'
				}
			},
			'pulse-subtle': {
				'0%, 100%': {
					opacity: '1'
				},
				'50%': {
					opacity: '0.8'
				}
			},
			'glow': {
				'0%': {
					'box-shadow': '0 0 20px rgba(99, 102, 241, 0.5)'
				},
				'100%': {
					'box-shadow': '0 0 30px rgba(99, 102, 241, 0.8), 0 0 40px rgba(99, 102, 241, 0.3)'
				}
			},
			'bounceSubtle': {
				'0%, 100%': {
					transform: 'translateY(0)'
				},
				'50%': {
					transform: 'translateY(-5px)'
				}
			},
			'rotateSlow': {
				'from': {
					transform: 'rotate(0deg)'
				},
				'to': {
					transform: 'rotate(360deg)'
				}
			},
			'wiggle': {
				'0%, 7%': {
					transform: 'rotateZ(0)'
				},
				'15%': {
					transform: 'rotateZ(-15deg)'
				},
				'20%': {
					transform: 'rotateZ(10deg)'
				},
				'25%': {
					transform: 'rotateZ(-10deg)'
				},
				'30%': {
					transform: 'rotateZ(6deg)'
				},
				'35%': {
					transform: 'rotateZ(-4deg)'
				},
				'40%, 100%': {
					transform: 'rotateZ(0)'
				}
			},
			'heartbeat': {
				'0%': {
					transform: 'scale(1)'
				},
				'14%': {
					transform: 'scale(1.1)'
				},
				'28%': {
					transform: 'scale(1)'
				},
				'42%': {
					transform: 'scale(1.1)'
				},
				'70%': {
					transform: 'scale(1)'
				}
			},
			'shimmer': {
				'0%': {
					'background-position': '-200% 0'
				},
				'100%': {
					'background-position': '200% 0'
				}
			},
			'elastic': {
				'0%': {
					transform: 'scale(1)'
				},
				'30%': {
					transform: 'scale(1.25)'
				},
				'75%': {
					transform: 'scale(0.85)'
				},
				'100%': {
					transform: 'scale(1)'
				}
			},
			'rubberBand': {
				'0%': {
					transform: 'scale(1)'
				},
				'30%': {
					transform: 'scaleX(1.25) scaleY(0.75)'
				},
				'40%': {
					transform: 'scaleX(0.75) scaleY(1.25)'
				},
				'50%': {
					transform: 'scaleX(1.15) scaleY(0.85)'
				},
				'65%': {
					transform: 'scaleX(0.95) scaleY(1.05)'
				},
				'75%': {
					transform: 'scaleX(1.05) scaleY(0.95)'
				},
				'100%': {
					transform: 'scale(1)'
				}
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'fade-in': 'fade-in 0.8s ease-out',
			'fade-in-up': 'fade-in-up 0.8s ease-out',
			'fade-in-down': 'fade-in-down 0.8s ease-out',
			'slide-in-left': 'slide-in-left 0.8s ease-out',
			'slide-in-right': 'slide-in-right 0.8s ease-out',
			'scale-in': 'scale-in 0.6s ease-out',
			'float': 'float 6s ease-in-out infinite',
			'gradient-shift': 'gradient-shift 8s ease infinite',
			'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
			'glow': 'glow 2s ease-in-out infinite alternate',
			'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
			'rotate-slow': 'rotateSlow 20s linear infinite',
			'wiggle': 'wiggle 1s ease-in-out infinite',
			'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
			'shimmer': 'shimmer 2s linear infinite',
			'elastic': 'elastic 0.6s ease-out',
			'rubber-band': 'rubberBand 1s ease-in-out',
			'typewriter': 'typewriter 3s steps(40) 1s forwards'
		},
		backgroundSize: {
			'300%': '300% 300%',
			'200%': '200% 200%'
		}
	}
  },
  plugins: [require("tailwindcss-animate")],
};