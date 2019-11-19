import { Theme } from "src/app/models/theme";

export const defaultClient: Theme = {
  name: "Demo",
  id: "demo",
  style: {
    "--theme-color": "#0f4a29",
    "--gradient-color": "linear-gradient(to right, #0f4a29, #0f4a29, #0f4a29)",
    icon: "../../../assets/featureImages/demo.jpg",
    "--mic-icon-color": "#ff0000"
  }
};
