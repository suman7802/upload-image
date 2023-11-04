import {useState} from 'react';
import axios from 'axios';
const url = 'http://localhost:8000/api/upload';
export default function App() {
  const [avatar, setAvatar] = useState({img: 'pictures/user.png'});
  const [name, setName] = useState('');
  const [signatureFile, setSignatureFile] = useState(null);
  const [passPhotoFile, setPassPhotoFile] = useState(null);

  function ConvertIntoBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async function HandelAvatar(image) {
    const base64 = await ConvertIntoBase64(image);
    setAvatar({img: base64});
  }

  function HandleName(e) {
    setName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('avatar', avatar.img);
    form.append('signature', signatureFile);
    form.append('passPhoto', passPhotoFile);

    try {
      const response = await axios.post(url, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200 || response.statusText === 'OK') {
        alert('Form submitted successfully!');
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      alert('Form submission failed. Please try again!');
      console.error(error);
    }
  }

  return (
    <form className="App flex flex-col justify-center items-center">
      <label htmlFor="InputAvatar">
        <div className="Avatar h-40 w-40 flex justify-center items-center overflow-hidden rounded-full">
          <img src={avatar.img} alt="avatar" />
        </div>
      </label>
      <input
        type="file"
        id="InputAvatar"
        className="Input hidden"
        onChange={(e) => HandelAvatar(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => HandleName(e)}
        className="p-1 text-center"
      />
      <label
        htmlFor="signature"
        className="block"
        style={{color: signatureFile && 'blue'}}>
        Signature
      </label>
      <input
        type="file"
        id="signature"
        name="signature"
        className="hidden"
        onChange={(e) => setSignatureFile(e.target.files[0])}
      />

      <label
        htmlFor="passPhoto"
        className="block"
        style={{color: passPhotoFile && 'blue'}}>
        PassPhoto
      </label>
      <input
        type="file"
        id="passPhoto"
        name="passPhoto"
        className="hidden"
        onChange={(e) => setPassPhotoFile(e.target.files[0])}
      />
      {avatar && name && signatureFile && passPhotoFile && (
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      )}
    </form>
  );
}
