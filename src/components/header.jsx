import chefIcon from "../assets/images/chef-colored.png";
export default function Header() {
  return (
    <header>
      <nav className="navigation-bar ">
        <div className="logo-container">
          <img className="logo-image" src={chefIcon} alt="Chef" />
          <h1 className="logo-name text-5xl font-medium">
            <span>Chef Claude</span>
          </h1>
        </div>
        <ul className="links text-3xl">
          <li>Inventory</li>
          <li>Recipes</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}
