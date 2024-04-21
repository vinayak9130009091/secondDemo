import React from "react";
import { useState, useEffect } from "react";
import "../pages/createAcoount.css";
import Tag from "../component/Tag";
import TeamMember from "../component/AddTeamMember";
import AddFolderTemplate from "../component/AddFolderTemplate";
import axios from "axios";
import SlideButton from "../component/SlideButton";
import makeAnimated from "react-select/animated";
//?icon
import Select from "react-select";
import { RxCross2 } from "react-icons/rx";
import { SlArrowLeft, SlArrowRight, SlQuestion } from "react-icons/sl";
//?icon stage 2
import { useNavigation } from "react";

import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CreateAccount({ handleAddAccount }) {
  const [currentStage, setCurrentStage] = useState(1);

  const nextStage = () => {
    setCurrentStage((prevStage) => prevStage + 1);
  };

  const prevStage = () => {
    setCurrentStage((prevStage) => prevStage - 1);
  };

  //todo header
  const [formStage, setFormStage] = useState("stage1");
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  const handleFormStage = (option) => {
    setFormStage(option);
  };
  //todo stage individual
  const [clientType, setClientType] = useState("");
  const [accountName, setAccountName] = useState("");

  const [teamMember, SetTeamMember] = useState("");
  const [folderTemplate, SetFolderTemplate] = useState("");
  const [cCountry, SetCCountry] = useState("");
  const [cStreetAddress, SetCStreetAddress] = useState("");
  const [cStateProvince, SetCStateProvince] = useState("");
  const [cZipPostalCode, SetCZipPostalCode] = useState("");
  const [companyName, setComapnyName] = useState("");
  const [isIndividualEnabled, setIsIndividualEnabled] = useState(true);
  const [isCompanyEnabled, setIsCompanyEnabled] = useState(false);
  const navigate = useNavigate();

  const handleContentCheckboxChange = () => {
    setIsIndividualEnabled(!isIndividualEnabled);
    // Reset the state of the other checkbox when this one is checked

    setClientType("Individual");
    setIsCompanyEnabled(false);
  };

  const handleCompanyCheckboxChange = () => {
    setIsCompanyEnabled(!isCompanyEnabled);
    // Reset the state of the other checkbox when this one is checked
    setIsIndividualEnabled(false);

    setClientType("Company");
  };

  const handleClientTypeChange = (type) => {
    setClientType(type);
  };
  const handleAccountName = (event) => {
    setAccountName(event.target.value);
  };

  const handleCompanyName = (event) => {
    setComapnyName(event.target.value);
  };

  const handleAddTeamMember = (selectedOption) => {
    SetTeamMember(selectedOption);
  };
  const handleAddFolderTemplate = (selectedOption) => {
    SetFolderTemplate(selectedOption);
  };

  //tag  data====>
  // const valuesToSend = addTag.map(item => item.value);

  const [combinedValues, setCombinedValues] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const animatedComponents = makeAnimated();

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

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);

    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);

    // Send selectedValues array to your backend
    console.log("Selected Values:", selectedValues);
    setCombinedValues(selectedValues);
  };

  //=============================================================
  //todo handle submit
  const handleSubmit = () => {
    nextStage();
    nextStage();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      clientType: clientType,
      accountName: accountName,
      tags: [
        {
          tag: combinedValues,
        },
      ],
      teamMembers: [
        {
          teamMember: "65c7272f5c720e5168273d3c",
        },
      ],
      folderTemplate: "abc1234567",
      contacts: [
        {
          contact: "65c5b9157581f8b0600e4d2d",
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://68.251.138.236:8080/admin/accountdetails/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    //todo contact
  };

  const companysubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      clientType: clientType,
      accountName: accountName,
      tags: [
        {
          tag: combinedValues,
        },
      ],
      teamMembers: [
        {
          teamMember: "65c7272f5c720e5168273d3c",
        },
      ],
      folderTemplate: "abc1234567",

      companyName: companyName,
      country: cCountry,
      streetAddress: cStreetAddress,
      state: cStateProvince,
      postalCode: cZipPostalCode,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://68.251.138.236:8080/admin/accountdetails/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const [contacts, setContacts] = useState([{ fname: "", mname: "", lname: "", contactName: "", companyName: "", note: "", email: "", phoneNumber: null, tags: null, country: "", streetAddress: "", city: "", stateProvince: "", zipPostalCode: null }]);
  const [submittedContacts, setSubmittedContacts] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (index, event) => {
    const newContacts = [...contacts];
    newContacts[index][event.target.name] = event.target.value;
    setContacts(newContacts);
  };

  const createAddAccouunt = () => {
    setCurrentStage(1);
    handleAddAccount();
    setSubmittedContacts([]);
    setContacts([...contacts, { fname: "", mname: "", lname: "", contactName: "", companyName: "", note: "", email: "", phoneNumber: null, tags: null, country: "", streetAddress: "", city: "", stateProvince: "", zipPostalCode: null }]);
  };

  const handleAddContact = () => {
    setContacts([...contacts, { fname: "", mname: "", lname: "", contactName: "", companyName: "", note: "", email: "", phoneNumber: null, tags: null, country: "", streetAddress: "", city: "", stateProvince: "", zipPostalCode: null }]);
  };

  const handleRemoveContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  const handleSubmitContact = (index) => {
    const updatedSubmittedContacts = [...submittedContacts, contacts[index]];

    setSubmittedContacts(updatedSubmittedContacts);
    setContacts([{ fname: "", mname: "", lname: "", contactName: "", companyName: "", note: "", email: "", phoneNumber: null, tags: "", country: "", streetAddress: "", city: "", stateProvince: "", zipPostalCode: "" }]);
    setFormSubmitted(true);
  };

  const handleRemoveSubmittedContact = (index) => {
    const updatedSubmittedContacts = [...submittedContacts];
    updatedSubmittedContacts.splice(index, 1);
    setSubmittedContacts(updatedSubmittedContacts);
  };

  const handleSendContact = (index) => {
    handleRemoveSubmittedContact(index);
    // Log data before removing the contact
    console.log("Sending contact:", submittedContacts[index]);

    let data = JSON.stringify(submittedContacts[index]);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://68.251.138.236:8080/common/contact/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRoleChange = (index, selectedOption) => {
    const newContacts = [...contacts];
    newContacts[index].tags = selectedOption;
    setContacts(newContacts);
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  //console.log(clientType);
  const renderCurrentStage = () => {
    switch (currentStage) {
      case 1:
        return (
          <>
            <div className="individual">
              <div className="clienttype_container col-12">
                <div className="title_client col-6">
                  <div style={{ display: "flex" }}>
                    <div>
                      <h3 style={{ fontSize: "14px", fontFamily: "sans-serif", fontWeight: "600", color: "gray" }}>Client type</h3>
                    </div>
                    <div style={{ marginLeft: "5px", marginTop: "-1px", color: "blue" }}>
                      <SlQuestion />
                    </div>
                  </div>

                  <div className="account_subtype">
                    <div className="individual_subtype">
                      <label htmlFor="company_radio" style={{ fontSize: "14px", fontFamily: "sans-serif", marginLeft: "5px" }}>
                        <input defaultChecked={true} type="checkbox" onChange={handleContentCheckboxChange} style={{ marginRight: "10px" }} />
                        Individual
                      </label>
                    </div>

                    <div className="company_subtype" style={{ marginLeft: "20px" }}>
                      <label htmlFor="company_radio" style={{ fontSize: "14px", fontFamily: "sans-serif", marginLeft: "10px" }}>
                        <input defaultChecked={false} type="checkbox" onChange={handleCompanyCheckboxChange} style={{ marginRight: "10px" }} />
                        Company
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div>
              <br />

              {isIndividualEnabled && (
                <div>
                  {/* Content form */}
                  <div className="individualInfo" style={{ padding: "15px" }}>
                    <div>
                      <div>
                        <h3 style={{ fontSize: "14px", fontFamily: "sans-serif", fontWeight: "600", color: "gray" }}>Account Info</h3>
                      </div>
                      <div style={{ marginLeft: "90px", marginTop: "-20px", color: "blue" }}>
                        <SlQuestion />
                      </div>
                    </div>

                    <div>
                      <label className="label">Account Name:</label>
                      <input className="col-12 input" type="text" name="name" placeholder="first name" onChange={handleAccountName} />
                    </div>

                    <div>
                      <label className="label">Tags:</label>
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
                    <div>
                      <label className="label">Team Member:</label>
                      <TeamMember addTeamMember={handleAddTeamMember} />
                    </div>
                    <div>
                      <label className="label">Folder Template :</label>
                      <AddFolderTemplate addFolderTemplate={handleAddFolderTemplate} />
                    </div>
                    <div>
                      <button
                        className="submit-btn col-6"
                        onClick={() => {
                          handleSubmit();
                          handleFormStage("stage2");
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isCompanyEnabled && (
                <div>
                  {/* Company form */}
                  <div className="individualInfo" style={{ padding: "15px" }}>
                    <div>
                      <div>
                        <h3 style={{ fontSize: "14px", fontFamily: "sans-serif", fontWeight: "600", color: "gray" }}>Account Info</h3>
                      </div>
                      <div style={{ marginLeft: "90px", marginTop: "-20px", color: "blue" }}>
                        <SlQuestion />
                      </div>
                    </div>

                    <div>
                      <label className="label">Account Name:</label>
                      <input className="col-12 input" type="text" name="name" placeholder="first name" onChange={handleAccountName} />
                    </div>
                    <div>
                      <label className="label">Company Name:</label>
                      <input className="col-12 input" type="text" name="name" placeholder="company name" onChange={handleCompanyName} />
                    </div>

                    <div>
                      <label className="label">Tags:</label>
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
                    <div>
                      <label className="label">Team Member:</label>
                      <TeamMember addTeamMember={handleAddTeamMember} />
                    </div>
                    <div>
                      <label className="label">Folder Template :</label>
                      <AddFolderTemplate addFolderTemplate={handleAddFolderTemplate} />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <h5>Company Adress</h5>
                    </div>

                    <div>
                      <label className="label">Country:</label>
                      <input className="col-12 input" type="text" name="name" placeholder="" onChange={(e) => SetCCountry(e.target.value)} />
                    </div>
                    <div>
                      <label className="label">Street address::</label>
                      <input className="col-12 input" type="text" name="name" placeholder="" onChange={(e) => SetCStreetAddress(e.target.value)} />
                    </div>
                    <div>
                      <label className="label">State/Province:</label>
                      <input className="col-12 input" type="text" name="name" placeholder="" onChange={(e) => SetCStateProvince(e.target.value)} />
                    </div>
                    <div>
                      <label className="label">ZIP/Postal Code</label>
                      <input className="col-12 input" type="text" name="name" placeholder="" onChange={(e) => SetCZipPostalCode(e.target.value)} />
                    </div>

                    <div>
                      <button
                        className="submit-btn col-6"
                        onClick={() => {
                          companysubmit();
                          handleFormStage("stage2");
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>add contct</div>
          </>
        );
      case 3:
        return (
          <div>
            {formSubmitted ? (
              <div>
                {submittedContacts.map((contact, index) => (
                  <div className=" col-12" key={index}>
                    <div style={{ marginLeft: "20px" }}>
                      <h6>Contact {index + 1} :</h6>
                      <h6>Name: {contact.fname}</h6>
                      <h6>Email: {contact.email}</h6>
                    </div>

                    <button className="submit-btn col-6" style={{ marginLeft: "10px", width: "11%", hight: "5px", fontSize: "10px" }} onClick={() => handleRemoveSubmittedContact(index)}>
                      Remove
                    </button>
                    <button className="submit-btn col-6" style={{ marginLeft: "10px", width: "8%", fontSize: "10px" }} onClick={() => handleSendContact(index)}>
                      Send
                    </button>
                  </div>
                ))}

                <div className=" col-12">
                  <div className="addContact " style={{ margin: "20px" }}>
                    <div className=" col-1" style={{ color: "blue" }} onClick={() => setFormSubmitted(false)}>
                      <FaPlusCircle />
                    </div>
                    <div className=" col-11" style={{ marginLeft: "2px" }}>
                      <h5> Add New Contact</h5>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="submit-btn col-12" style={{ marginLeft: "10px", width: "150px", marginBottom: "10px" }} onClick={createAddAccouunt}>
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <form>
                  {contacts.map((contact, index) => (
                    <div key={index}>
                      <div className="dynamicContact" style={{ padding: "0 10px 0 10px" }}>
                        <div className=" col-12" style={{ padding: "0 10px 0 10px" }}>
                          <h5>Info:</h5>
                        </div>
                        <div className=" col-4" style={{ padding: "0 10px 0 10px" }}>
                          <label htmlFor={`fname${index}`}>First Name:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="fname" id={`fname${index}`} value={contact.fname} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-4" style={{ padding: "0 10px 0 10px" }}>
                          <label htmlFor={`mname${index}`}>Middle Name:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="mname" id={`mname${index}`} value={contact.mname} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-4" style={{ padding: "0 10px 0 10px" }}>
                          <label htmlFor={`lname${index}`}>Last Name:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="lname" id={`lname${index}`} value={contact.lname} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-12" style={{ padding: "0 10px 0 10px" }}>
                          <label htmlFor={`contactName${index}`}>Contact Name:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="contactName" id={`contactName${index}`} value={contact.contactName} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-12" style={{ padding: "0 10px 0 10px " }}>
                          <label htmlFor={`companyName${index}`}>Company Name:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="companyName" id={`companyName${index}`} value={contact.companyName} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-12" style={{ padding: "0 10px 0 10px " }}>
                          <label htmlFor={`note${index}`}>Note:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="note" id={`note${index}`} value={contact.note} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-12" style={{ padding: "0 10px 10px 10px" }}>
                          <label htmlFor={`email${index}`}>Email:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="email" name="email" id={`email${index}`} value={contact.email} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className="btnSlide col-12" style={{ padding: "0 6% 0 10% " }}>
                          <div className="col-2" style={{ width: "15%" }}>
                            <SlideButton />
                          </div>
                          <div className=" col-2">
                            <label style={{ fontSize: "12px", color: "black" }}>Login</label>
                          </div>
                          <div className="col-2" style={{ width: "15%" }}>
                            <SlideButton />
                          </div>
                          <div className=" col-2">
                            <label style={{ fontSize: "12px", color: "black" }}>Notify</label>
                          </div>
                          <div className="col-2" style={{ width: "15%" }}>
                            <SlideButton />
                          </div>
                          <div className=" col-2">
                            <label style={{ fontSize: "12px", color: "black" }}>Email Sync</label>
                          </div>
                        </div>

                        <div className=" col-12" style={{ padding: "0 10px 10px 10px" }}>
                          <label>Tags:</label>
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
                        <div className=" col-12" style={{ padding: "0 10px 0 10px" }}>
                          <h5>Phone Number</h5>
                        </div>
                        <div className=" col-12" style={{ padding: "0 10px 0 10px " }}>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="phoneNumber" id={`phoneNumber${index}`} value={contact.phoneNumber} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-12" style={{ padding: "0 10px 0 10px" }}>
                          <h5>Address:</h5>
                        </div>
                        <div className=" col-12" style={{ padding: "0 10px 0 10px " }}>
                          <label htmlFor={`country${index}`}>Country:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="country" id={`country${index}`} value={contact.country} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-12" style={{ padding: "0 10px 0 10px " }}>
                          <label htmlFor={`streetAddress${index}`}>Street address:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="streetAddress" id={`streetAddress${index}`} value={contact.streetAddress} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-4" style={{ padding: "0 10px 0 10px" }}>
                          <label htmlFor={`city${index}`}>City:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="city" id={`city${index}`} value={contact.city} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-4" style={{ padding: "0 10px 0 10px" }}>
                          <label htmlFor={`stateProvince${index}`}>State/Province:</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="text" name="stateProvince" id={`stateProvince${index}`} value={contact.stateProvince} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-4" style={{ padding: "0 10px 0 10px" }}>
                          <label htmlFor={`zipPostalCode${index}`}>ZIP/Postal Code</label>
                          <input style={{ display: "flex" }} className="col-4 input" type="number" name="zipPostalCode" id={`zipPostalCode${index}`} value={contact.zipPostalCode} onChange={(e) => handleInputChange(index, e)} />
                        </div>
                        <div className=" col-12">
                          <hr />
                        </div>
                      </div>

                      <button className="submit-btn col-6" style={{ marginLeft: "10px" }} onClick={() => handleSubmitContact(index)}>
                        Submit
                      </button>
                    </div>
                  ))}
                </form>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <div className="account-header col-12">
          <h3 className="account_title">New Account</h3>
          <button className="header-button">
            <RxCross2 onClick={() => handleAddAccount()} />
          </button>
        </div>

        <div className="accounttype_container col-12">
          <div className="sub-account col-6">
            <div className=" col-4" style={{ fontWeight: formStage === "stage1" ? "bold" : "normal" }}>
              <input type="radio" id="account_info_radio" name="account_info_radio" checked={formStage === "stage1"} />
              <label htmlFor="account_info_radio" style={{ marginLeft: "-30px" }}>
                Account info
              </label>
              {showAccountInfo && <span>1</span>}
            </div>
            <div className="rotate-btn col-4">{formStage === "stage1" ? <SlArrowRight /> : <SlArrowLeft />}</div>
            <div className=" col-4" style={{ fontWeight: formStage === "stage2" ? "bold" : "normal" }}>
              <input type="radio" id="company_info_radio" name="company_info_radio" checked={formStage === "stage2"} style={{ width: "13px" }} />
              <label htmlFor="company_info_radio" style={{ marginLeft: "-23px" }}>
                Contacts
              </label>
            </div>
          </div>
        </div>
      </div>

      {renderCurrentStage()}
    </div>
  );
}

export default CreateAccount;
