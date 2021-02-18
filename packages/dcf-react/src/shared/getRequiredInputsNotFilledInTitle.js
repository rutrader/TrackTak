import { valueDrivingInputsHeader } from "../components/ValueDrivingInputs";

const getRequiredInputsNotFilledInTitle = (hasAllRequiredInputsFilledIn) =>
  hasAllRequiredInputsFilledIn
    ? undefined
    : `The '${valueDrivingInputsHeader}' section above needs to be filled out first.`;

export default getRequiredInputsNotFilledInTitle;
