import MainNavigation from "./MainNavigation/MainNavigation";
import Main from "./Main/Main";

export default function Layout(props) {
  console.log(props);
  return (
    <div className="">
      <MainNavigation />
      <Main>{props.children}</Main>
    </div>
  );
}
