import React, { useEffect } from "react";
import NavBar from "../sections/NavBar";
import "../style/home.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getTracks } from "../slices/tracksSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus,faEllipsis } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  const tracks = useSelector((state: RootState) => state.tracks.tracks);
  const status = useSelector((state: RootState) => state.tracks.status);
  const dispatch = useDispatch<AppDispatch>();
  const filters=["all","artists","albums","paylists","podcasts","episodes"]
  useEffect(() => {
    dispatch(getTracks("rolling"));
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      console.log(tracks);
    }
  }, [status, tracks]);

  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-section"></div>

        <div className="home-section">
          <div className="genres">
            {filters.map((filter) => (
              <div key={filter} className="genre">
                {filter}
              </div>
            ))

            }
          </div>
          <div className="search-look">
            <div className="home-section-title">top result</div>
            <div className="home-section-content">
              {tracks.map((track) => (
                <div key={track._id} className="track-card">
                  <div className="track-card-image">
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
