import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC', // Primary color
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    gradient: {
      background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
    },
    custom: {
      primary: '#4E60AA', 
      secondary: '#303347', 
      accent: '#F5A623', 
      muted: '#44556D', 
      danger: '#E53E3E', 
      success: '#38A169', 
      info: '#3182CE', 
    },
  },
  fonts: {
    heading: `'Exo 2', sans-serif`,
    body: `'Exo 2', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      sizes: {
        sm: {
          fontSize: 'sm',
          px: 4,
          py: 2,
        },
        md: {
          fontSize: 'md',
          px: 6,
          py: 3,
        },
        lg: {
          fontSize: 'lg',
          px: 8,
          py: 4,
        },
        xl: {
          fontSize: 'xl',
          px: 10,
          py: 6,
        },
      },
      variants: {
        solid: {
          bg: 'custom.primary',
          color: 'white',
          _hover: {
            bg: 'custom.primary',
            opacity: 0.9,
          },
          _active: {
            bg: 'custom.primary',
            opacity: 0.8,
          },
        },
        outline: {
          border: '2px solid',
          borderColor: 'custom.primary',
          color: 'custom.primary',
          _hover: {
            bg: 'custom.primary',
            color: 'white',
          },
          _active: {
            bg: 'custom.primary',
            opacity: 0.8,
          },
        },
        ghost: {
          color: 'custom.primary',
          _hover: {
            bg: 'custom.primary',
            color: 'white',
          },
          _active: {
            bg: 'custom.primary',
            opacity: 0.8,
          },
        },
        link: {
          color: 'custom.primary',
          _hover: {
            textDecoration: 'underline',
            color: 'custom.accent',
          },
        },
        accent: {
          bg: 'custom.accent',
          color: 'white',
          _hover: {
            bg: 'custom.accent',
            opacity: 0.9,
          },
          _active: {
            bg: 'custom.accent',
            opacity: 0.8,
          },
        },
        danger: {
          bg: 'custom.danger',
          color: 'white',
          _hover: {
            bg: 'custom.danger',
            opacity: 0.9,
          },
          _active: {
            bg: 'custom.danger',
            opacity: 0.8,
          },
        },
        success: {
          bg: 'custom.success',
          color: 'white',
          _hover: {
            bg: 'custom.success',
            opacity: 0.9,
          },
          _active: {
            bg: 'custom.success',
            opacity: 0.8,
          },
        },
        info: {
          bg: 'custom.info',
          color: 'white',
          _hover: {
            bg: 'custom.info',
            opacity: 0.9,
          },
          _active: {
            bg: 'custom.info',
            opacity: 0.8,
          },
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'solid',
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        backgroundImage: "url('/src/assets/images/generalbg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        minHeight: '100vh',
        fontFamily: `'Exo 2', sans-serif`,
      },
      h1: {
        fontWeight: '900',
        fontSize: '4rem',
        lineHeight: '1.2',
      },
      h2: {
        fontWeight: '300',
        fontSize: '2.2rem',
        lineHeight: '1.3',
      },
      h3: {
        fontWeight: '700',
        fontSize: '2.5rem',
        lineHeight: '1.4',
      },
      h4: {
        fontWeight: '600',
        fontSize: '2rem',
        lineHeight: '1.5',
      },
      h5: {
        fontWeight: '500',
        fontSize: '1.5rem',
        lineHeight: '1.6',
      },
      h6: {
        fontWeight: '200',
        fontSize: '1.25rem',
        lineHeight: '1.7',
      },
      p: {
        fontWeight: '400',
        fontSize: '1rem',
        lineHeight: '1.8',
      },
    },
  },
});

export default theme;
