import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const CarList = ({ selectedModell }) => {
  const [car, setCar] = useState([]);
  const [showMoreCars, setShowMoreCars] = useState(false);
  const [carback, setCarback] = useState([]);
  const [buttonValues, setButtonValues] = useState({});
  const [backgroundcolor, setBackgroundcolor] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const carData = [];
      for (let i = 0; i < 25; i++) {
        const response = await fetch(`http://localhost:8001/${i}`);
        const data = await response.json();
        carData.push(data);
      }
      setCar(carData);
      setCarback(carData);
    };

    fetchData();
  }, []);

  const moreCars = (carsmoreCars, carsSuperiorClass, carsid) => {
    const toggleButtonValue = () => {
      setButtonValues((prevState) => ({
        ...prevState,
        [carsid]: prevState[carsid] === 'down' ? 'up' : 'down',
      }));
    };

    const toggleButtonColor = () => {
      setBackgroundcolor((prevColor) => ({
        ...prevColor,
        [carsid]: prevColor[carsid] === 'white' ? 'black' : 'white',
      }))
    }

    const toggleShowMoreCars = () => {
      setShowMoreCars(!showMoreCars);
    };

    const ShowCars = async () => {
      if (!showMoreCars) {
        const carMoreData = [];
        for (let i = 25; i < 41; i++) {
          const response = await fetch(`http://localhost:8001/${i}`);
          const data = await response.json();
          if (data.superiorClass === carsSuperiorClass) {
            carMoreData.push(data);
          }
        }
        const addition = (carsid) => {
          let add = 0;
          if (carsid % 3 !== 0) {
            carsid = carsid + 1;
            if (carsid % 3 !== 0) {
              carsid = carsid + 1;
              add = 2;
            } else {
              add = 1;
            }
          }
          return add;
        };
        setCar([
          ...car.slice(0, carsid + addition(carsid)),
          ...carMoreData.map((car) => ({ ...car, newCar: true }) ),
          ...car.slice(carsid + addition(carsid) -1 ),
        ]);
        toggleButtonValue();
        toggleButtonColor();
        toggleShowMoreCars();
        setBackgroundcolor('black');
      } else {
        setCar(carback);
        toggleButtonValue();
        toggleButtonColor();
        toggleShowMoreCars();
        setBackgroundcolor('white');
      }
    };

    if (carsmoreCars) {
      return (
        <button className="moreButton" onClick={() => {ShowCars()}}>
          {buttonValues[carsid] === 'down' ? <SlArrowUp /> : <SlArrowDown />}
        </button>
      );
    }
    return null;
  };

  const showReturn = (
    carsMietModelle,
    carsKaufModelle,
    carspic,
    carsClass,
    carsmoreCars,
    carsid,
    carsSuperiorClass
  ) => {
    if (selectedModell === "mietmodell") {
      if (carsMietModelle === true) {
        if (carsmoreCars)
          return (
            <div className="showReturn">
              <div className={`showReturn${carsid}`}>
              <img src={carspic} className="carsPic" />
              <div className={backgroundcolor}>
                <p className="carClass">{carsClass}</p>
                {moreCars(carsmoreCars, carsSuperiorClass, carsid)}
              </div>
              </div>
            </div>
          );
        return (
          <Link className="linkSpecificCar" to={`/specificCar/${carsClass}`}>
            <div className="showReturn">
            <div className={`showReturn${carsid}`}>
              <img src={carspic} className="carsPic" />
              <div className={backgroundcolor}>
                <p className="carClass">{carsClass}</p>
              </div>
              </div>
            </div>
          </Link>
        );
      }
      return (
        <div className="showReturnFalse">
          <div className={`showReturn${carsid}`}>
          <img src={carspic} className="carsPic" />
          <div className={backgroundcolor}>
            <p className="carClass">{carsClass}</p>
            {moreCars(carsmoreCars, carsSuperiorClass, carsid)}
          </div>
          </div>
        </div>
      );
    }
    if (selectedModell === "kaufmodell") {
      if (carsKaufModelle === true) {
        if (carsmoreCars)
          return (
            <div className="showReturn">
              <div className={`showReturn${carsid}`}>
              <img src={carspic} className="carsPic" />
              <div className={backgroundcolor}>
                <p className="carClass">{carsClass}</p>
                {moreCars(carsmoreCars, carsSuperiorClass, carsid)}
              </div>
              </div>
            </div>
          );
        return (
          <Link className="linkSpecificCar" to={`/specificCar/${carsClass}`}>
            <div className="showReturn">
            <div className={`showReturn${carsid}`}>
              <img src={carspic} className="carsPic" />
              <div className={backgroundcolor}>
                <p className="carClass">{carsClass}</p>
              </div>
              </div>
            </div>
          </Link>
        );
      }
      return (
        <div className="showReturnFalse">
          <div className={`showReturn${carsid}`}>
          <img src={carspic} className="carsPic" />
          <div className={backgroundcolor}>
            <p className="carClass">{carsClass}</p>
            {moreCars(carsmoreCars, carsSuperiorClass, carsid)}
          </div>
          </div>
        </div>
      );
    }
  };

  const BeforeShowReturn = (carsNewCar,carsmietmodell,carskaufmodell,carspic,carsclass,carsmoreCars,carsid,carssuperiorClass) => {
    if(carsNewCar){
      return(
      <div className="NewCarDiv">
          <div className={`cars-prview ${carsNewCar ? 'new-cars-row' : ''}`} key={carsid}>
          {showReturn(
            carsmietmodell,
            carskaufmodell,
            carspic,
            carsclass,
            carsmoreCars,
            carsid,
            carssuperiorClass
          )}
          </div>
      </div>
      );
    }
    if(!carsNewCar){
      return(
      <div className="OldCarDiv">
          <div className={`cars-prview ${carsNewCar ? 'new-cars-row' : ''}`} key={carsid}>
          {showReturn(
            carsmietmodell,
            carskaufmodell,
            carspic,
            carsclass,
            carsmoreCars,
            carsid,
            carssuperiorClass
          )}
          </div>
      </div>
      );
    }
  }
  
return(
  <div className="returnALL">
  <div className="cars-map">
    {car.map((cars) => (
      <div>
        {BeforeShowReturn(cars.newCar,cars.mietmodell,cars.kaufmodell,cars.pic,cars.class,cars.moreCars,cars.id,cars.superiorClass)}
      </div>
    ))}
  </div>
</div>
);
};

export default CarList;