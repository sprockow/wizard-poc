import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      htmlFontSize: 10,
    },
    palette: {
      primary: {
        main: 'rgb(8, 144, 208)',
      },
      secondary: {
        main: 'rgb(47, 198, 156)',
      },
    },
  }),
);

export default theme;
