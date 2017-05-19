Timer
-----

```
const start = Date.now();

<div>
  Start: {new Date(start).toString()}
  <Timer start={start} delay={1000} renderTime={(time) => <div>{time}</div>} />
</div>
```

TimeTimer
---------

```
const { default: TimeTimer } = require('./TimeTimer');

initialState = {
  start: Date.now()
};

const handleTimeChange = () => {
  setState({
    start: Date.now() - Math.floor(Math.random() * 1000000)
  });
};

<div>
  Start: {new Date(state.start).toString()}
  <button onClick={handleTimeChange}>Change start time</button>
  <div>
    <TimeTimer start={state.start} />
  </div>
</div>
```
