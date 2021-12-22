import { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
// import urls from "../../Urls/Url";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {
  deleteUrlAction,
  listUrls,
  updateUrlAction,
} from "../../actions/urlActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyUrls = () => {
  const [urlId, setUrlId] = useState("");
  const [detailObject, setDetailObject] = useState({});
  const dispatch = useDispatch();
  const urlList = useSelector((state) => state.urlList);
  const { loading, urls, error } = urlList;

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const urlCreate = useSelector((state) => state.urlCreate);
  const { success: successCreate } = urlCreate;

  const urlUpdate = useSelector((state) => state.urlUpdate);
  const { sucess: successUpdate } = urlUpdate;

  const urlDelete = useSelector((state) => state.urlDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = urlDelete;

  //   const {
  //     userLogin: { userInfo },
  //   } = getState();
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userInfo.token}`,
  //     },
  //   };

  const getdetailsHandler = async (id) => {
    const { data } = await axios.get(`/api/urls/${id}`);
    return data;
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUrlAction(id));
    }
  };

  const updateUrlHandler = () => {
    console.log("new changes in url data short", detailObject);
    // const changes = await axios.put(
    //   `http://localhost:5000/api/urls/${urlId}`,
    //   detailObject
    // );
    //   dispatch(updateUrlAction(urlid, shortUrl, longUrl));
    dispatch(updateUrlAction(urlId, detailObject));
    // return changes;
  };

  useEffect(() => {
    dispatch(listUrls());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  useEffect(async () => {
    var data2 = await getdetailsHandler(urlId);
    // console.log(data2);
    setDetailObject(data2.shortUrl);
  }, [urlId]);

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(urls)}
      <Link to="/createurl">
        <Button style={{ marginleft: 10, marginbottom: 6 }} size="lg">
          {" "}
          Create Url
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {/* ? */}
      {detailObject ? (
        <div>
          <input
            style={{ width: "100%" }}
            value={detailObject}
            onChange={(e) => setDetailObject(e.target.value)}
          />
          <button onClick={() => updateUrlHandler()}>save</button>
        </div>
      ) : (
        <h2>Blank</h2>
      )}
      {urls?.reverse().map((url) => (
        <Accordion key={url._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                {url.shortUrl}
              </span>

              <div>
                <Button
                  //   href={`/url/${url._id}`}
                  onClick={() => setUrlId(url._id)}
                >
                  Edit
                </Button>
                <Button
                  varient="Danger"
                  className="mx-2"
                  onClick={() => deleteHandler(url._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            {/* <Accordion.Collapse eventKey="0"> */}
            <Card.Body>
              <blockquote className="blackquote mb-0">
                <p>{url.longUrl}</p>

                <footer className="blockquote-footer">
                  Created on{" "}
                  <cite title="Source Title">
                    {url.createdAt.substring(0, 10)}
                  </cite>
                </footer>
              </blockquote>
            </Card.Body>
            {/* </Accordion.Collapse> */}
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyUrls;
