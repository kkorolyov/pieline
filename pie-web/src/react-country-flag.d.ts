declare module "react-country-flag" {
  import { Component } from "react";
  export interface ReactCountryFlagProps {
    /** Country code */
    countryCode: String;
    svg: boolean;
  }
  export default class ReactCountryFlag extends Component<
    ReactCountryFlagProps,
    any
  > {}
}
