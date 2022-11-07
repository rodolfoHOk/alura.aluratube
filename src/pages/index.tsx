import config from '../../config.json';

function HomePage() {
  const message = 'Bem vindo ao Alura Tube!';
  const homePageStyles = { backgroundColor: 'red' };
  return (
    <div style={homePageStyles}>
      <h2>{message}</h2>
      <Menu />
      <Header />
      <TimeLine />
    </div>
  );
}

export default HomePage;

function Menu() {
  return (
    <div>
      <p>Menu</p>
    </div>
  );
}

function Header() {
  return (
    <div>
      <img src="" alt="header banner" />
      <img
        src={`https://github.com/${config.github}.png`}
        alt="foto do perfil"
      />
      <span>{config.name}</span>
      <span>{config.job}</span>
    </div>
  );
}

function TimeLine() {
  return (
    <div>
      <p>TimeLine</p>
    </div>
  );
}
