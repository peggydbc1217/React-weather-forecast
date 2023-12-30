// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: "#FFC800"; // Yellow color for primary elements
      secondary: "#FAFAFA"; // Very light gray, almost white, for secondary elements
      tertiary: "#b3ffbf"; // Light green, used for tertiary elements
      background: "#ffffff"; // White background
      text: "#000000"; // Black text color
      primaryTextColor: "#474400"; // Dark yellow for primary text
      secondaryTextColor: "#777777"; // Medium gray for secondary text
      inputPlaceholder: "#C7C7C7"; // Light gray for input placeholders
      darkGrayText: "#303030"; // Dark gray text
      darkText: "#1A1A1A"; // Very dark (almost black) text
      black: "#000000"; // Black color
      white: "#ffffff"; // White color
      dark: ""; // Placeholder for dark color (not defined)
      medium: ""; // Placeholder for medium color (not defined)
      light: ""; // Placeholder for light color (not defined)
      danger: ""; // Placeholder for danger color (not defined)
      success: "#66A15A"; // Green color for indicating success
    };
    fonts: {
      anekMalayalam: "Anek Malayalam"; // Specifies a font family
    };
    paddings: {
      container: "15px"; // Padding for containers
      pageTop: "30px"; // Padding at the top of pages
    };
    margins: {
      pageTop: "30px"; // Margin at the top of pages
    };
  }
}
