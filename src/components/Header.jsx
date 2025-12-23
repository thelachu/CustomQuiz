import "./Header.css";
function Header() {
  return (
    <div className="header">
      <h2>QUIZZ</h2>
      <div className="right-header">
        <select name="themes" id="themes">
          <option id="default">Default</option>
          <option id="lightMode">Light Mode</option>
          <option id="darkMode">Dark Mode</option>
        </select>
        <div id="menu">
          <span className="span"></span>
          <span className="span"></span>
          <span className="span"></span>
        </div>
      </div>
    </div>
  );
}

export default Header;
