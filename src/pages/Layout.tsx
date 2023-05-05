import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";

interface Props {
  children: React.ReactElement;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={4}>
          <SideMenu />
        </Grid>
        <Grid item md={8}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
