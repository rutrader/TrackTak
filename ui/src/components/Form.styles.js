import { makeStyles } from "@material-ui/core";

export const useFormStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textTransform: "none",
  },
  facebookIcon: {
    color: theme.palette.icons.facebook,
  },
}));