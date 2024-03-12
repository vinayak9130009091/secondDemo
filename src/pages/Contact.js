import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
// import Tag from "../component/Tag";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./Contact.css";

function Contact({ handleContactClose }) {
  //country===>
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const animatedComponents = makeAnimated();

  const [selectedValues, setSelectedValues] = useState([]);
  const [combinedValues, setCombinedValues] = useState([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const selectedCountryData = countries.find((country) => country.name === selectedCountry);
      if (selectedCountryData) {
        setStates(selectedCountryData.states);
      }
    }
  }, [selectedCountry, countries]);
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  //Tag FetchData ================

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://68.251.138.236:8080/common/tag/");
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
    colour: tag.tagColour,

    customStyle: {
      backgroundColor: tag.tagColour,
      color: "#fff",
      borderRadius: "15px",
      width: "120px",
      alignItems: "center",
      textAlign: "center",
      marginBottom: "5px",
      height: "35px",
    },
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      marginBottom: state.data.customStyle.marginBottom,
      height: state.data.customStyle.height,
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
    }),
  };

  // const handleTagChange = selectedOptions => {
  //   setSelectedTags(selectedOptions);
  //   const values = selectedOptions.map(option => option.value);
  //   setSelectedValues(values); // Update selectedValues state
  //   // console.log("Selected Tag Values:", values);
  // };

  // const handleTagChange = selectedOptions => {
  //   setSelectedTags(selectedOptions);
  //   const values = selectedOptions.map(option => option.value);
  //   // Combine the selected values into a single string or array
  //   setCombinedValues(values.join(',')); // You can choose any delimiter you want
  //   console.log("Combined Values:", combinedValues);
  // };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);

    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);

    // Send selectedValues array to your backend
    console.log("Selected Values:", selectedValues);
    setCombinedValues(selectedValues);
  };
  //===============================================

  const [firstName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [note, setNote] = useState("");
  const [ssn, setSSN] = useState("");
  const [email, setEmail] = useState("");

  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  //  useEffect(() => {

  // }, [combinedValues]);

  //Data Post *Contact create

  const sendingData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: firstName,
      middleName: lastName,
      lastName: middleName,
      contactName: contactName,
      companyName: companyName,
      note: note,
      ssn: ssn,
      email: email,
      login: false,
      notify: false,
      emailSync: false,
      tags: [
        {
          tag: combinedValues,
        },
      ],
      country: country,
      streetAddress: streetAddress,
      city: city,
      state: state,
      postalCode: postalCode,
      phoneNumbers: [
        {
          phoneNumber: phoneNumbers,
        },
      ],
      active: true,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://68.251.138.236:8080/common/contact/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        handleContactClose();
        alert("Contact Created  Successfully");
      })
      .catch((error) => console.error(error));
  };

  // phone number======================================

  const [isPhoneNumberFormVisible, setIsPhoneNumberFormVisible] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const togglePhoneNumberForm = () => {
    setIsPhoneNumberFormVisible(!isPhoneNumberFormVisible);
  };

  const addPhoneNumber = () => {
    setPhoneNumbers([phoneNumbers, ""]);
  };

  const navigate = useNavigate();
  const handleback = () => {
    navigate("/#");
  };

  //Console Data ===================================================

  console.log(combinedValues);
  // console.log(firstName);
  // console.log(lastName);
  // console.log(middleName);
  // console.log(contactName);

  // console.log(companyName);
  // console.log(note);

  // console.log(streetAddress);

  //   console.log(country);

  //   console.log(ssn);
  //   console.log(email);
  //   console.log(city);
  //   console.log(state);
  //   console.log(postalCode);
  // console.log(phoneNumbers);

  return (
    <div className="create-Contact col-12">
      <div className="contact-header col-12">
        <h3 className="contact_title">New Contact</h3>
        <button className="contactheader-button">
          <RxCross2 onClick={handleContactClose} />
        </button>
      </div>

      <div className="contact-information-section col-12" style={{ display: "flex", marginTop: "5%" }}>
        <div className="middle-title col-12" style={{ display: "flex", margin: "2%", flexWrap: "wrap", fontSize: "16px", fontFamily: "sans-serif" }}>
          <h5>Contact info</h5>
        </div>
      </div>
      <div className="name_container col-12" style={{ display: "flex", flexWrap: "wrap", marginTop: "5%", fontSize: "14px", color: "CaptionText", fontFamily: "sans-serif" }}>
        <div className="first-name col-4" style={{ flex: "1", padding: "10px" }}>
          <label>First name</label>
          <input type="text" id="first_name" onChange={(e) => setFirsName(e.target.value)} style={{ width: "100%", padding: "2px", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
        </div>
        <div className="middle-name col-4" style={{ flex: "1", padding: "10px" }}>
          <label>Middle name</label>
          <input type="text" id="middle_name col-4" onChange={(e) => setMiddleName(e.target.value)} style={{ width: "100%", padding: "2px", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
        </div>
        <div className="last-name col-4" style={{ flex: "1", padding: "10px" }}>
          <label>Last name</label>
          <input type="text" id="last_name" onChange={(e) => setLastName(e.target.value)} style={{ width: "100%", padding: "2px", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
        </div>

        <div className="col-12" style={{ flexFlow: "wrap", display: "flex", padding: "10px", flexDirection: "column" }}>
          <label>Contact name</label>
          <input type="text" id="contact_name" onChange={(e) => setContactName(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
        </div>

        <div className="col-12" style={{ flexFlow: "wrap", display: "flex", padding: "10px", flexDirection: "column" }}>
          <label>Company name</label>
          <input type="text" id="company_name" onChange={(e) => setCompanyName(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
        </div>

        <div className="col-12" style={{ flexFlow: "wrap", display: "flex", padding: "10px", flexDirection: "column" }}>
          <label>Note</label>
          <input type="text" id="note" onChange={(e) => setNote(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
        </div>

        <div className="col-12" style={{ flexFlow: "wrap", display: "flex", padding: "10px", flexDirection: "column" }}>
          <label>Social Security Number</label>
          <input type="number" className="no-spinner" id="social_security_number" onChange={(e) => setSSN(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
        </div>

        <div className="col-12" style={{ flexFlow: "wrap", display: "flex", padding: "10px", flexDirection: "column" }}>
          <label>Email</label>
          <input type="email" id="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
        </div>

        {/* //tag */}
        {/* <div className="col-12" style={{ flexFlow: 'wrap', display: 'flex', padding: '10px' }}>
          <label>Tag</label>
          <select type="text" id="tag" style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #D3D3D3', borderRadius: '10px', height: '4vh', }} />
        </div> */}
      </div>

      <div className="col-12" style={{ flexFlow: "wrap", display: "flex", padding: "10px", flexDirection: "column" }}>
        <label>Tag</label>
        {/* <Tag addTag={handleAddTag}  /> */}

        <Select
          options={options}
          components={animatedComponents}
          isMulti // Enable multi-select
          value={selectedTags}
          onChange={handleTagChange}
          placeholder="Select tags..."
          isSearchable // Enable search
          styles={customStyles}
        />
      </div>

      <div className="col-12" style={{ flexFlow: "wrap", display: "flex", padding: "10px" }}>
        <h6 style={{ fontSize: "14px", fontFamily: "sans-serif" }}> Phone numbers</h6>
        <div className="col-12" style={{ display: "flex", marginTop: "5%", color: "rgb(58, 145, 245)" }}>
          <FiPlusCircle onClick={togglePhoneNumberForm} style={{ marginRight: "2%" }} />
          <h6>Add Phone numbers</h6>
        </div>
        {isPhoneNumberFormVisible && (
          <div className="label-input-container col-12" style={{ padding: "10px", display: "flex", flex: "1" }}>
            <div>
              <label htmlFor="Primary Phone col-6" style={{ fontSize: "14px", fontFamily: "sans-serif", fontWeight: "300" }}>
                Primary Phone
              </label>
              {/* <input type="text" id="Primary Phone" onChange={(e) => setPhoneNumbers(e.target.value)} style={{width:'230%',border: "1px solid #695cfe", padding: "5px", boxSizing: "border-box", borderRadius: "10px", height: "5vh" }} /> */}
              <input type="number" className="no-spinner" id="Primary Phone" onChange={(e) => setPhoneNumbers(e.target.value)} style={{ width: "220%", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
            </div>
          </div>
        )}
      </div>

      <div className="Address-section" style={{ flexWrap: "wrap", marginTop: "5%", fontSize: "14px", color: "CaptionText", fontFamily: "sans-serif" }}>
        <div className="col-12" style={{ flexFlow: "wrap", padding: "10px" }}>
          <h6 style={{ fontSize: "14px", fontFamily: "sans-serif" }}>Address</h6>
        </div>

        <div className="col-12" style={{ padding: "10px" }}>
          <label style={{ fontSize: "14px", color: "CaptionText", fontFamily: "sans-serif" }}>Country</label>
          <select type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "5vh" }}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12" style={{ padding: "10px" }}>
          <label style={{ fontSize: "14px", color: "CaptionText", fontFamily: "sans-serif" }}>Street Address</label>
          <input type="text" id="street_address" onChange={(e) => setStreetAddress(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
        </div>

        <div className="col-12" style={{ flexWrap: "wrap" }}>
          <div className="city col-4" style={{ flex: "1", padding: "10px" }}>
            <label>City</label>
            <input type="text" id="city" onChange={(e) => setCity(e.target.value)} style={{ width: "100%", padding: "2px", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
          </div>

          <div className="State col-4" style={{ flex: "1", padding: "10px" }}>
            <label>State/ Province</label>
            <input type="text" id="State" onChange={(e) => setState(e.target.value)} style={{ width: "100%", padding: "2px", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
          </div>

          <div className="State col-4" style={{ flex: "1", padding: "10px" }}>
            <label>ZIP/PostalCode</label>
            <input type="text" id="State" onChange={(e) => setPostalCode(e.target.value)} style={{ width: "100%", padding: "2px", boxSizing: "border-box", border: "1px solid #695cfe", borderRadius: "10px", height: "4vh" }} />
          </div>
        </div>

        <div className=" col-12" style={{ display: "flex", alignItems: "center", marginTop: "5%", flexWrap: "wrap" }}>
          <div className="Linked-accounts" style={{ fontSize: "20px", marginLeft: "2%", flex: "1" }}>
            <h6 style={{ margin: "0" }}>Linked accounts</h6>
          </div>

          <div className="link-account" style={{ display: "flex", color: "rgb(58, 145, 245)" }}>
            <div style={{ marginRight: "2px" }}>
              <FiPlusCircle />{" "}
            </div>
            <label htmlFor="account_info_radio" style={{ fontSize: "12px", fontFamily: "sans-serif", color: "rgb(58, 145, 245)" }}>
              Link account
            </label>
          </div>
        </div>

        <div className="button-container col-8" style={{ display: "flex", flexWrap: "wrap", marginTop: "5%" }}>
          <div className="create col-4" style={{ padding: "10px", flex: "1" }}>
            <button onClick={sendingData} className="custom-button">
              Create
            </button>
          </div>
          <div className="cancel col-4" style={{ padding: "10px", flex: "1" }}>
            <button className="custom-button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
