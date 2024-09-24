import Button from '@janribka/components/Button';

function App() {
  return (
    <>
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <h4>H4</h4>
      <h5>H5</h5>
      <h6>H6</h6>
      <div className="ml-3 mt-3 flex gap-3">
        <Button>Button</Button>
        <Button variant="contained">Button</Button>
        <Button variant="outlined">Button</Button>
      </div>
    </>
  );
}

export default App;
