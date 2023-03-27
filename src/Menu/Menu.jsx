import "../Menu/styles.css"

const Menu = () => {
  return (
    <div className="menu">
      <input type="checkbox" id="active"/>
      <label htmlFor="active" className="menu-btn"><span></span></label>
      <label htmlFor="active" className="close"></label>
      <div className="wrapper">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Feedback</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Menu;