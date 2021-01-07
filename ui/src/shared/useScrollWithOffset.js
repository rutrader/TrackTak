import { useTheme } from "@material-ui/core";

const useScrollWithOffset = () => {
  const theme = useTheme();

  return (scrollArgs) => (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -theme.mixins.toolbar.minHeight;

    window.scrollTo({ top: yCoordinate + yOffset, ...scrollArgs });
  };
};

export default useScrollWithOffset;
