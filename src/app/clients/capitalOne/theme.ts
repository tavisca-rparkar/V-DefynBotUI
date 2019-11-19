import { Theme } from "src/app/models/theme";

export const capitalOne: Theme = {
  name: "Capital One",
  id: "capital-one",
  style: {
    "--theme-color": "#004879",
    "--gradient-color":
      "linear-gradient(to top right, #004879, #005279, #d22e1e)",
    icon: "../../../assets/featureImages/CapitalOne.jpg",
    "--mic-icon-color": "#ff0000"
  }
};
