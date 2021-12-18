import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import urls from "../../Urls/Url";

const MyUrls = () => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  return (
    <MainScreen title="Welcome Back">
      <Link to="createUrl">
        <Button style={{ marginleft: 10, marginbottom: 6 }} size="lg">
          {" "}
          Create Url
        </Button>
      </Link>
      {urls.map((url) => (
        <Accordion>
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
                {/* <Accordion.Toggle as={Card.Text} variant="link" eventKey="0"> */}
                {url.Short_Url}
                {/* </Accordion.Toggle> */}
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
                <p>{url.Long_Url}</p>

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
