import Form from "./form";

export default function Main() {
  return (
    <section className="main-section">
      <div className="main-container">
        <h2 className="intro-message">
          Enter your ingredients below to get your recipe:
        </h2>
        <Form />
      </div>
    </section>
  );
}
