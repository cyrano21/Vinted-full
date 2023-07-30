import "../Publish/publish.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Publish({ token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedFile, setSelectedFile] = useState("null");
  const [preview, setPreview] = useState("null");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  return token ? (
    <div className="publish-contain">
      <h2>Vends ton article</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.deppend("title", title);
          formData.deppend("description", description);
          formData.deppend("price", price);
          formData.deppend("condition", condition);
          formData.deppend("city", city);
          formData.deppend("brand", brand);
          formData.deppend("size", size);
          formData.deppend("color", color);
          formData.deppend("picture", selectedFile);

          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  Authorization: "bearer" + token,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.log(error.response);
          }
        }}
      >
        <div className="file-select">
          {preview && (
            <img className="img-preview" src={preview} alt="previsualisation" />
          )}

          <div className="preview-without">
            <div className="input-desing">
              <div className="label-file">
                <span className="input-sign">
                  <input
                    type="file"
                    id="selectedFile"
                    onChange={(event) => {
                      setSelectedFile(event.target.files[0]);
                      const objectUrl = URL.createObjectURL(
                        event.target.files[0]
                      );
                      setPreview(objectUrl);
                    }}
                  />
                </span>

                <label htmlFor="selectedFile">Ajoute une photo</label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description">Décris ton article</label>
          <textarea
            type="text"
            id="description"
            onChange={(event) => {
              handleChange(event, setDescription);
            }}
            value={description}
          />
        </div>
        <div>
          <label htmlFor="brand">Marque</label>
          <input
            type="text"
            id="brand"
            onChange={(event) => {
              handleChange(event, setBrand);
            }}
            value={brand}
          />
        </div>
        <div>
          <label htmlFor="size">Taille</label>
          <input
            type="text"
            id="size"
            onChange={(event) => {
              handleChange(event, setSize);
            }}
            value={size}
          />
        </div>
        <div>
          <label htmlFor="color">Couleur</label>
          <input
            type="text"
            id="color"
            onChange={(event) => {
              handleChange(event, setColor);
            }}
            value={color}
          />
        </div>
        <div>
          <label htmlFor="condition">État</label>
          <input
            type="text"
            id="condition"
            onChange={(event) => {
              handleChange(event, setCondition);
            }}
            value={condition}
          />
        </div>
        <div>
          <label htmlFor="city">Lieu</label>
          <input
            type="text"
            id="city"
            onChange={(event) => {
              handleChange(event, setCity);
            }}
            value={city}
          />
        </div>
        <div>
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            onChange={(event) => {
              handleChange(event, setPrice);
            }}
            value={price}
          />
        </div>
        <button>Ajouter</button>
      </form>
    </div>
  ) : (
    <Navigate to="/SignIn" />
  );

  // }

  // const Publish = ({ token }) => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState(0);
  // const [condition, setCondition] = useState("");
  // const [city, setCity] = useState("");
  // const [brand, setBrand] = useState("");
  // const [size, setSize] = useState("");
  // const [color, setColor] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [preview, setPreview] = useState(null);

  // const handleChange = (event, setState) => {
  //   setState(event.target.value);
  // };

  // return token ? (
  //   <>
  //     <h2>Vends ton article</h2>
  //     <form
  //       onSubmit={async (event) => {
  //         event.preventDefault();
  //         const formData = new FormData();
  //         formData.append("title", title);
  //         formData.append("description", description);
  //         formData.append("price", Number(price));
  //         formData.append("condition", condition);
  //         formData.append("city", city);
  //         formData.append("brand", brand);
  //         formData.append("size", size);
  //         formData.append("color", color);
  //         formData.append("picture", selectedFile);

  //         try {
  //           const response = await axios.post(
  //             "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
  //             formData,
  //             {
  //               headers: {
  //                 Authorization: "Bearer " + token,
  //                 "Content-Type": "multipart/form-data",
  //               },
  //             }
  //           );
  //           console.log(response.data);
  //         } catch (error) {
  //           console.log(error.response);
  //         }
  //       }}
  //     >
  //       <div>
  //         <label htmlFor="selectedFile">Ajoute une photo</label>
  //         <input
  //           type="file"
  //           id="selectedFile"
  //           onChange={(event) => {
  //             setSelectedFile(event.target.files[0]);
  //             const objectUrl = URL.createObjectURL(event.target.files[0]);
  //             setPreview(objectUrl);
  //           }}
  //         />
  //         {preview && <img src={preview} alt="previsualisation" />}
  //       </div>
  //       <div>
  //         <label htmlFor="title">Titre</label>
  //         <input
  //           type="text"
  //           id="title"
  //           onChange={(event) => {
  //             handleChange(event, setTitle);
  //           }}
  //           value={title}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="desc">Décris ton article</label>
  //         <textarea
  //           type="text"
  //           id="desc"
  //           onChange={(event) => {
  //             handleChange(event, setDescription);
  //           }}
  //           value={description}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="brand">Marque</label>
  //         <input
  //           type="text"
  //           id="brand"
  //           onChange={(event) => {
  //             handleChange(event, setBrand);
  //           }}
  //           value={brand}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="size">Taille</label>
  //         <input
  //           type="text"
  //           id="size"
  //           onChange={(event) => {
  //             handleChange(event, setSize);
  //           }}
  //           value={size}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="color">Couleur</label>
  //         <input
  //           type="text"
  //           id="color"
  //           onChange={(event) => {
  //             handleChange(event, setColor);
  //           }}
  //           value={color}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="condition">État</label>
  //         <input
  //           type="text"
  //           id="condition"
  //           onChange={(event) => {
  //             handleChange(event, setCondition);
  //           }}
  //           value={condition}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="city">Lieu</label>
  //         <input
  //           type="text"
  //           id="city"
  //           onChange={(event) => {
  //             handleChange(event, setCity);
  //           }}
  //           value={city}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="price">Prix</label>
  //         <input
  //           type="number"
  //           id="price"
  //           onChange={(event) => {
  //             handleChange(event, setPrice);
  //           }}
  //           value={price}
  //         />
  //       </div>
  //       <button>Ajouter</button>
  //     </form>
  //   </>
  // ) : (
  //   <Navigate to="/signin" state={{ from: "/publish" }} />
  // );
}

// export default Publish;
