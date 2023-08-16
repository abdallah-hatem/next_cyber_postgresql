import "./style.scss";
import LinkComponent from "../../../components/LinkComponent";
import SignOutButton from "./components/signOutButton";
import { isLoggedIn } from "../../../lib/isUserLoggedIn";
import { headers } from "next/headers";

export default async function Navbar() {
  const logged = await isLoggedIn();

  const headersList = headers();
  const currentPath = headersList.get("x-invoke-path");

  return (
    <div className="navbar-cont">
      <div className="items-cont">
        <LinkComponent useAnc={true} url="/">
          <h2>PlayStation.</h2>
        </LinkComponent>

        {logged !== null && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {currentPath !== "/settings" && (
              <LinkComponent useAnc={true} url="/settings">
                <p style={{ marginRight: 20 }}>Settings</p>
              </LinkComponent>
            )}

            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
}
