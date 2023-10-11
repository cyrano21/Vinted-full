// import { useState } from "react";

// import { Range } from "react-range";
// import "./offersPages.css";

// export default function OffersPage() {
//   const [values, setValues] = useState([10, 100]);

//   return (
//     <div className="margin-top">
//       <span className="style-right">Trier par prix : </span>
//       <span className="checkbox1">
//         <input type="checkbox" name="price" id="" />
//       </span>
//       <div>
//         Prix Min: {values[0]}€ - Prix Max: {values[1]}€
//       </div>
//       <Range
//         step={1}
//         min={0}
//         max={500}
//         values={values}
//         onChange={(values) => setValues(values)}
//         renderTrack={({ props, children }) => (
//           <div {...props} className="range-track">
//             <div
//               className="range-inner-track"
//               style={{
//                 left: `${(values[0] / 100) * 100}%`,
//                 width: `${((values[0] - values[1]) / 100) * 100}%`,
//               }}
//             />
//             {children}
//           </div>
//         )}
//         renderThumb={({ props, index, isDragged }) => (
//           <div {...props} className="range-thumb">
//             <div
//               className={`range-value ${
//                 isDragged ? "range-value-dragged" : ""
//               }`}
//             >
//               {values[index]}€
//             </div>
//           </div>
//         )}
//       />
//     </div>
//   );
// }

import { useState } from "react";
import { Range } from "react-range";
import "./offersPages.css";

export default function OffersPage() {
  const [values, setValues] = useState([10, 100]);
  const [checkboxState, setCheckboxState] = useState(false);

  return (
    <div className="margin">
      <div className="margin-top">
        <span className="margin-right">Trier par prix : </span>
        <span className="checkbox">
          <input
            type="checkbox"
            name="price"
            id="price"
            onChange={(e) => setCheckboxState(e.target.checked)}
          />
          <label htmlFor="price" className="wrapper">
            <div className={`knob ${checkboxState ? "knob-checked" : ""}`}>
              <span>⇡</span>
            </div>
          </label>
        </span>
        <span className="margin-right">Prix entre:</span>
        <div className="transform">
          <Range
            step={1}
            min={0}
            max={500}
            values={values}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => (
              <div {...props} className="range-track">
                <div
                  className="range-inner-track"
                  style={{
                    left: `${(values[0] / 500) * 100}%`,

                    width: `${((values[1] - values[0]) / 500) * 100}%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props, index, isDragged }) => (
              <div {...props} className="range-thumb">
                <div
                  className={`range-value ${
                    isDragged ? "range-value-dragged" : ""
                  }`}
                >
                  {values[index]}€
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
