/* eslint-env node */
export const animation = {
  'loader-spin': 'loader-spin 6s infinite',
  'animation-prixClipFix': 'prixClipFix 2s linear infinite'
}

export const keyframes = {
  rotate: {
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  prixClipFix: {
    '0%': {
      'clip-path': 'polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)'
    },
    '25%': {
      'clip-path': 'polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)'
    },
    '50%': {
      'clip-path': 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)'
    },
    '75%': {
      'clip-path': 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)'
    },
    '100%': {
      'clip-path': 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)'
    }
  },
  'loader-spin': {
    '0%': {
      'box-shadow': '-10px -10px 0 5px, -10px -10px 0 5px, -10px -10px 0 5px, -10px -10px 0 5px'
    },
    '8.33%': {
      'box-shadow': '-10px -10px 0 5px,10px -10px 0 5px,10px -10px 0 5px,10px -10px 0 5px'
    },
    '16.66%': {
      'box-shadow': '-10px -10px 0 5px,10px -10px 0 5px,10px 10px 0 5px,10px 10px 0 5px'
    },
    '24.99%': {
      'box-shadow': '-10px -10px 0 5px,10px -10px 0 5px,10px 10px 0 5px,-10px 10px 0 5px'
    },
    '33.32%': {
      'box-shadow': '-10px -10px 0 5px,10px -10px 0 5px,10px 10px 0 5px,-10px -10px 0 5px'
    },
    '41.65%': {
      'box-shadow': '10px -10px 0 5px,10px -10px 0 5px,10px 10px 0 5px,10px -10px 0 5px'
    },
    '49.98%': {
      'box-shadow': '10px 10px 0 5px,10px 10px 0 5px,10px 10px 0 5px,10px 10px 0 5px'
    },
    '58.31%': {
      'box-shadow': '-10px 10px 0 5px,-10px 10px 0 5px,10px 10px 0 5px,-10px 10px 0 5px'
    },
    '66.64%': {
      'box-shadow': '-10px -10px 0 5px,-10px -10px 0 5px,10px 10px 0 5px,-10px 10px 0 5px'
    },
    '74.97%': {
      'box-shadow': '-10px -10px 0 5px,10px -10px 0 5px,10px 10px 0 5px,-10px 10px 0 5px'
    },
    '83.3%': {
      'box-shadow': '-10px -10px 0 5px,10px 10px 0 5px,10px 10px 0 5px,-10px 10px 0 5px'
    },
    '91.63%': {
      'box-shadow': '-10px -10px 0 5px,-10px 10px 0 5px,-10px 10px 0 5px,-10px 10px 0 5px'
    },
    '100%': {
      'box-shadow': '-10px -10px 0 5px,-10px -10px 0 5px,-10px -10px 0 5px,-10px -10px 0 5px'
    }
  }
}
