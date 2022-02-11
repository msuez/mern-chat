import { NavLink} from "react-router-dom";

export const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">Chat App</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/auth/signup" className="nav-item nav-link">Sign up</NavLink>
          <NavLink to="/auth/signin" className="nav-item nav-link">Sign in</NavLink>
        </div>
      </div>
    </nav>
  )
}
