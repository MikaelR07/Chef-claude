import Header from "./components/header";
import Main from "./components/main";
import Particles from "./components/Particles";
function App() {
  return (
    <>
      <Particles
        particleColors={["#ffffff"]}
        particleCount={1000}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <div className="app-content">
        <Header />
        <Main />
      </div>
    </>
  );
}

export default App;
