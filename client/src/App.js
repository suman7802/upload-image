export default function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

function Form() {
  return (
    <form
      action="http://localhost:8000/api/image"
      method="POST"
      enctype="multipart/form-data">
      <div>
        <label for="formFile" class="form-label">
          Image
        </label>
        <input
          class="form-control"
          type="file"
          id="formFile"
          name="image"
          accept="image/*"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
