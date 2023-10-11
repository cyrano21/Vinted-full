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
    <div className="publish-container">
      <h2>Vends ton article</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData();

          formData.append("title", title);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("condition", condition);
          formData.append("city", city);
          formData.append("brand", brand);
          formData.append("size", size);
          formData.append("color", color);
          formData.append("picture", selectedFile);

          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  Authorization: "bearer " + token,
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
            <div className="input-design">
              <label htmlFor="file" className="label-file">
                <span className="input-sign">+</span>
                <span>Ajoute une photo</span>
              </label>

              <input
                type="file"
                id="file"
                className="input-file"
                onChange={(event) => {
                  setSelectedFile(event.target.files[0]);
                  const objectUrl = URL.createObjectURL(event.target.files[0]);
                  setPreview(objectUrl);
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-input-section">
          <div className="text-input">
            <label htmlFor="titre">
              <h4>Titre</h4>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="ex: Chemise Sézane verte"
              value=""
              onChange={(event) => {
                handleChange(event, setTitle);
              }}
            ></input>
          </div>

          <div className="text-input">
            <label htmlFor="description">
              <h4>Décris ton article</h4>
            </label>

            <textarea
              name="description"
              id="description"
              rows="5"
              value={description}
              placeholder="ex: porté quelquefois, taille correctement"
              onChange={(event) => {
                handleChange(event, setDescription);
              }}
            ></textarea>
          </div>
        </div>

        <div className="text-input-section">
          <div className="text-input">
            <label htmlFor="brand">
              <h4>Marque</h4>
            </label>
            <input
              type="text"
              id="brand"
              name="selectedBrand"
              placeholder="ex: Zara"
              value={brand}
              onChange={(event) => {
                handleChange(event, setBrand);
              }}
            ></input>
          </div>

          <div className="text-input">
            <label htmlFor="size">
              <h4>Taille</h4>
            </label>
            <input
              type="text"
              id="size"
              name="selectedSize"
              placeholder="ex: L / 40 / 12"
              value={size}
              onChange={(event) => {
                handleChange(event, setSize);
              }}
            ></input>
          </div>

          <div className="text-input">
            <label htmlFor="color">
              <h4>Couleur</h4>
            </label>
            <input
              type="text"
              id="color"
              value={color}
              placeholder="ex: Fushia"
              onChange={(event) => {
                handleChange(event, setColor);
              }}
            ></input>
          </div>

          <div className="text-input">
            <label htmlFor="condition">
              <h4>Etat</h4>
            </label>
            <input
              type="text"
              name="condition"
              id="condition"
              placeholder="Neuf avec étiquette"
              value={condition}
              onChange={(event) => {
                handleChange(event, setCondition);
              }}
            ></input>
          </div>

          <div className="text-input">
            <label htmlFor="city">
              <h4>Lieu</h4>
            </label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="ex: Paris"
              value={city}
              onChange={(event) => {
                handleChange(event, setCity);
              }}
            ></input>
          </div>
        </div>

        <div className="text-input-section">
          <div className="text-input">
            <label htmlFor="price">
              <h4>Prix</h4>

              <div className="checkbox-section">
                <input
                  type="text"
                  name="city"
                  id="price"
                  placeholder="0,00 €"
                  value=""
                  onChange={(event) => {
                    handleChange(event, setPrice);
                  }}
                ></input>
              </div>
            </label>
          </div>
        </div>

        <div className="form-button-div">
          <button type="submit" className="form-validation">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/signin" state={{ from: "/publish" }} />
  );
}
