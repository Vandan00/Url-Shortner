import { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
// import urls from "../../Urls/Url";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listUrls } from "../../actions/urlActions";

const MyUrls = () => {
  const dispatch = useDispatch();
  const urlList = useSelector((state) => state.urlList);
  const { loading, urls, error } = urlList;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  useEffect(() => {
    dispatch(listUrls());
  }, [dispatch]);

  return (
    <MainScreen title="Welcome Back">
      {console.log(urls)}
      <Link to="createUrl">
        <Button style={{ marginleft: 10, marginbottom: 6 }} size="lg">
          {" "}
          Create Url
        </Button>
      </Link>
      {/* ? */}
      {urls?.map((url) => (
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
                <Button href={`/url/${url._id}`}>Edit</Button>
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

                <footer className="blackquote-footer">created on - date</footer>
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
