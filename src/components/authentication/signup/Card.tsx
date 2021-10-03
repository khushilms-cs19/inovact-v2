import React,{useState} from 'react'
import facebook from 'images/sign-up/facebook.png'
import google from 'images/sign-up/google.png'
import { MDBRow, MDBCol } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom';



const Card= (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    console.log(props);
    const handleEmailChange = (e: any)=>{
      setEmail(e.target.value);
    }
    const handlePasswordChange = (e: any)=>{
      setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e: any)=>{
      setConfirmPassword(e.target.value);
    }

    return (
        <div className="signup__card">
            <span className="signup__card--header ">Create an Account</span>
            <div className="signin__card--desc">
                <span className="text-style--light text-align--left text-size--small">Already have an account?</span>
                <Link to="/login" className="text-style--bold text-align--left text-size--small text-color--green" style={{marginLeft:'2px'}}>Login</Link>
            </div>
            <div className="signup__card--form">
                <form >
                    <MDBRow>
                        <MDBCol sm="12">
                            <div className="form-group">
                                <label htmlFor="email">Email Id</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-component"
                                    placeholder="Enter Email Id"
                                    onChange={(e: any)=>{
                                        handleEmailChange(e);
                                        console.log("hi there its working");
                                        props.handleChange("email", email);
                                    }}
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input-component"
                                    placeholder="Enter Password"
                                    onChange={(e: any)=>{
                                        handlePasswordChange(e)
                                        props.handleChange("password", password);
                                    }}
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12">
                            <div className="form-group">
                                <label htmlFor="confirm-password">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    className="input-component"
                                    placeholder="Confirm Password"
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12">
                           <Link to={{pathname: "/userinfo"}}>
                                <button type="submit" className="button--green button--green--round signup__card--button">
                                    Sign Up
                                </button>
                           </Link>
                           
                        </MDBCol>
                    </MDBRow>
                    <hr />
                </form>
            </div>
            <div className="signup__card--or">OR</div>
            <div className="signup__social">
                <a href="/" className="signup__social--links">
                    <img
                        src={google}
                        alt=""
                        className="signup__social--links"
                    ></img>
                </a>
                <a href="/" className="signup__social--links">
                    <img
                        src={facebook}
                        alt=""
                        className="signup__social--links"
                    ></img>
                </a>
            </div>
        </div>
    )
}

export default Card
