import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
  useTitle("Login")
  const { loginUser, loginWithGoogle } = useContext(AuthContext); //loading }
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location?.state?.from?.pathname || "/";

  const showPassword = (condition) => {
    setShow(!show)
    if(!condition) {
      setInputType("text")
    }else {
      setInputType("password")
    }
  }

  const loginHandler = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="">
      <h1 className="text-center mt-4 mb-3">Sign In</h1>
      <Container className="w-50 w-sm-75">
        <Row>
          <Col className="bg-secondary rounded">
            <div className="p-md-5 mt-5 mt-md-0 w-75 mx-auto">
              <Form className="" onSubmit={loginHandler}>
                <Form.Group className="mb-3" controlId="2">
                  <Form.Label className="text-white">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    name="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="3">
                  <Form.Label className="text-white">Password</Form.Label>
                  <div className= "position-relative">
                    <Form.Control
                      
                      type={inputType}
                      required
                      name="password"
                      placeholder="Enter Password"
                    />

                    {show ?
                      <FaEyeSlash className="text-muted position-absolute eye-icon-placement" onClick={() => showPassword(true)}/>
                    :
                      <FaEye className="text-muted position-absolute eye-icon-placement" onClick={() => showPassword(false)}/>
                    }
                    
                  </div>
                </Form.Group>
                <Button
                  type="submit"
                  className="mb-2 bg-white text-secondary border-0 fw-bold"
                >
                  Login
                </Button>
                <div>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mb-2 btn btn-primary text-white"
                    onClick={handleGoogleSignIn}
                  >
                    <FaGoogle /> Login with google
                  </Button>
                </div>

                <Form.Text className="ms-2 text-white">
                  Do not have an an account?{" "}
                  <Link
                    className="text-white text-decoration-underline"
                    to="/register"
                  >
                    Register
                  </Link>
                </Form.Text>
                <Form.Group className="mb-3" controlId="5">
                  <Form.Text>{error}</Form.Text>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
