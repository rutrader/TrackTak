import industryMappingJson from "../data/industryMapping.json";

export const spaceRegex = /\s/g;
const industryMapping = {};

Object.keys(industryMappingJson).forEach((key) => {
  const noSpaceKey = key.replace(spaceRegex, "").toUpperCase();

  industryMapping[noSpaceKey] = industryMappingJson[key];
});

export default industryMapping;
