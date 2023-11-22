import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import LoglessNav from "./LoglessNav";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import GaugeChart from "react-gauge-chart";
import { db, rtdb, auth } from "../firebase";
import { onValue, ref } from "firebase/database";
import "./Home.css";

const Home = () => {
  // TODO: store data from here to firebase datastore
  // console.log(db);
  // console.log(rtdb);
  const [currentUser, setCurrentUser] = useState(null);
  const [us, setUs] = useState(0);
  const [pir, setPir] = useState(false);
  const [tmp, setTmp] = useState(0);
  const [humid, setHumid] = useState(0);
  const [gas, setGas] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    const query = ref(rtdb, "sensor");
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        if (data["ultrasonic"] > 10) data["ultrasonic"] = 10;
        setUs(data["ultrasonic"]);
        setPir(data["motion"]);
        setTmp(data["temperature"]);
        setHumid(data["humidity"]);
        setGas(data["gas"]);
        let d = new Date();
        let dd = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`;
        let ddm = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
        let dds = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
        let t = `${d.getHours()}:${ddm}:${dds}`;
        //   console.log("interval: ", new Date());
        // console.log(t);
        // console.log(dd);
        db.collection(dd)
          .doc(t)
          .set({
            // ultrasonic: us,
            // motion: pir,
            // temperature: tmp,
            // humidity: humid,
            // gas: gas,
            ultrasonic: data["ultrasonic"],
            motion: data["motion"],
            temperature: data["temperature"],
            humidity: data["humidity"],
            gas: data["gas"],
          })
          .then((res) => {
            console.log("success: ", res);
          });
      }
    });
  }, []);

  const ip =
    "https://console.firebase.google.com/u/0/project/rafif-iot/firestore/data/";

  const motionText = pir ? "Yes" : "No";
  const motionColor = pir ? "on" : "off";

  const cardStyle = {
    backgroundColor: "#a0b0b0",
    borderBlockColor: "black",
  };
  const hStyle = {
    padding: "2px",
    margin: "10px",
    textAlign: "center",
    fontStyle: "oblique",
  };
  return (
    <>
      <Navigation />
      <br />
      <br />
      <br />
      <br />
      {currentUser ? (
        <Container>
          <Row style={{ margin: "5px" }}>
            <Col>
              <Card style={cardStyle}>
                <Card.Title>
                  <h5 style={hStyle}>Temperature</h5>
                </Card.Title>
                <GaugeChart
                  id="gauge-chart2"
                  nrOfLevels={20}
                  percent={tmp / 40}
                  arcPadding={0.02}
                  textColor="black"
                  formatTextValue={(temperature) => {
                    return temperature * 0.4 + "°C";
                  }}
                />
              </Card>
            </Col>
            <Col>
              <Card style={cardStyle}>
                <Card.Title>
                  <h5 style={hStyle}>Water Levels</h5>
                </Card.Title>
                <GaugeChart
                  id="gauge-chart3"
                  nrOfLevels={20}
                  percent={(us * 10) / 100}
                  arcPadding={0.02}
                  textColor="black"
                  formatTextValue={(value) => {
                    return (value * 10) / 100 + " cm";
                  }}
                />
              </Card>
            </Col>
          </Row>
          &nbsp;
          <Row style={{ margin: "5px" }}>
            <Col>
              <Card style={cardStyle}>
                <Card.Title>
                  <h5 style={hStyle}>Humidity</h5>
                </Card.Title>
                <GaugeChart
                  id="gauge-chart4"
                  nrOfLevels={20}
                  percent={humid / 100}
                  arcPadding={0.02}
                  textColor="black"
                  formatTextValue={(value) => {
                    return value + "%";
                  }}
                />
              </Card>
            </Col>
            <Col>
              <Card style={cardStyle}>
                <Card.Title>
                  <h5 style={hStyle}>Gas</h5>
                </Card.Title>
                <GaugeChart
                  id="gauge-chart4"
                  nrOfLevels={20}
                  percent={gas / 100}
                  arcPadding={0.02}
                  textColor="black"
                  formatTextValue={(value) => {
                    return value;
                  }}
                />
              </Card>
            </Col>
          </Row>
          <Row style={{ margin: "5px" }}>
            <Col
              className="d-flex justify-content-center"
              style={{ marginRight: "30px" }}
            >
              <Button
                size="lg"
                onClick={() => {
                  window.open(ip, "_blank");
                }}
                style={{ margin: "10px" }}
              >
                History
              </Button>
              <Button
                size="lg"
                variant={motionColor}
                style={{ margin: "10px" }}
              >
                Motion: {motionText}
              </Button>
            </Col>
          </Row>
          <br />
        </Container>
      ) : (
        <>
          <LoglessNav />
          <br />
          <br />
          <br />
          <Container>
            <h1>Please login to continue.</h1>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
