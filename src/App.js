import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { visitors } from "./redux/visitorsSlice";
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.visitorsSlice)
  useEffect(() => {

    dispatch(visitors());
    var pusher = new Pusher('9f9fba5c6e7aa611c54a', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('new-visitors-channel');
    channel.bind('new-visitors-event', function (data) {
      dispatch(visitors());
      toast('Daten wurden aktualisiert', { toastId: 'success1' });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <ToastContainer />
      <div className="row">

        {
          state.status === 'succeeded' &&
          state?.data.map((data, i) => {
            return (

              <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 box-con" key={i}>
                <span className='title'>{data.title}</span>
                <div className='box'>
                  <span className='box-title'>Anmeldungen heute</span>
                  <span className='box-number'>{data.AnmeldungenHeute}</span>
                  
                </div>
                <div className='box'>
                  <span className='box-title'>Website Besucher heute</span>
                  <span className='box-number'>{data.WebsiteBesucherHeute}</span>
                </div>
                <br /><br />
              </div>
            )

          })

        }

      </div>
    </div>
  );
}

export default App;
