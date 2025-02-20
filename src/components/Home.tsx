import React, { useEffect, useState } from "react";
import NavBar from "../sections/NavBar";
import "../style/home.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getTracks } from "../slices/tracksSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faEllipsis,faPlay } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const tracks = useSelector((state: RootState) => state.tracks.tracks);
  const status = useSelector((state: RootState) => state.tracks.status);
  const dispatch = useDispatch<AppDispatch>();
  const filters = ["all", "artists", "albums", "paylists", "podcasts", "episodes"];
  const searchState = useSelector((state: RootState) => state.search.search);
 const [search, setSearch] = useState(searchState);
  useEffect(() => {
    dispatch(getTracks(search));
  }, [dispatch,search]);
  useEffect(() => {
    dispatch(getTracks(" "));
  }, []);

  useEffect(() => {
    if (status === "succeeded") {
      console.log(tracks);
    }
  }, [status, tracks]);
  useEffect(() => {
    setSearch(searchState);
  }, [searchState ]);
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-section">{search} </div>

        <div className="home-section">
          <div className="genres">
            {filters.map((filter) => (
              <div key={filter} className="genre">
                {filter}
              </div>
            ))}
          </div>
          <div className="search-look">
            <div className="topResult-container">
              <div className="home-section-title">top result</div>
              <div className="topResult">
                {tracks.length > 0 && (
                  <>
                    <div className="top-result-image">
                      <img src={tracks[0].images} alt={tracks[0].name} />
                    </div>
                    <div className="top-result-name">{tracks[0].name}</div>
                    <div className="artist">
                      <span className="top-result-artist">song . </span>adele
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="home-section-content">
              <div className="songs-title">Songs</div>
              {tracks.map((track) => (
                <div key={track._id} className="track-card">
                  <div className="track-card-image">
                    
                  <FontAwesomeIcon icon={faPlay} />
                  
                    <img src={track.images} alt={track.name} />
                  </div>
                  <div className="track-card-info">
                    <div className="card-text">
                      <div className="names">
                        <div className="track-card-name">{track.name}</div>
                        <div className="track-card-artist">adele</div>
                      </div>
                      <FontAwesomeIcon className="plus-icon" icon={faCirclePlus} />
                      {`${Math.floor(track.duration_ms / 60000)}:${Math.floor(
                        (track.duration_ms % 60000) / 1000
                      )
                        .toString()
                        .padStart(2, "0")}`}
                      <FontAwesomeIcon className="card-menu-icon" size="xs" icon={faEllipsis} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="home-section"></div>
      </div>
    </>
  );
};

export default Home;