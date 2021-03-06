/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import api, { API_TYPES } from "../../actions/api";

const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


export default function SpendingNew(props) {

  const classes = useStyles();
  const [costs, setCosts] = useState([]);
  const [cars, setCars] = useState([]);
  const [state, setState] = React.useState({
    carId: 0, costId: 0, price:0
  });


  useEffect(() => {
    const fetchData = async () => {

      const costsResponse = await api.request(API_TYPES.COSTS).fetchAll();
      const userCars = await api.request(API_TYPES.SPENDINGS).fetchUserCars("/" + props.match.params.id);

      setCosts(costsResponse.data);
      setCars(userCars.data);
      console.log(userCars.data)
      console.log(costsResponse.data)

    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  async function SendData(){
    state.idSpendings = 0;
    state.carId = parseInt(state.carId);
    state.costId = parseInt(state.costId);
    state.Date = new Date().toISOString().slice(0,10);
    state.idUser = props.match.params.id;

    await api.request(API_TYPES.SPENDINGS).create(state);

  }


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add spending</h4>
              <p className={classes.cardCategoryWhite}> Fill required fields</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <InputLabel htmlFor="carId">Select car</InputLabel>
                  <Select
                    native
                    value={state.carId}
                    onChange={handleChange}
                    name="carId"
                    required
                    fullWidth="true"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      id: 'carId',
                    }}
                  >
                    <option aria-label="None" value="" />
                    {cars.map((car, key) => (
                      <option key={key} value={car.idCar}>{car.model}</option>
                    ))}
                  </Select>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <InputLabel htmlFor="cost">Cost type</InputLabel>
                  <Select
                    native
                    value={state.cost}
                    onChange={handleChange}
                    name="costId"
                    fullWidth="true"
                    required
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      id: 'cost',
                    }}
                  >
                    <option aria-label="None" value="" />
                    {costs.map((cost, key) => (
                      <option key={key} value={cost.idCosts}>{cost.description}</option>
                    ))}


                  </Select>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Enter price"
                    id="price"
                    name="price"
                    onChange={handleChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{

                    }}
                  />
                </GridItem>
                {/* </FormControl> */}
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={SendData}>Update Info</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
