import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: theme.palette.white,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: theme.size.label,
    fontFamily: theme.font.bold,
    color: theme.palette.text03,
    marginRight: 15,
  },
  number: {
    fontSize: theme.size.label,
    fontFamily: theme.font.bold,
    color: theme.palette.delete,
  },
}));
