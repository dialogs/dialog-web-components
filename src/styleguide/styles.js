module.exports = {
  theme: {
    maxWidth: '100%',
    sidebarWidth: 250,
    fontFamily: {
      base: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
      ],
      monospace: [
        'SF Mono',
        'Monaco',
        'Inconsolata',
        'Fira Code',
        'Fira Mono',
        'Droid Sans Mono',
        'Consolas',
        'Roboto Mono',
        'Source Code Pro',
        'monospace'
      ]
    },
    color: {
      link: '#5856d6',
      linkHover: 'rgb(70, 69, 171)',
      sidebarBackground: '#6b00cb',
      errorBackground: '#e22d44'
    }
  },
  styles: {
    StyleGuide: {
      root: {
        'text-rendering': 'optimizeLegibility',
        '-moz-osx-font-smoothing': 'grayscale',
        '-webkit-font-smoothing': 'antialiased'
      },
      sidebar: {},
      content: {},
      logo: {
        border: 'none',
        paddingBottom: 0
      }
    },
    Logo: {
      logo: {
        color: '#fff',
        fontSize: 20
      }
    },
    ComponentsList: {
      list: {
        '& ul': {
          paddingLeft: 0
        }
      },
      item: {
        '& a': {
          'color': 'rgba(255, 255, 255, 0.9) !important',
          'fontWeight': 500,
          '&:hover': {
            textDecoration: 'underline',
            color: '#fff !important'
          }
        }
      },
      heading: {
        fontSize: '18px !important',
        fontWeight: '600 !important',
        color: '#fff !important'
      }
    },
    TableOfContents: {
      input: {
        'borderColor': 'rgba(255, 255, 255, 0.4)',
        'borderRadius': '4px',
        'padding': '6px 8px',
        'lineHeight': '24px',
        'color': '#fff',
        'boxSizing': 'border-box',
        'backgroundColor': 'transparent',
        '&::-webkit-input-placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)'
        },
        '&:-moz-placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)'
        },
        '&::-moz-placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)'
        },
        '&:-ms-input-placeholder': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.7)'
        },
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.7)'
        },
        '&:focus': {
          'borderColor': '#fff !important',
          '&::-webkit-input-placeholder': {
            color: 'rgba(255, 255, 255, 0.9)'
          },
          '&:-moz-placeholder': {
            color: 'rgba(255, 255, 255, 0.9)'
          },
          '&::-moz-placeholder': {
            color: 'rgba(255, 255, 255, 0.9)'
          },
          '&:-ms-input-placeholder': {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        }
      }
    },
    Playground: {
      root: {
        '& .styleguide__buttons': {
          '& .Button__container': {
            margin: 4
          },
          '& .ButtonNext__container': {
            margin: 4
          },
          '& .IconButton__container': {
            margin: 4
          }
        }
      }
    }
  }
};
