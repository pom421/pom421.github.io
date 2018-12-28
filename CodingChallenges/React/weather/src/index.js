import React from "react";
import ReactDOM from "react-dom";
import Weather from "./weather";
import "./index.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.city || "",
      weathers: []
    };

    this.onChangeCity = this.onChangeCity.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  // initial loading
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${
        this.state.city
      }&appid=6eed85457720ef833e3204086aa5e43e&units=metric&lang=fr`
    )
      .then(res => {
        return res.json(); // res is a stream (in fetch), so it is asynchronous
      })
      .then(json => {
        const data = json.list.map(item => ({
          temp: item.main.temp,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          date: item.dt_txt
        }));

        // pick up 1 data on 8 to have 1 data / day
        this.setState({
          weathers: data.filter((ignore, index) => index % 8 === 0)
        });
      });
  }

  onChangeCity(event) {
    this.setState(
      {
        city: event.target.value
      },
      this.fetchData // fetchData needs to be fired after city was updated
    );
  }

  render() {
    const { weathers, city } = this.state;
    return (
      <div style={{ padding: "10px 20px" }}>
        <h1>Weather from {city.split(",")[0]}</h1>
        <p><i>See weather forecast for the 5 next days</i></p>
        <p>
          See{" "}
          <a href="https://github.com/pom421/pom421.github.io/tree/master/CodingChallenges/React/weather">
            code on GitHub
          </a>
        </p>
        <hr />
        <select
          value={this.state.city}
          onChange={this.onChangeCity}
          style={{ height: "30px", margin: "10px 10px 10px 0" }}
        >
          <option value="Paris,fr">Paris</option>
          <option value="Berlin,de">Berlin</option>
          <option value="Rome,it">Rome</option>
          <option value="Madrid,es">Madrid</option>
          <option value="Lisbon,pt">Lisbon</option>
        </select>
        <button onClick={this.fetchData} style={{ height: "30px" }}>
          Refresh
        </button>

        {weathers.map(weather => <Weather key={weather.date} {...weather} />)}

        <hr style={{ clear: "left", marginTop: "200px" }} />
        <p>
          <i>
            Data from{" "}
            <a href="https://openweathermap.org/">
              https://openweathermap.org/
            </a>
          </i>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App city="Berlin,de" />, document.querySelector("#root"));
