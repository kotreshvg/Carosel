import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Carosal</h1>
      <div className='body'>
        <div className='side_bar'>
          <div className='categories'>
            <p>Categories</p>
            <ul>
              <li>People</li>
              <li>Beaches</li>
              <li>.</li>
            </ul>
          </div>
          <div className='files'>
            <p>Files</p>
            <ul>
              <li>People</li>
              <li>Beaches</li>
              <li>.</li>
              <li>.</li>
              <li>.</li>
              <li>.</li>
              <li>.</li>
            </ul>
          </div>
        </div>

        <div className='main_area'>
          <div className='carousal_diaplay'>
            <div className='previous'><i class="fa fa-caret-left" aria-hidden="true"/></div>
            <img className='carousal_img'></img>
            <div className='next'><i class="fa fa-caret-right" aria-hidden="true"/></div>
          </div>
          <div className='thumbnails'>
            <div className='thumb'>
              <img src='' className='thumb_image'></img>
              <p role='imgName'>name</p>
            </div>
            <div className='thumb'>
              <img src='' className='thumb_image'></img>
              <p role='imgName'>name</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
