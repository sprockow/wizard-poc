import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#027db4',
      },
      secondary: {
        main: '#ffdb4b',
      },
    },
  }),
);

export default theme;
